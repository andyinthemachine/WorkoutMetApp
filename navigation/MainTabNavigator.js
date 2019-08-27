
import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen"
import EditScreen from '../screens/EditScreen'

// const LoginStack = createStackNavigator({
//   Login: LoginScreen
// });

// LoginStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === "ios"
//           ? `ios-add-circle${focused ? "" : "-outline"}`
//           : "md-add-circle"
//       }
//     />
//   )
// };




// const LinksStack = createStackNavigator({
//   Links: LinksScreen
// });

// LinksStack.navigationOptions = {
//   tabBarLabel: "Workouts",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === "ios"
//           ? `ios-mail${focused ? "-open" : ""}`
//           : `md-mail${focused ? "-open" : ""}`
//       }
//     />
//   )
// };


// const SettingsStack = createStackNavigator({
//     Settings: SettingsScreen
//   });

//   SettingsStack.navigationOptions = {
//     tabBarLabel: "Completed",
//     tabBarIcon: ({ focused }) => (
//       <TabBarIcon
//         focused={focused}
//         name={
//           Platform.OS === "ios"
//             ? "ios-checkmark-circle-outline"
//             : "md-checkmark-circle-outline"
//         }
//       />
//     )
//   };

//   const EditStack = createStackNavigator({
//     Edit: EditScreen
//   });




// const MainTabNavigator = createBottomTabNavigator({
//   LoginStack,
//   HomeStack,
//   LinksStack,
//   SettingsStack,
//   // EditStack
// });

const AppTabNavigator = createBottomTabNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      tabBarLabel: "Login",
      tabBarVisible: false,
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === "ios"
              ? `ios-add-circle${focused ? "" : "-outline"}`
              : "md-add-circle"
          } />
      )
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Create",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === "ios"
              ? `ios-add-circle${focused ? "" : "-outline"}`
              : "md-add-circle"
          } />
      )
    }
  },
  Links: {
    screen: LinksScreen,
    navigationOptions: {
      tabBarLabel: "Workouts",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === "ios"
              ? `ios-mail${focused ? "-open" : ""}`
              : `md-mail${focused ? "-open" : ""}`
          } />
      )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: "Completed",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === "ios"
              ? "ios-checkmark-circle-outline"
              : "md-checkmark-circle-outline"
          }/>
      )
    }
  },

});

const MainTabNavigator = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: {
        headerMode: "none",
        header: null
      }
    },
    Edit: {
      screen: EditScreen,
      navigationOptions: {
        headerMode: "none",
        header: null
      }
    },

    //   {
    //     initialRouteName: "LoginScreen"
    // }
  }
);


export { MainTabNavigator };

