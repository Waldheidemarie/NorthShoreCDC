
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Button} from 'react-native';
import MapView from 'react-native-maps';
import { NavigationActions } from 'react-navigation'
import { lightpurple, darkpurple, pink } from './colors.js';


export default class ExplorePage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition();
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    static navigationOptions = ({ navigation }) => ({
    headerLeft:   
    <TouchableOpacity style = {{top: 30, left: 20, padding: 50}} onPress={() => navigation.dispatch(NavigationActions.back())} >
    <Image 
    style= {{position: 'absolute', zIndex: 100, maxWidth: 40, maxHeight: 40}}
    source={require('./backbutton.png')} /> 
    </TouchableOpacity>,
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, borderBottomColor: 'transparent' }
    });


    renderImages() {
        const { navigate } = this.props.navigation;
        
        murals = this.props.screenProps.murals || {}
        artists = this.props.screenProps.artists || {}
        return Object.keys(murals).map((key,i) =>{
            lat = parseFloat(murals[key]["Lat"]);
            long = parseFloat(murals[key]["Long"]);
            title = murals[key]["Title"];
            artistName = artists[murals[key]["Artist"]]["name"];

            return(
              <MapView.Marker
                  key={i}
                  title = {title}
                  description = {artistName}
                  coordinate= {{latitude: lat, longitude: long}}
                  pinColor = {pink}
                  onCalloutPress = { () => { navigate('MuralInfoPage', {mural: murals[key], artist: artists[murals[key]["Artist"]]}) }}
              />
                
            );
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style = {{flex: 1}}>
            <MapView
              showsUserLocation={true}
              style = {{flex: 1 }}
              region = {{
                latitude: 42.5183849,
                longitude: -70.8957987,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
              }}>
              {this.renderImages()}
            </MapView>
            </View>
        )
    }
}

