import React from "react";
import { RefreshControl, Platform, SectionList, StyleSheet, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import Confetti from "react-native-confetti";
import { TextInput } from "react-native-gesture-handler";

export default class LinksScreen extends React.Component {
    static navigationOptions = { header: null };

    state = { 
        calories: 0,
        totalCal: 0,
        met: 12,
        min: 0,
        weight: 52.2
    }

    constructor(props) {
        super(props);
        this.state = {
            currentUserId: undefined,
            client: undefined,
            workouts: undefined,
            refreshing: false,
        };
        this._loadClient = this._loadClient.bind(this);
    }

    calculateCal = () => {
        let simplifiedMet = 12/60
        var caloriesBurned = (Math.floor(simplifiedMet * 60 ) * 52.2)
        console.log(caloriesBurned)
        this.setState({totalCal:caloriesBurned.toFixed(0)})
    }

    calculateTotal = () => {
        
    }

    componentDidMount() {
        console.log("cdmount");
        this._loadClient();
        this.calculateCal();
        const { addListener } = this.props.navigation;
        this.listeners = [addListener('didFocus', () => { this._loadClient(); })]
    }

    componentWillUnmount() {
        this.listeners.forEach(sub => { sub.remove() })
    }

    _onRefresh = () => {
        console.log("refresh");
        this.setState({ refreshing: true });
        const stitchAppClient = Stitch.defaultAppClient;
        const mongoClient = stitchAppClient.getServiceClient(
            RemoteMongoClient.factory,
            "mongodb-atlas"
        );
        const db = mongoClient.db("workoutmanager");
        const workouts = db.collection("workouts");
        workouts
            .find({ status: "new" }, { sort: { date: -1 } })
            .asArray()
            .then(docs => {
                this.setState({ workouts: docs });
                this.setState({ refreshing: false });
            })
            .catch(err => {
                console.warn(err);
            });
    };

    render() {
        console.log("render");

        const sections =
            this.state.workouts == undefined
                ? [{ data: [{ title: "Loading..." }], title: "Loading..." }]
                : this.state.workouts.length > 0
                    ? [{ data: this.state.workouts, title: "Workouts" }]
                    : [
                        {
                            data: [{ title: "No new workouts" }],
                            title: "No new workouts"
                        }
                    ];

        return (
            <>
            <SectionList
                style={{ ...styles.container }}
                renderItem={this._renderItem}
                renderSectionHeader={this._renderSectionHeader}
                stickySectionHeadersEnabled={true}
                keyExtractor={(item, index) => index}
                sections={sections}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh} />
                }
                renderSectionFooter={this._renderFooter}

            />
            
            </>
        );
    }

    _renderSectionHeader = ({ section }) => {
        return <SectionHeader title={section.title} />;
    };

    _renderItem = ({ item }) => {
        return (
            <>
                <SectionContent>
                    <Confetti
                        confettiCount={50}
                        timeout={10}
                        duration={2000}
                        ref={node => (this._confettiView = node)} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={styles.sectionContentText}>
                            {item.title != "No new workouts" ? item.description : ""}
                        </Text>
                        <Text style={styles.operator}>
                            x
                         </Text>
                        <TextInput
                            style={styles.taskListTextTime}
                            placeholder="Min"
                            keyboardType='numeric'
                            value={this.state.min}
                        /> 
                        <Text style={styles.operator}>
                             =
                    </Text>
                        <Text style={styles.sectionContentText2}>
                            {}12 cal
                        </Text>
                    </View>
                </SectionContent>
            </>
        );
    };
    

    _renderFooter = () => {
        return (
            <>
                <SectionContent style={{paddingHorizontal: 0}}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 50, backgroundColor: "darkgrey", color: "white"}}>
                        <Text style={styles.sum}>
                        Total Cals
                        </Text>
                        <Text style={styles.equal} >
                        =
                        </Text>
                        <Text style={styles.totalCal} >
                        ≈  {this.state.totalCal} cal
                        </Text>
                    </View>
                </SectionContent>
            </>
        );
    };

    _loadClient() {
        console.log("load client");

        const stitchAppClient = Stitch.defaultAppClient;
        const mongoClient = stitchAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
        const db = mongoClient.db("workoutmanager");
        const workouts = db.collection("workouts");
        workouts.find({ status: "new" }, { sort: { date: -1 } })
            .asArray()
            .then(docs => {
                this.setState({ workouts: docs });
            })
            .catch(err => {
                console.warn(err);
            });
    }

    _onPressComplete(itemID) {
        if (itemID) {
            const stitchAppClient = Stitch.defaultAppClient;
            const mongoClient = stitchAppClient.getServiceClient(
                RemoteMongoClient.factory,
                "mongodb-atlas"
            );
            const db = mongoClient.db("workoutmanager");
            const workouts = db.collection("workouts");
            workouts.updateOne(
                { _id: itemID },
                { $set: { status: "completed", completedDate: new Date() } },
                { upsert: true })
                .then(() => {
                    workouts.find({ status: "new" }, { sort: { date: -1 } })
                        .asArray()
                        .then(docs => {
                            this.setState({ workouts: docs });
                            if (this._confettiView) {
                                this._confettiView.startConfetti();
                            }
                        })
                        .catch(err => {
                            console.warn(err);
                        });
                })
                .catch(err => {
                    console.warn(err);
                });
        }
    }

    _onPressDelete(itemID) {
        console.log("delete id = ", itemID);
        const stitchAppClient = Stitch.defaultAppClient;
        const mongoClient = stitchAppClient.getServiceClient(
            RemoteMongoClient.factory,
            "mongodb-atlas"
        );
        const db = mongoClient.db("workoutmanager");
        const workouts = db.collection("worekouts");
        workouts.deleteOne({ _id: itemID })
            .then(() => {
                console.log("deleteOne.then");
                workouts.find({ status: "new" }, { sort: { date: -1 } })
                    .asArray()
                    .then(docs => {
                        this.setState({ workouts: docs });
                    })
                    .catch(err => {
                        console.warn(err);
                    });
            })
            .catch(err => {
                console.warn(err);
            });
    }
}

const SectionHeader = ({ title }) => {
    return (
        <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );
};

const SectionContent = props => {
    return <View style={styles.sectionContentContainer}>{props.children}</View>;
};

LinksScreen.navigationOptions = {
    headerTitle: (
        <Ionicons
            name={Platform.OS == "ios" ? "ios-clipboard" : "md-clipboard"}
            size={23}
            style={{
                color: "#2e78b7",
                flex: 1,
                textAlign: "center"
            }}
            resizeMode="contain"
        />
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    sectionHeaderContainer: {
        backgroundColor: "#fbfbfb",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#ededed",
        alignItems: "center"
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: "bold"
    },
    sectionContentContainer: {
        paddingHorizontal: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "lightgray"
    },
    sectionContentText: {
        color: "black",
        flex: 1,
        fontSize: 15,
        paddingBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        textAlign: "left",
        flexDirection: 'row'
    },
    sectionContentText2: {
        color: "black",
        flex: 1,
        fontSize: 15,
        paddingBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        textAlign: "right",
        flexDirection: 'row',
    },
    taskListTextTime: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom: 10,
        fontSize: 15,
        textAlign: "center",
        color: "blue",
        flex: 1,
        flexDirection: 'row',
        fontWeight: "700"
    },
    operator: {
        color: "black",
        flex: 1,
        fontSize: 15,
        paddingBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        textAlign: "center",
        flexDirection: 'row',
    },
    sum: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom: 10,
        fontSize: 15,
        textAlign: "left",
        color: "white",
        fontWeight: "700",
        flex: 1
    },
    equal: {
        paddingVertical: 10,
        paddingBottom: 10,
        fontSize: 15,
        textAlign: "center",
        color: "white",
        fontWeight: "700",
        flex: 1
    },
    totalCal: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom: 10,
        fontSize: 15,
        textAlign: "right",
        color: "white",
        flex: 1,
        fontWeight: "700"
    },
});