import React, { Component } from "react";
import {
  Alert,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";
import { NavigationActions } from "react-navigation";

function isIOS() {
  return Platform.OS === "ios";
}

function isIphoneX() {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

const SPLASH_BACKGROUND_IMAGE = "./assets/images/splash-background.png";

export default class SpalshScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentWillUpdate() {
    let resetAction;

    if (this.props.screenProps.muralsloaded === true &&
      this.props.screenProps.artistsloaded === true) {
      this.state.loaded = true;
      resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: "HomePage"})]
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  componentDidMount() {
    // Tell user about slow connection after 10 seconds
    setTimeout(() => {
      if (this.state.loaded === false) {
        Alert.alert(
          "Slow Connection",
          "It looks like you have a very slow or nonexistent network connection. " +
            "This app requires the internet to load data.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: true }
        );
      }
    }, 10000);
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.backgroundContainer}>
        {
            isIOS() && 
            <Image
              style={styles.background}
              source={require(SPLASH_BACKGROUND_IMAGE)}
            />
        }
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 100,
    // if iphoneX, 130%, else if iOS, 120%, else (if android) 0%
    marginTop: isIphoneX() ? "130%" : (isIOS() ? "120%" : "0%")
  },
  background: {
    flex: 1,
    resizeMode: "contain",
    position: "absolute",
    height: "100%",
    width: "100%"
  }
});
