
import React from "react";
import { RefreshControl, Platform, Button, StyleSheet, Text, View, KeyboardAvoidingView, FlatList } from "react-native";
import Swipeout from "react-native-swipeout";
import { Ionicons } from "@expo/vector-icons";
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

export default class EditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workout: {},
            refreshing: false,
            totalCal: 0,
        };
        this._loadClient = this._loadClient.bind(this);
    }

    calculateCal = (met, duration) => {
        const weight = this.state.workout.weight
        let simplifiedweight = weight / 2.2
        let simplifiedMet = met / 60
        let caloriesBurned = 0;
        // This checks to see if duration is NaN
        if (duration > 0)
             caloriesBurned = ((simplifiedMet * parseInt(duration)) * simplifiedweight)
        else
             caloriesBurned = 0;
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

    onPressDelete = (index) => {
        // deep copy of object
        let new_wkout = JSON.parse(JSON.stringify(this.state.workout));

        // re-objectify id field
        new_wkout._id = new BSON.ObjectId(new_wkout._id);

        new_wkout.exercises.splice(index, 1);
        this.setState({ workout: new_wkout }, () => this.setState({ totalCal: this.calculateTotal() }));
        console.log("delete: ", index);
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

        // console.log("Submit");
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

                <KeyboardAwareFlatList
                    style={{ marginHorizontal: 25 }}
                    data={this.state.workout.exercises}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <View>
                            <Swipeout
                                autoClose={true}
                                backgroundColor="none"
                                right={[{
                                    component: (
                                        <View style={{
                                            flex: 1,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column"
                                        }} >
                                            <Ionicons name={Platform.OS == "ios"
                                                ? "ios-close-circle-outline"
                                                : "md-close-circle-outline"
                                            }
                                                size={30}
                                                style={{ textAlign: "center", color: "white" }} />
                                        </View>
                                    ),
                                    backgroundColor: "red",
                                    onPress: () => this.onPressDelete(index)
                                }
                                ]} >
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
                                            color: 'white',
                                            backgroundColor: '#4B4A4D',
                                            padding: 5,
                                            paddingHorizontal: 20,
                                            fontSize: 16,
                                            marginBottom: 10,
                                        }}
                                        keyboardType={'numeric'}
                                        
                                        returnKeyType='done'
                                        // placeholder={item.duration.toString()}
                                        onChangeText={(text) => this.setDuration(text, index)}
                                        value={item.duration.toString()}
                                    />
                                    <Text
                                        style={{
                                            color: 'white',
                                            padding: 5,
                                            fontSize: 16,
                                            marginBottom: 10,
                                            marginLeft: 50,
                                        }} >
                                        Calories: {this.calculateCal(item.met, item.duration)}</Text>
                                </View>
                            </Swipeout>
                        </View>
                    }
                />

                <Text style={styles.loginBtn} title="SAVE" onPress={() => this.handleWorkoutSubmit()}>SAVE</Text>
            </View >
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
    loginBtn: {
        color: 'white',
        backgroundColor: 'red',
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold'
      },
});

