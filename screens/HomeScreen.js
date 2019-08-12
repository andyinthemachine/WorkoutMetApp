
import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import Confetti from "react-native-confetti";

var height = Dimensions.get("window").height;


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      text: "",
      userName: null
    };
  }
  handleSubmit = () => {
    Keyboard.dismiss();
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("workoutmanager");
    const workouts = db.collection("workouts");
    console.log(`text =  ${this.state.text}`);

    if (this.state.text != "") {
      workouts.insertOne({
          userName: this.state.userName,
          status: "new",
          description: this.state.text,
          date: new Date()
        })
        .then(() => {
          if (this._confettiView) {
            this._confettiView.startConfetti();
          }
          this.setState({ value: !this.state.value });
          this.props.navigation.setParams({userName: this.state.userName})
          this.setState({ text: "" });
        })
        .catch(err => {
          console.warn(err);
        });
    }
  };

  static navigationOptions = { header: null };

  handleNameSubmit = () => {
    Keyboard.dismiss();
    if (this.state.text != "") {
      this.setState({userName: this.state.text, text: ""})
    }
  }

  render() {
    console.log("userName: ", this.state.userName)
    return (   
      !this.state.userName ? 
      <View style={styles.container}>
        <TextInput
          style={{
            color: "lightgray",
            fontSize: 20,
            marginTop: height / 2 - 60
          }}
          placeholder="Enter your user name"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          onSubmitEditing={() => this.handleNameSubmit()} />

        <TouchableOpacity onPress={() => this.handleNameSubmit()}>
          <Ionicons
            name={Platform.OS == "ios" ? "ios-add-circle" : "md-add-circle"}
            size={50}
            style={{
              marginTop: 50,
              color: "#2e78b7"
            }} />

        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled" />
      </View>
      :
      <View style={styles.container}>
        <Confetti
          confettiCount={50}
          timeout={10}
          duration={2000}
          ref={node => (this._confettiView = node)} />

        <TextInput
          style={{
            color: "lightgray",
            fontSize: 20,
            marginTop: height / 2 - 60
          }}
          placeholder="Enter Workout..."
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          onSubmitEditing={() => this.handleSubmit()} />

        <TouchableOpacity onPress={() => this.handleSubmit()}>
          <Ionicons
            name={Platform.OS == "ios" ? "ios-add-circle" : "md-add-circle"}
            size={50}
            style={{
              marginTop: 50,
              color: "#2e78b7"
            }} />

        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});