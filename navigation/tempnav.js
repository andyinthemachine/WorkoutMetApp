import React, { Component } from "react";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import LoginScreen from "./Screens/LoginScreen";
export default class App extends Component {
  render() {
    return <StackNav />;
  }
}
const StackNav = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: {
        headerMode: "none",
        header: null
      }
    },
    First: {
      screen: First,
      navigationOptions: {
        headerMode: "none",
        header: null
      }
    },
    Second: {
      screen: Second,
      navigationOptions: {
        headerMode: "none",
        header: null
      }
    }
  },
  {
    initialRouteName: "TabNavigator"
  }
);

const AppTabNavigator = createBottomTabNavigator({
  Login: {
    screen: LoginScreen
  }
});