
import React from "react";
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from "react-native";
import * as Font from 'expo-font';
import { AppLoading, Asset } from "expo";
import { Icon } from '@expo/vector-icons';
import AppNavigator from "./navigation/AppNavigator";
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      isLoadingComplete: false
    };
    this._loadClient = this._loadClient.bind(this);
  }

  componentDidMount() {
    this._loadClient();
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading} />

      );
    } else {
      return (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </SafeAreaView>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all(require('./assets/images/workout_app_icon.png'));
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  _loadClient() {
    Stitch.initializeDefaultAppClient("workoutp2-rcupa").then(client => {
      this.setState({ client });
      this.state.client.auth.loginWithCredential(new AnonymousCredential())
        .then(user => {
          console.log(`Successfully logged in as user ${user.id}`);
          this.setState({ currentUserId: user.id });
          this.setState({ currentUserId: client.auth.user.id });
        })
        .catch(err => {
          console.log(`Failed to log in anonymously: ${err}`);
          this.setState({ currentUserId: undefined });
        });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});