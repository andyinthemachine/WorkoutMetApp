
import React from "react";
import { RefreshControl, Platform, SectionList, StyleSheet, Text, View } from "react-native";
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
      workouts: undefined,
      refreshing: false,
      userName: "Joe"
    };
    this._loadClient = this._loadClient.bind(this);
  }

  componentDidMount() {
    console.log("Component Mounted")
    // this._loadClient();
    const { addListener } = this.props.navigation;          
    this.listeners = [addListener('didFocus', () => { this._loadClient();})]  
  }

  componentWillUnmount() {
    this.listeners.forEach(
      sub => { sub.remove() },
    )
  }

  render() {
    console.log("Render")
    const { manifest } = Constants;
    const sections =
      this.state.workouts == undefined
        ? [{ data: [{ title: "Loading..." }], title: "Loading..." }]
        : this.state.workouts.length > 0
          ? [{ data: this.state.workouts, title: "Edit workouts" }]
          : [
            {
              data: [{ title: "No workouts" }],
              title: "No workouts"
            }
          ];

    return (
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
            onRefresh={this._onRefresh}
          />
        }
      />
    );
  }

  _renderSectionHeader = ({ section }) => {
    return <SectionHeader title={section.title} />;
  };

  _renderItem = ({ item }) => {
    console.log("Render Item")
    // console.log("Item:", item)
    // console.log("Array:", item.exercises)

    initExercises = () => {
        console.log("Init: ",item)
      // const exercises = item.exercises.map(act => {
      //     const exercise = act.exercise;
      //     const activities = []; 
      //     act.activities.forEach(exercise => {
      //         activities.push(exercise.exercise)
      //     })
      //     console.log(activities)
      //     return { title: exercise, data: item}
      // })
      // return exercises
    }
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
              onPress: () => this._onPressArchive(item._id)
            }
          ]}
        >
          <View style={styles.taskListTextTime}>
            {item.title != "No workouts" &&
              item.title != "Loading..." ? (
                <Text style={styles.taskListTextTime}>
                  BLAHHHHHHHH
                </Text>
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

  _onRefresh = () => {
    console.log("Refreshing")
    this.setState({ refreshing: true });
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("workoutmanager");
    const workouts = db.collection("workouts");
    workouts
      .find(
        { _id: new BSON.ObjectId("5d5329e9a25d1aef6ed22066") }
      )
      .asArray()
      .then(docs => {
        this.setState({ workouts: docs });
        this.setState({ refreshing: false });
      })
      .catch(err => {
        console.warn(err);
      });
  };

  _loadClient() {
    console.log("Loading Client")
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("workoutmanager");
    const workouts = db.collection("workouts");
    workouts
      .find(
        { _id: new BSON.ObjectId("5d5329e9a25d1aef6ed22066") }
      )
      .asArray()
      .then(docs => {
        this.setState({ workouts: docs });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  _onPressArchive(itemID) {
      console.log("Archived")
    if (itemID) {

      const stitchAppClient = Stitch.defaultAppClient;
      const mongoClient = stitchAppClient.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
      );
      const db = mongoClient.db("workoutmanager");
      const workouts = db.collection("workouts");
      workouts
        .findOne(
          { _id: new BSON.ObjectId("5d5329e9a25d1aef6ed22066") },
          { $set: { status: "archived", archivedDate: new Date() } },
          { upsert: true }
        )
        .then(() => {
          workouts
            .find({ status: "completed",
            userName: this.state.userName }, { sort: { date: -1 } })
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
