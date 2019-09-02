
import React from "react";
import { RefreshControl, Platform, Button, StyleSheet, Text, View, FlatList } from "react-native";
import Constants from "expo-constants";
import Swipeout from "react-native-swipeout";
import moment from "moment/min/moment-with-locales";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
import { TextInput } from "react-native-gesture-handler";

export default class EditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: undefined,
            client: undefined,
            workout: {},
            refreshing: false,
            userName: "Joe",
            totalCal: 0,
        };
        this._loadClient = this._loadClient.bind(this);
    }

    calculateCal = (met, duration) => {
        const weight = this.state.workout.weight
        let simplifiedweight = weight / 2.2
        let simplifiedMet = met / 60
        let caloriesBurned = ((simplifiedMet * duration) * simplifiedweight)
        return (caloriesBurned.toFixed(0))
    }

    calculateTotal = () => {
        let total = 0;

        this.state.workout.exercises.forEach(item => {
            total += parseInt(this.calculateCal(item.met, item.duration));
        })
        return total;
    }

    setDuration = (dur, index) => {
        // deep copy of object
        let new_wkout = JSON.parse(JSON.stringify(this.state.workout));

        // re-objectify id field
        new_wkout._id = new BSON.ObjectId(new_wkout._id);

        new_wkout.exercises[index].duration = dur;
        this.setState({ workout: new_wkout }, () => this.setState({ totalCal: this.calculateTotal() }));
    }

    componentWillMount() {
        const { addListener } = this.props.navigation;
        this.listeners = [addListener('didFocus', () => { this._loadClient(); })]
    }

    componentWillUnmount() {
        this.listeners.forEach(sub => { sub.remove() })
    }

    componentDidUpdate() {
    }


    handleWorkoutSubmit = () => {
        const stitchAppClient = Stitch.defaultAppClient;
        const mongoClient = stitchAppClient.getServiceClient(
            RemoteMongoClient.factory,
            "mongodb-atlas"
        );
        const db = mongoClient.db("workoutmanager");
        const workouts = db.collection("workouts");

        workouts
            .findOneAndReplace(
                { _id: new BSON.ObjectId(this.state.workout._id) },
                this.state.workout,
                { returnNewDocument: true }
            )
            // .then(doc => console.log(doc))
            .catch(err => console.warn(err));

        console.log("Submit");
        this.props.navigation.goBack();
    }


    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={{
                        color: 'red',
                        textAlign: 'center',
                        padding: 5,
                        fontSize: 25,
                        marginBottom: 10
                    }}>{this.state.workout.description} {this.state.totalCal ? " Cal : " + this.state.totalCal : ""} </Text>

                <FlatList
                    style={{ marginHorizontal: 25 }}
                    data={this.state.workout.exercises}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: item, index }) =>
                        <View>
                            <Text
                                style={{
                                    color: 'white',
                                    backgroundColor: '#262526',
                                    padding: 5,
                                    marginTop: 10,
                                    fontSize: 16,
                                    textAlign: 'center',
                                    marginBottom: 10
                                }}
                            >{item.exercise}</Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    textAlign: 'center',
                                }} >
                                <Text
                                    style={{
                                        color: 'white',
                                        padding: 5,
                                        fontSize: 16,
                                        marginBottom: 10
                                    }} >
                                    Minutes: </Text>
                                <TextInput
                                    style={{
                                        color: 'black',
                                        backgroundColor: 'white',
                                        padding: 5,
                                        fontSize: 16,
                                        marginBottom: 10,
                                    }}
                                    keyboardType={'numeric'}
                                    returnKeyType='done'
                                    onEndEditing={() => this.handleDurationSubmit(index)}
                                    placeholder={item.duration.toString()}
                                    onChangeText={(text) => this.setDuration(parseInt(text), index)}
                                />
                                <Text
                                    style={{
                                        color: 'white',
                                        padding: 5,
                                        fontSize: 16,
                                        marginBottom: 10
                                    }} >
                                    Calories: {this.calculateCal(item.met, item.duration)}</Text>
                            </View>
                        </View>
                    }
                />
                <Button
                    onPress={() => this.handleWorkoutSubmit()}
                    title="Save"
                    color="white"
                />
            </View>
        );
    }



    _loadClient() {
        const wkout_id = this.props.navigation.state.params.id;
        const stitchAppClient = Stitch.defaultAppClient;
        const mongoClient = stitchAppClient.getServiceClient(
            RemoteMongoClient.factory,
            "mongodb-atlas"
        );
        const db = mongoClient.db("workoutmanager");
        const workouts = db.collection("workouts");

        workouts
            .findOne(
                { _id: wkout_id }
            )
            .then(wkout => {
                this.setState({ workout: wkout }, () => this.setState({ totalCal: this.calculateTotal() }));
            })
            .catch(err => {
                console.warn(err);
            });
        console.log("Loading Client")
    }
}

EditScreen.navigationOptions = {
    headerTitle: (
        <Ionicons
            name={Platform.OS == "ios" ? "ios-create" : "md-create"}
            size={23}
            style={{
                color: "black",
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
        backgroundColor: '#3F3E40',
    },
});





//   _renderItem = ({ item }) => {
//             return (
//                 <SectionContent>
//                     <Swipeout
//                         autoClose={true}
//                         backgroundColor="none"
//                         right={[
//                             {
//                                 component: (
//                                     <View
//                                         style={{
//                                             flex: 1,
//                                             alignItems: "center",
//                                             justifyContent: "center",
//                                             flexDirection: "column"
//                                         }}
//                                     >
//                                         <Ionicons
//                                             name={Platform.OS == "ios" ? "ios-archive" : "md-archive"}
//                                             size={30}
//                                             style={{ textAlign: "center", color: "white" }}
//                                         />
//                                     </View>
//                                 ),
//                                 backgroundColor: "#2e78b7",
//                             }
//                         ]}
//                     >
//                         <View style={styles.taskListTextTime}>
//                             {item.title != "No workouts" &&
//                                 item.title != "Loading..." ? (
//                                     <Text style={styles.taskListTextTime}></Text>
//                                 ) : item.title == "No workouts" ? (
//                                     <AntDesign
//                                         name={Platform.OS == "ios" ? "smileo" : "smileo"}
//                                         size={30}
//                                         style={{
//                                             textAlign: "center",
//                                             color: "lightgray",
//                                             marginTop: 25
//                                         }}
//                                     />
//                                 ) : (
//                                         <Text />
//                                     )}
//                         </View>

//                         <Text style={styles.sectionContentText}>
//                             {item.title != "No workouts" ? item.description : ""}
//                         </Text>
//                         <Text style={styles.taskListTextTimeComplete}>
//                             {item.title != "No workouts" && item.title != "Loading..."}
//                         </Text>
//                     </Swipeout>
//                 </SectionContent>
//             );
//         };


// const SectionHeader = ({ title }) => {
//     return (
//         <View style={styles.sectionHeaderContainer}>
//             <Text style={styles.sectionHeaderText}>{title}</Text>
//         </View>
//     );
// };

// const SectionContent = props => {
//     return <View style={styles.sectionContentContainer}>{props.children}</View>;
// };

// 
//                 <TextInput
//                     style={{
//                         color: 'white',
//                         backgroundColor: '#262526',
//                         padding: 5,
//                         marginTop: 10,
//                         fontSize: 16,
//                         textAlign: 'center',
//                         marginBottom: 10
//                     }}
//                     keyboardType='numeric'
//                     returnKeyType='done'
//                     placeholder="temp text"
//                     onChangeText={(text) => this.setState({ text })}
//                     // value={this.state.text}
//                     onSubmitEditing={() => this.handleDurationSubmit()}
//                 /> 


    // sectionHeaderContainer: {
    //     backgroundColor: "#fbfbfb",
    //     paddingVertical: 8,
    //     paddingHorizontal: 15,
    //     borderWidth: StyleSheet.hairlineWidth,
    //     borderColor: "#ededed",
    //     alignItems: "center"
    // },
    // sectionHeaderText: {
    //     fontSize: 12,
    //     fontWeight: "bold"
    // // },
    // sectionHeader: {
    //     paddingTop: 2,
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //     paddingBottom: 2,
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //     backgroundColor: '#262526',
    //     color: '#fff',
    //     textAlign: 'left',
    //     textAlignVertical: 'center'
    // },
    // sectionContentContainer: {
    //     borderBottomWidth: StyleSheet.hairlineWidth,
    //     borderBottomColor: "lightgray"
    // },
    // sectionContentText: {
    //     color: "white",
    //     flex: 2,
    //     fontSize: 15,
    //     paddingBottom: 10,
    //     paddingHorizontal: 10,
    //     paddingVertical: 15,
    //     paddingRight: 5,
    //     textAlign: "left",
    //     flexDirection: 'row'
    // },
    // sectionContentText2: {
    //     color: "white",
    //     flex: 2,
    //     fontSize: 15,
    //     paddingBottom: 10,
    //     paddingHorizontal: 10,
    //     paddingVertical: 15,
    //     textAlign: "right",
    //     flexDirection: 'row',
    // },
    // taskListTextTime: {
    //     paddingHorizontal: 10,
    //     paddingVertical: 10,
    //     paddingBottom: 10,
    //     fontSize: 15,
    //     textAlign: "center",
    //     color: "red",
    //     flex: 1,
    //     flexDirection: 'row',
    //     fontWeight: "700"
    // // },
    // operator: {
    //     color: "white",
    //     flex: 1,
    //     fontSize: 15,
    //     paddingBottom: 10,
    //     paddingHorizontal: 10,
    //     paddingVertical: 15,
    //     textAlign: "center",
    //     flexDirection: 'row',
    // },
    // sum: {
    //     paddingHorizontal: 10,
    //     paddingVertical: 10,
    //     paddingBottom: 10,
    //     fontSize: 15,
    //     textAlign: "left",
    //     color: "white",
    //     fontWeight: "700",
    //     flex: 1
    // },
    // equal: {
    //     paddingVertical: 10,
    //     paddingBottom: 10,
    //     fontSize: 15,
    //     textAlign: "center",
    //     color: "white",
    //     fontWeight: "700",
    //     flex: 1
    // },
    // totalCal: {
    //     paddingHorizontal: 10,
    //     paddingVertical: 10,
    //     paddingBottom: 10,
    //     fontSize: 15,
    //     textAlign: "right",
    //     color: "white",
    //     flex: 1,
    //     fontWeight: "700"
    // },
