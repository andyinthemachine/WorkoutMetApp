
import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import CreateScreen from "../screens/CreateScreen";
import WorkoutsScreen from "../screens/WorkoutsScreen";
import CompletedScreen from "../screens/CompletedScreen";
import LoginScreen from "../screens/LoginScreen"
import EditScreen from '../screens/EditScreen'



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
  Create: {
    screen: CreateScreen,
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
  Workouts: {
    screen: WorkoutsScreen,
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
  Completed: {
    screen: CompletedScreen,
    navigationOptions: {
      tabBarLabel: "Completed",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === "ios"
              ? "ios-checkmark-circle-outline"
              : "md-checkmark-circle-outline"
          } />
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
        header: null,
      }
    },
    Edit: {
      screen: EditScreen,
      navigationOptions: {
        headerMode: "none",
        header: null,
      }
    },
  },
  {
    initialRouteName: "TabNavigator"
  },
);

// MainTabNavigator.navigationOptions = ({ }) => {
//   let tabNavigatorOptions;
//   let editOptions;
//   if (Platform.OS === "android") {
//     tabNavigatorOptions = {
//       TabNavigator: {
//         screen: AppTabNavigator,
//         navigationOptions: {
//           headerMode: "none",
//           header: null,
//         }
//       }
//     }
//     editOptions = {
//       Edit: {
//         screen: EditScreen,
//       },
//       TabNavigator: {
//         screen: AppTabNavigator,
//         navigationOptions: {
//           headerMode: "none",
//           header: null,
//         }
//       }
//     }
//   }
//   return {
//     tabNavigatorOptions
//   };
// };

export { MainTabNavigator };

