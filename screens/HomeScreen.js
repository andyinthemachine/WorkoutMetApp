
import React from "react";
import {
  Text,
  Image,
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Dimensions,
  SectionList,
  AsyncStorage,
  Button
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import Confetti from "react-native-confetti";
import customData from '../metObjects.json';
import withOrientation from "@react-navigation/native/dist/withOrientation";

var height = Dimensions.get("window").height;

const Contact = styled.Text`
backgroundColor: ${props => props.isActive ? 'red' : 'transparent'}
color: ${props => props.isActive ? 'white' : 'black'}
`


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      text: "",
      selectedItem: "",
      selectedGroup: [],
    };
  }

  initData = () => {
    const sections = customData.map(section => {
      const title = section.title;
      const subcategories = [];
      section.subcategories.forEach(subcategory => {
        subcategories.push(section.title + ":" + subcategory.subcategory);
      });
      return { title: title, data: subcategories };
    });
    return sections
  }

  onPress = exercise => {
    const group = this.state.selectedGroup;
    group.push(exercise);

    this.setState({ selectedItem: exercise });
    this.setState({ selectedGroup: group });
  }

  get_image = (title) => {
    let image = "";
    customData.forEach(item => {
      if (item.title === title){
        image = item.image;
      }
    })
    return image;
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

    get_met = (exercise_str) => {
      const temp_arr = exercise_str.split(":");
      const title = temp_arr[0];
      const exercise = temp_arr[1];
      let met = 0;
      customData.forEach(item1 => {
        if (item1.title === title) {
          item1.subcategories.forEach(item2 => {
            if (item2.subcategory === exercise)
              met = item2.met;
          })
        }
      })
      return met;
    }

    if (this.state.selectedGroup.length > 0 && this.state.text != "") {
      const new_arr = this.state.selectedGroup.map(exercise => {
        return { exercise: exercise, met: get_met(exercise), duration: 5 }
      });
      this._insertAsyncDataIntoDB(new_arr, workouts);
      
    }
  };

  static navigationOptions = { header: null };


  // retrieve userName from asyncStorage
  // and insert workout into db
  _insertAsyncDataIntoDB = async (new_arr, workouts) => {

    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
        console.log('value: ', value);
        workouts.insertOne({
          userName: value,
          status: "new",
          description: this.state.text,
          exercises: new_arr,
          date: new Date()
        })
          .then(() => {
            if (this._confettiView) {
              this._confettiView.startConfetti();
            }
            this.setState({ selectedGroup: [] });
            this.setState({ selectedItem: "" });
            this.setState({ value: !this.state.value });
            this.setState({ text: "" });
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
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

        <Confetti
            confettiCount={50}
            timeout={10}
            duration={2000}
            ref={node => (this._confettiView = node)} />

            <Text style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#262526',
                color: '#fff',
                marginHorizontal: 10,
                padding: 10
            }}>Description:</Text>
            <Text style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'white',
                marginHorizontal: 20,
                marginBottom: 25,
                padding: 10
            }}>For our React Native group project, we have created this mobile app that allows users to keep track of the amount of calories being burned during a workout.</Text>

            <Text style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#262526',
                color: '#fff',
                marginHorizontal: 10,
                padding: 10
            }}>Instructions:</Text>
            <Text style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'white',
                marginHorizontal: 20,
                marginBottom: 100,
                padding: 10
            }}>Step 1. Select the exercise(s) you wish to track below, by tapping each item.{"\n"}
            Step 2. Name your new workout and click the add icon.{"\n"}
            Step 3. Click the "Workouts" tab below to check out your Workout list.{"\n"}
            Step 4. Edit each workout by a long press{"\n"}
            Step 5. By completing each workout, they can be found in the "Completed" tab.
            </Text>

          <SectionList style={{ paddingBottom: 100}}
            sections={this.initData()}
            renderItem={({ item }) => <Contact
            style={styles.item}
            renderSectionHeader={this._renderSectionHeader}
            stickySectionHeadersEnabled={true}
            isActive={this.state.selectedItem === item}
            onPress={() => this.onPress(item)}> {item}
            </Contact>}
            
            renderSectionHeader={({ section }) => 
            <View>
            <Text style={styles.sectionHeader}>
            <Ionicons
                name={Platform.OS == "ios" ? "ios-fitness" : "md-fitness"}
                size={25}
                style={{ color: "white", paddingRight: 25, marginRight: 25}} />

            {section.title}</Text>
            </View>
            }
            keyExtractor={(item, index) => index}
          />

        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={{
              textAlign: 'center',
              backgroundColor: 'white',
              color: 'black',
              padding: 5,
          }}>Hello, Name!</Text>
          <Text style={{
              textAlign: 'center',
              backgroundColor: 'white',
              color: 'black',
              padding: 8,
              fontWeight: 'bold',
          }}>Type your new workout name below:
          </Text>
          <TextInput
            style={{
              color: "white",
              fontSize: 16,
              padding: 10,
              paddingLeft: 25,
              backgroundColor: 'black',
            }}
            placeholder="Your workout..."
            placeholderTextColor="lightgrey"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onSubmitEditing={() => this.handleSubmit()}
          />

          <View
            style={{
                flexDirection: 'row',
                paddingHorizontal: 75,
                marginTop: 10,
            }}>

            <Text style={styles.tabBarInfoText}> Exercises Selected: {this.state.selectedGroup.length}</Text>

            <TouchableOpacity onPress={() => this.handleSubmit()} style={{}}>
                <Ionicons
                name={Platform.OS == "ios" ? "ios-add-circle" : "md-add-circle"}
                size={35}
                style={{ marginTop: 0, color: "red", flex: 1}} />
            </TouchableOpacity>
          </View>
        </View>

    </View>
    );
  }
}

HomeScreen.navigationOptions = {
    headerTitle: (
      <Ionicons
        name={Platform.OS == "ios" ? "ios-add-circle" : "md-add-circle"}
        size={23}
        style={{
          color: "black",
          flex: 1,
          textAlign: "center"
        }}
        resizeMode="contain"
      />
    )
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F3E40',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 175,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  welcomeImage: {
    width: 75,
    height: 25,
    resizeMode: 'contain',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    marginTop: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    backgroundColor: '#3F3E40',
    paddingBottom: 20,
    color: 'white',
    flexDirection: 'column',
    shadowOffset:{ width: 0,  height: 0, },
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  tabBarInfoText: {
    fontSize: 14,
    color: 'white',
    flex: 1, 
    alignSelf: 'center'
    // flexDirection: "row"
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#262526',
    color: '#fff',
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  item: {
    padding: 10,
    fontSize: 16,
    height: 44,
    color: '#fff'
  },
});
