import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight} from 'react-native';
import { lightpurple, darkpurple, pink } from './colors.js';
import homepic from './home.jpg'

export default class HomePage extends React.Component {

  static navigationOptions = {
  header:null,
  };

  render() {
    const { navigate } = this.props.navigation;
      return (
        <View style = {styles.container}>
          <Image style = {styles.image} source = {homepic} />
          <View style = {styles.titleContainer}>
            <Text style = {styles.titleText}> PUNTO </Text>
            <Text style = {styles.titleText}> URBAN </Text>
            <Text style = {styles.titleText}> ART </Text>
            <Text style = {styles.titleText}> MUSEUM </Text>
          </View>
          <TouchableHighlight
            style = {styles.darkPurpleButton}
            onPress={() =>
            navigate('ExplorePage')
          }>
            <Text style = {styles.buttonText}>EXPLORE</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = {styles.lightPurpleButton}
            onPress={() =>
            navigate('GalleryPage')
          }>
            <Text style = {styles.buttonText}>GALLERY</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = {styles.pinkButton}
            onPress={() =>
            navigate('ContactPage')
          }>
            <Text style = {styles.buttonText}>CONTACT</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
    },
    titleContainer: {
      marginTop: '6%',
      marginLeft: '1%',
      marginRight: '3%',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    titleText: {
      fontSize: 80,
      marginBottom: '2%',
      color: 'white',
      backgroundColor: 'transparent',
    },
    image: {
      resizeMode: 'cover',
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    darkPurpleButton: {
      height: '14%',
      backgroundColor: darkpurple,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: .9,
      margin: -1
    },
    lightPurpleButton: {
      height: '14%',
      backgroundColor: lightpurple,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: .9,
      margin: -1
    },
    pinkButton: {
      height: '14%',
      backgroundColor: pink,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: .9,
      margin: -1
    },
    buttonText: {
      fontSize: 36,
      color: 'white'
    }
  }
);