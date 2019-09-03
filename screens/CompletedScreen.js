
import React from "react";
import { RefreshControl, Platform, SectionList, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from "react-native";
import Constants from "expo-constants";
import Swipeout from "react-native-swipeout";
import moment from "moment/min/moment-with-locales";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";


export default class CompletedScreen extends React.Component {
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
    const { addListener } = this.props.navigation;
    this.listeners = [addListener('didFocus', () => { this._loadClient(); })]
  }

  componentWillUnmount() {
    this.listeners.forEach(
      sub => { sub.remove() },
    )
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this._grabAsyncDataPullFromDB();
  };

  _grabAsyncDataPullFromDB = async () => {
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("workoutmanager");
    const workouts = db.collection("workouts");
    try {
      const value = await AsyncStorage.getItem('key');
      console.log('async data: ', value);
      if (value !== null) {
        console.log('value: ', value);
        workouts
          .find({ status: "completed", userName: value }, { sort: { date: -1 } })
          .asArray()
          .then(docs => {
            this.setState({ workouts: docs });
            this.setState({ refreshing: false });
          })
          .catch(err => {
            console.warn(err);
          });
      }
    } catch (error) {
      console.log(error.message);
    }

  };


  render() {
    const { manifest } = Constants;
    const sections =
      this.state.workouts == undefined
        ? [{ data: [{ title: "Loading..." }], title: "Loading..." }]
        : this.state.workouts.length > 0
          ? [{ data: this.state.workouts, title: "Completed Workouts" }]
          : [
            {
              data: [{ title: "No completed workouts" }],
              title: "No completed workouts"
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
    return (
      <SectionContent>
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
            onPress: () => this._onPressDelete(item._id)
          }
          ]} 
          left={[
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
                    name={Platform.OS == "ios" ? "ios-undo" : "md-undo"}
                    size={30}
                    style={{ textAlign: "center", color: "white" }}
                  />
                </View>
              ),
              backgroundColor: "#2e78b7",
              onPress: () => this._onPressUnComplete(item._id)
            }
          ]} 
          >
          <TouchableOpacity onLongPress={() => this._onPressEdit(item._id)}>
            <View style={styles.taskListTextTime}>
              {item.title != "No completed workouts" &&
                item.title != "Loading..." ? (
                  <Text style={styles.taskListTextTime}>
                    created {moment(item.date).fromNow()}
                  </Text>
                ) : item.title == "No completed workouts" ? (
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
              {item.title != "No completed workouts" ? item.description : ""}
            </Text>
            <Text style={styles.taskListTextTimeComplete}>
              {item.title != "No completed workouts" && item.title != "Loading..."
                ? "completed " + moment(item.completedDate).fromNow()
                : null}
            </Text>
          </TouchableOpacity>
        </Swipeout>
      </SectionContent>
    );
  };

  _loadClient() {
    this._grabAsyncDataPullFromDB();
  }

  _onPressEdit(itemID) {
    this.props.navigation.navigate('Edit', {id: itemID});
  }

  _onPressDelete(itemID) {
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("workoutmanager");
    const workouts = db.collection("workouts");
    workouts.deleteOne({ _id: itemID })
      .then(() => {
        workouts.find({ status: "completed", userName: this.state.userName }, { sort: { date: -1 } })
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


  _onPressUnComplete(itemID) {
    if (itemID) {
      const stitchAppClient = Stitch.defaultAppClient;
      const mongoClient = stitchAppClient.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
      );
      const db = mongoClient.db("workoutmanager");
      const workouts = db.collection("workouts");
      workouts
        .updateOne(
          { _id: itemID },
          { $set: { status: "new" }},
          { upsert: true }
        )
        .then(() => {
          this._grabAsyncDataPullFromDB();
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

CompletedScreen.navigationOptions = {
  headerTitle: (
    <Ionicons
      name={
        Platform.OS == "ios"
          ? "ios-checkmark-circle"
          : "md-checkmark-circle"
      }
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
    fontSize: 14,
    fontWeight: "bold"
  },
  sectionContentContainer: {
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray"
  },
  sectionContentText: {
    color: "white",
    fontSize: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    textAlign: "left"
  },
  taskListTextTime: {
    paddingHorizontal: 15,
    paddingVertical: 3,
    textAlign: "center",
    color: "lightgray"
  },
  taskListTextTimeComplete: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    textAlign: "left",
    color: "red",
    fontSize: 13
  }
});
