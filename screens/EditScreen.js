
import React from "react";
import { RefreshControl, Platform, SectionList, StyleSheet, Text, View, FlatList } from "react-native";
import Constants from "expo-constants";
import Swipeout from "react-native-swipeout";
import moment from "moment/min/moment-with-locales";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
import customData from '../metObjects.json';

export default class EditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: undefined,
            client: undefined,
            workout: [],
            refreshing: false,
            userName: "Joe",
            met: 0,
            duration: 0,
            caloriesBurned: 0,
            totalCal: 0,
        };
        this._loadClient = this._loadClient.bind(this);
    }

    calculateCal = (met) => {
        console.log("MET:", met)
        // console.log("MET::::::::      ", this.state.workout.exercises[index].met)
        let simplifiedMet = this.state.workout.exercises.met/60
        var caloriesBurned = (Math.floor(simplifiedMet * this.state.workout.exercises.duration ) * 76.4)
        // this.setState({caloriesBurned:caloriesBurned.toFixed(0)})
        return(caloriesBurned)
    }

    calculateTotal = () => {
        
    }

    componentWillMount() {
        this._loadClient()
        const { addListener } = this.props.navigation;
        this.listeners = [addListener('didFocus', () => { this._loadClient(); })]
    }

    componentWillUnmount() {
        this.calculateCal()
        this.listeners.forEach( sub => { sub.remove() },)
    }

    render() {
        return (

            <View style={styles.container}>
                <FlatList
                    data={this.state.workout.exercises}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => 
                    <>
                    <Text
                    style={{
                        color: 'white',
                        padding: 5,
                        fontSize: 16
                    }}>{item.exercise}</Text>
                    <Text
                    style={{
                        color: 'white',
                        padding: 5,
                        fontSize: 16
                    }}>{this.state.caloriesBurned} cal</Text>
                    <Text>
                        {this.calculateCal(item.met).toString()}
                    </Text>
                    </>
                }
                
                />
            </View>
    );
  }

  _renderItem = ({ item }) => {
            return (
                <SectionContent>
                    <Swipeout
                        autoClose={true}
                        backgroundColor="none"
                        right={[
                            {
                                component: (
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column"
                                        }}
                                    >
                                        <Ionicons
                                            name={Platform.OS == "ios" ? "ios-archive" : "md-archive"}
                                            size={30}
                                            style={{ textAlign: "center", color: "white" }}
                                        />
                                    </View>
                                ),
                                backgroundColor: "#2e78b7",
                            }
                        ]}
                    >
                        <View style={styles.taskListTextTime}>
                            {item.title != "No workouts" &&
                                item.title != "Loading..." ? (
                                    <Text style={styles.taskListTextTime}></Text>
                                ) : item.title == "No workouts" ? (
                                    <AntDesign
                                        name={Platform.OS == "ios" ? "smileo" : "smileo"}
                                        size={30}
                                        style={{
                                            textAlign: "center",
                                            color: "lightgray",
                                            marginTop: 25
                                        }}
                                    />
                                ) : (
                                        <Text />
                                    )}
                        </View>

                        <Text style={styles.sectionContentText}>
                            {item.title != "No workouts" ? item.description : ""}
                        </Text>
                        <Text style={styles.taskListTextTimeComplete}>
                            {item.title != "No workouts" && item.title != "Loading..."}
                        </Text>
                    </Swipeout>
                </SectionContent>
            );
        };

        _loadClient() {
            const temp_id = this.props.navigation.state.params.id;
            const stitchAppClient = Stitch.defaultAppClient;
            const mongoClient = stitchAppClient.getServiceClient(
                RemoteMongoClient.factory,
                "mongodb-atlas"
            );
            const db = mongoClient.db("workoutmanager");
            const workouts = db.collection("workouts");
            workouts
                .findOne(
                    { _id: new BSON.ObjectId(temp_id) }
                )
                // .asArray()
                .then(docs => {
                    this.setState({ workout: docs });
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
        sectionHeaderContainer: {
            backgroundColor: "#fbfbfb",
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "#ededed",
            alignItems: "center"
        },
        sectionHeaderText: {
            fontSize: 12,
            fontWeight: "bold"
        },
        sectionHeader: {
            paddingTop: 2,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 2,
            fontSize: 16,
            fontWeight: 'bold',
            backgroundColor: '#262526',
            color: '#fff',
            textAlign: 'left',
            textAlignVertical: 'center'
        },
        sectionContentContainer: {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "lightgray"
        },
        sectionContentText: {
            color: "white",
            flex: 2,
            fontSize: 15,
            paddingBottom: 10,
            paddingHorizontal: 10,
            paddingVertical: 15,
            paddingRight: 5,
            textAlign: "left",
            flexDirection: 'row'
        },
        sectionContentText2: {
            color: "white",
            flex: 2,
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
            color: "red",
            flex: 1,
            flexDirection: 'row',
            fontWeight: "700"
        },
        operator: {
            color: "white",
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
