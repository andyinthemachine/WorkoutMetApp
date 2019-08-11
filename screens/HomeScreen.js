
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
  SectionList
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import Confetti from "react-native-confetti";
import customData from '../metObjects.json';

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
      selectedGroup: []
    };
  }

  initData = () => {
    const sections = customData.map(section => {
      const title = section.title;
      const subcategories = [];
      section.subcategories.forEach(subcategory => {
        subcategories.push(section.title + ": " + subcategory.subcategory + "\n\n met: " + subcategory.met);
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
    console.log(this.state.selectedGroup);
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

    if (this.state.selectedGroup.length > 0 && this.state.text != "") {
      workouts.insertOne({
        status: "new",
        description: this.state.text,
        exercises: this.state.selectedGroup,
        date: new Date()
      })
        .then(() => {
          if (this._confettiView) {
            this._confettiView.startConfetti();
          }
          this.setState({selectedGroup: []});
          this.setState({ selectedItem: "" });
          this.setState({ value: !this.state.value });
          this.setState({ text: "" });
        })
        .catch(err => {
          console.warn(err);
        });
    }
  };

  static navigationOptions = { header: null };

  render() {
    return (
      <View style={styles.container}>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/wkout1.png')
                  : require('../assets/images/wkout1.png')
              }
              style={styles.welcomeImage}
            />
            <Confetti
              confettiCount={50}
              timeout={10}
              duration={2000}
              ref={node => (this._confettiView = node)} />
          </View>

          <SectionList style={{ paddingBottom: 100 }}
            sections={this.initData()}
            renderItem={({ item }) => <Contact
              style={styles.item}
              isActive={this.state.selectedItem === item}
              onPress={() => this.onPress(item)}> {item}
            </Contact>}
            renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <TextInput
            style={{
              color: "darkgray",
              fontSize: 16,
            }}
            placeholder="Description: "
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onSubmitEditing={() => this.handleSubmit()}
          />
          <TouchableOpacity onPress={() => this.handleSubmit()}>
            <Ionicons
              name={Platform.OS == "ios" ? "ios-add-circle" : "md-add-circle"}
              size={50}
              style={{ marginTop: 0, color: "#2e78b7" }} />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
          />
          <Text style={styles.tabBarInfoText}> Exercises Selected: {this.state.selectedGroup.length}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
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
    bottom: 0,
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
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 14,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
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
    backgroundColor: 'rgba(247,247,247,1.0)',
    textAlign: 'left',
  },
  item: {
    padding: 10,
    fontSize: 16,
    height: 44
  },
});
