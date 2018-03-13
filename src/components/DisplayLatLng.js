import React from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, Alert,
  KeyboardAvoidingView, ScrollView, TouchableOpacity, Button,
  Image, TextInput, Switch, TouchableHighlight, NetInfo } from 'react-native';
import { SafeAreaView, StackNavigator, NavigationActions } from 'react-navigation';
import { ImagePicker, Permissions, MapView, Location } from 'expo';
import TargetIcon from '../../assets/images/target.png';
import SnackBar from 'react-native-snackbar-component';
import Fire from '../fire.js';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 33.20548;
const LONGITUDE = -97.13169;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class DisplayLatLng extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      location: null,
      latitude: null,
      longitude: null,
      errorMessage: null,
      address: null,
      status: true,
      coords: {
        latitude: 0,
        longitude: 0,
      },
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Issue Location",
      headerStyle: {
        backgroundColor: '#4f4380'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: (
        <TouchableOpacity style={{marginLeft: 15}} onPress={() => navigation.goBack(null)}>
          <Text style={{color: '#ffffff', font: 16, fontWeight: 'bold'}}>
            Cancel
          </Text>
        </TouchableOpacity>
      ),
      headerRight: (
        [
          params.isDone ?
            <TouchableOpacity style={{marginRight: 15}} onPress={() => params.saveLocation(params.address, params.coords)} >
              <Text style={{color: '#ffffff', font: 16, fontWeight: 'bold'}}>
                Done
              </Text>
            </TouchableOpacity> :
            <Text style={{color: '#AAAFB4', font: 16, fontWeight: 'bold', marginRight: 15}}>
              Done
            </Text>
        ]
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      address: null,
      coords: null,
      isDone: false,
    });

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    this.checkInetConnection();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  checkInetConnection = () => {
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); }
    );
  };

  handleConnectionChange = (isConnected) => {
    this.setState({ status: isConnected });
    //alert(`is connected: ${this.state.status}`);
  };

  _getLocationAsync = async () => {
    this.checkInetConnection();

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    let newLatDelta = 0.0080;
    let newLongDelta = newLatDelta * ASPECT_RATIO;

    let newRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: newLatDelta,
      longitudeDelta: newLongDelta,
    };

    let coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    if (location.coords.latitude > (LATITUDE + .10) || location.coords.latitude < (LATITUDE - .10)) {
      this.setState({
        errorMessage: 'Your location is not in Denton, select location in Denton area'
      });
    } else if (location.coords.longitude > (LONGITUDE + .12) || location.coords.longitude < (LONGITUDE - .12)) {
      this.setState({
        errorMessage: 'Your location is not in Denton, select location in Denton area'
      });
    } else {
      this.map.animateToRegion(newRegion);
      this._geocodeCoords(coords);
      this.setState({
        coords: coords,
        region: newRegion,
      });
      this.props.navigation.setParams({
        coords: coords
      });
    }
  };

  _geocodeCoords = async (location) => {
    this.checkInetConnection();

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let geocodeAddress = await Location.reverseGeocodeAsync(location);
    console.log(geocodeAddress[0].name.toString().substr(0,geocodeAddress[0].name.toString().indexOf(' ')));
    console.log(geocodeAddress[0].name.toString().substr(0,geocodeAddress[0].name.toString().indexOf('')));
    let address = geocodeAddress[0].name.toString() + ", " + geocodeAddress[0].city.toString();
    this.setState({
      text: address,
      address: geocodeAddress
    });
    this.props.navigation.setParams({
      address: geocodeAddress,
      isDone: true,
    });
  };

  onRegionChange(region) {
    this.setState({ region });
  }

  onMapPress(e) {
    this.checkInetConnection();

    let newLatDelta = 0.0080;
    let newLongDelta = newLatDelta * ASPECT_RATIO;

    let newRegion = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: newLatDelta,
      longitudeDelta: newLongDelta,
    };

    let coords = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    };

    if (e.nativeEvent.coordinate.latitude > (LATITUDE + .10) || e.nativeEvent.coordinate.latitude < (LATITUDE - .10)) {
      this.setState({
        errorMessage: 'Location is not in Denton, select location in Denton area'
      });
      console.log('not in lat range');
    } else if (e.nativeEvent.coordinate.longitude > (LONGITUDE + .12) || e.nativeEvent.coordinate.longitude < (LONGITUDE - .12)) {
      this.setState({
        errorMessage: 'Location is not in Denton, select location in Denton area'
      });
      console.log('not in long range');
    } else {
      this.map.animateToRegion(newRegion);
      this._geocodeCoords(coords);
      this.setState({
        coords: e.nativeEvent.coordinate,
        region: newRegion,
        isCoords: true,
      });
      this.props.navigation.setParams({
        coords: coords
      });
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
      },
      latlng: {
        width: 200,
        alignItems: 'stretch',
      },
      button: {
        width: 100,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
      },
      buttonText: {
        textAlign: 'center',
      },
      addressTextField: {
        height: 30,
        backgroundColor: 'white',
        fontSize: 16,
        margin: 7,
        borderRadius: 3,
        textAlign: 'center'
      },
      actionButtonIcon: {
        color: '#333',
      },
      actionButton: {
        backgroundColor: '#ffffff',
        borderColor: '#f3f3f3',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        }
      },
      icon: {
        width: 25,
        height: 25,
      }
    });

    let isLocationError = false;
    if (this.state.errorMessage) {
      isLocationError = true;
    }

    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          ref={ref => { this.map = ref; }}
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}
          onPress={(e) => this.onMapPress(e)}
        >
          <MapView.Marker coordinate={this.state.coords}/>
        </MapView>
        <SafeAreaView
          style={{position: 'absolute', top: 0, width: width}}
          forceInset={{ vertical: 'never' }}
        >
          <View style={{backgroundColor: 'grey'}}>
            <TextInput
              style={styles.addressTextField}
              onChangeText={(text) => this.setState({text})}
              placeholder="Where is the issue?"
              value={this.state.text}
              underlineColorAndroid="#fff"
            />
          </View>
        </SafeAreaView>
          <TouchableHighlight
            style={styles.actionButton}
            underlayColor='#f3f3f3'
            onPress={()=>{this._getLocationAsync()}}
          >
            <Image style={styles.icon} source={TargetIcon}/>
          </TouchableHighlight>
        <SnackBar
          visible={!this.state.status}
          textMessage="No internet connection, please connect to the internet"
          actionHandler={()=>{this.setState({status: !this.state.status})}}
          actionText="Close"
        />
        <SnackBar
          visible={isLocationError}
          textMessage={this.state.errorMessage}
          actionHandler={()=>{this.setState({errorMessage: null})}}
          actionText="Close"
        />
      </View>
    );
  }
}