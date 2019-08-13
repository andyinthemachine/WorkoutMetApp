
import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen"
import EditScreen from '../screens/EditScreen'

const LoginStack = createStackNavigator({
  Login: LoginScreen
});

LoginStack.navigationOptions = {
  tabBarLabel: "New",
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-add-circle${focused ? "" : "-outline"}`
          : "md-add-circle"
      }
    />
  )
};


const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "login",
  tabBarVisible: true,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-add-circle${focused ? "" : "-outline"}`
          : "md-add-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Current",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-mail${focused ? "-open" : ""}`
          : `md-mail${focused ? "-open" : ""}`
      }
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Completed",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? "ios-checkmark-circle-outline"
          : "md-checkmark-circle-outline"
      }
    />
  )
};

const EditStack = createStackNavigator({
  Edit: EditScreen
});

EditStack.navigationOptions = {
  tabBarLabel: "Edit",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? "ios-create"
          : "md-create"
      }
    />
  )
};

export default createBottomTabNavigator({
  LoginStack,
  HomeStack,
  LinksStack,
  SettingsStack,
  EditStack
});
