import React from "react";
import HomeScreen from "./HomeScreen";
import {
  StyleSheet,
  View,
  Keyboard,
  TextInput,
  Dimensions,
  Button
} from "react-native";

var height = Dimensions.get("window").height;

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      text2: "",
      userName: ""
    };
  }
  handleNameSubmit = () => {
    Keyboard.dismiss();
    this.setState({ userName: this.state.text, passWord: this.state.text2 }, () => {
      if (this.state.text != "") {
        this.props.navigation.navigate('Home', { userName: this.state.userName });
      };
    });
  };

  static navigationOptions = { header: null };

  render() {
    return (
      <View style={""}>
        <TextInput
          style={{
            color: "lightgray",
            fontSize: 20,
            marginTop: height / 2 - 60
          }}
          placeholder="Enter your user name"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TextInput
          style={{
            color: "lightgray",
            fontSize: 20,
            marginTop: height / 2 - 60
          }}
          placeholder="Enter your password"
          type="password"
          secureTextEntry={true}
          onChangeText={text2 => this.setState({ text2 })}
          value={this.state.text2}
          onSubmitEditing={Keyboard.dismiss}
        />
        <Button title="Sign in!" onPress={this.handleNameSubmit} />

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