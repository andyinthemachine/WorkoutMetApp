import React from "react";
import HomeScreen from "./HomeScreen";
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

var height = Dimensions.get("window").height;

export default class LoginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        text: "",
        userName: ""
      };
    }
    handleSubmit = () => {
      Keyboard.dismiss();
  
      if (this.state.text != "") {
       this.setState({userName: this.state.text, text: ""});
       (<HomeScreen userName={this.state.userName}/>)     
      }
    };
  
    static navigationOptions = { header: null };
  
  
  
    render() {
      return (
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