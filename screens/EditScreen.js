
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
            test_obj: {
                description: "smitty",
                exercises: [
                    {
                        exercise: "kettle bells",
                        duration: 4,
                        met: 12.4
                    }, 
                    {
                        exercise: "sit ups",
                        duration: 7,
                        met: 7.3
                    },
    
                ]
            },
            refreshing: false,
            userName: "Joe",
            met: 0,
            duration: 5,
            caloriesBurned: 909090,
            totalCal: 2,
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

        // console.log(this.state.test_obj.exercises);
        // console.log(arr[0]);
        // console.log("Test 2: ", this.state.test_obj.exercises[1].exercise)

        // console.log(this.state.workout.exercises);
        console.log(this.state.workout.exercises[0]);
        // console.log(typeof this.state.workout.weight);
        // this.state.workout.exercises.forEach(item => console.log(item.exercise))
        
        return(7);

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

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={{
                        color: 'red',
                        textAlign: 'center',
                        padding: 5,
                        fontSize: 28,
                        marginBottom: 10
                    // }}>{this.state.workout.description} Cal : {this.calculateTotal()}</Text>
                     }}>{this.state.workout.description} Cal : {this.state.totalCal} </Text> 

                <FlatList
                    style={{ marginHorizontal: 25 }}
                    data={this.state.workout.exercises}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
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
                            {/* <TextInput 
                             editable={true}
                                keyboardType={'numeric'}
                             placeholder={"edit min here"}
                            value={this.state.[duration]}
                             /> */}
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
                                        marginBottom: 10,
                                    }} >
                                    {item.duration} min</Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        padding: 5,
                                        fontSize: 16,
                                        marginBottom: 10
                                    }} >
                                    Cal: {this.calculateCal(item.met, item.duration)}</Text>
                            </View>
                        </View>
                    }

                />
                <Button
                        
                    onPress={() => this.setState({totalCal: this.calculateTotal()})}

                    // onPress={() => this.props.navigation.goBack()}
                    title="Save"
                    color="#841584"
                />
            </View>
        );
    }

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
                // { _id: new BSON.ObjectId(temp_id) }
                { _id: wkout_id }
            )
            .then(wkout => {
                this.setState({ workout: wkout }, () => this.setState({totalCal: this.calculateTotal()}) 
                );
            })
            .catch(err => {
                console.warn(err);
            });
        console.log("Loading Client")
    }

}

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
