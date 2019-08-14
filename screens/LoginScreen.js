import React from "react";
import HomeScreen from "./HomeScreen";
import {
  StyleSheet,
  View,
  Keyboard,
  TextInput,
  Button,
  AsyncStorage,
  Text
} from "react-native";



export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      text2: "",
      text3: "",
      userName: "",
      weight: "",
    };
  }
  handleNameSubmit = () => {
    Keyboard.dismiss();
    this.setState({ userName: this.state.text, passWord: this.state.text2, weight: this.state.text3 }, () => {
      if (this.state.text != "" && this.state.text3 != "") {
        this.props.navigation.navigate('Home'/*, { userName: this.state.userName }*/);
        this._storeData(this.state.userName, this.state.weight)
        // this._retrieveData();
      };
    });
  };

  static navigationOptions = { header: null };

  _storeData = async (key, weight) => {
    try {
      await AsyncStorage.setItem('key', key);
      await AsyncStorage.setItem('weight', weight)
      console.log('weight: ', weight)
    } catch (error) {
      console.log(error)
    }
  };

  // _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('key');
  //     if (value !== null) {
  //       // console.log('value: ', value);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   return (value);
  // };

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.formContainer}>
          <Text
            style={{
              color: "white",
              textAlign: 'center',
              fontSize: 16,
              padding: 10,
              marginBottom: 10
            }}>Welcome! Login to begin.</Text>

          <TextInput
            style={{
              color: "white",
              fontSize: 16,
              backgroundColor: 'black',
              padding: 10,
              marginBottom: 10
            }}
            placeholder="Enter username..."
            placeholderTextColor="lightgrey"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onSubmitEditing={Keyboard.dismiss}
          />

          <TextInput
            style={{
              color: "white",
              fontSize: 16,
              backgroundColor: 'black',
              padding: 10,
              marginBottom: 50
            }}
            placeholder="Enter password..."
            placeholderTextColor="lightgrey"
            type="password"
            secureTextEntry={true}
            onChangeText={text2 => this.setState({ text2 })}
            value={this.state.text2}
            onSubmitEditing={Keyboard.dismiss}
          />

          <TextInput
            style={{
              color: "white",
              fontSize: 16,
              backgroundColor: 'black',
              padding: 10,
              marginBottom: 10
            }}
            placeholder="Enter your weight..."
            placeholderTextColor="lightgrey"
            onChangeText={text3 => this.setState({ text3 })}
            value={this.state.text3}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Button style={styles.loginBtn} title="Sign in!" onPress={this.handleNameSubmit} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F3E40',
    color: 'white',
    justifyContent: "center",
    alignItems: "center",
    padding: 0
  },
  formContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingTop: 20,
    paddingBottom: 50,
    marginHorizontal: 20,
    color: 'white',
    flexDirection: 'column',
  },
  loginBtn: {
    color: 'red'
  }
});