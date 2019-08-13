
import React from "react";
import { RefreshControl, Platform, SectionList, StyleSheet, Text, View, AsyncStorage } from "react-native";
import moment from "moment";
import Swipeout from "react-native-swipeout";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import Confetti from "react-native-confetti";

export default class LinksScreen extends React.Component {
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
    // this._loadClient();
    const { addListener } = this.props.navigation;
    this.listeners = [addListener('didFocus', () => { this._loadClient(); })]
  }

  componentWillUnmount() {
    this.listeners.forEach(sub => { sub.remove() })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });


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
          .find({ status: "new", userName: value }, { sort: { date: -1 } })
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

    const sections =
      this.state.workouts == undefined
        ? [{ data: [{ title: "Loading..." }], title: "Loading..." }]
        : this.state.workouts.length > 0
          ? [{ data: this.state.workouts, title: "Current Workouts" }]
          : [
            {
              data: [{ title: "No new workouts" }],
              title: "No new workouts"
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
            onRefresh={this._onRefresh} />
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
        <Confetti
          confettiCount={50}
          timeout={10}
          duration={2000}
          ref={node => (this._confettiView = node)} />
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
                  ? "ios-checkmark-circle-outline"
                  : "md-checkmark-circle-outline"
                } size={30} style={{ textAlign: "center", color: "white" }} />
              </View>
            ),
            backgroundColor: "green",
            onPress: () => this._onPressComplete(item._id)
          }
          ]}
          left={[{
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
          ]} >
          <View style={styles.taskListTextTime}>
            {item.title != "No new workouts" && item.title != "Loading..." ? (
              <Text style={styles.taskListTextTime}>
                {moment(item.date).fromNow()}
              </Text>
            ) : item.title == "No new workouts" ? (
              <AntDesign
                name={Platform.OS == "ios" ? "smileo" : "smileo"}
                size={30}
                style={{
                  textAlign: "center",
                  color: "lightgray",
                  marginTop: 25
                }} />
            ) : (
                  <Text />
                )}
          </View>
          <Text style={styles.sectionContentText}>
            {item.title != "No new workouts" ? item.description : ""}
          </Text>
        </Swipeout>
      </SectionContent>
    );
  };

  _loadClient() {
    this._grabAsyncDataPullFromDB();
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
          workouts.find({ status: "new", userName: this.state.userName }, { sort: { date: -1 } })
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
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("workoutmanager");
    const workouts = db.collection("workouts");
    workouts.deleteOne({ _id: itemID })
      .then(() => {
        workouts.find({ status: "new", userName: this.state.userName }, { sort: { date: -1 } })
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
    <>
      <Ionicons
        name={Platform.OS == "ios" ? "ios-clipboard" : "md-clipboard"}
        size={23}
        style={{
          color: "#2e78b7",
          flex: 4,
          textAlign: "right",
          flexDirection: "row",
          paddingLeft: 30

        }}
        resizeMode="contain"
      />
      <Ionicons
        name={Platform.OS == "ios" ? "ios-settings" : "md-settings"}
        size={23}
        style={{
          color: "#2e78b7",
          flex: 4,
          textAlign: "right",
          flexDirection: "row",
          paddingRight: 20
        }}
        resizeMode="contain"
      />
    </>
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
  }
});
