import React from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, Alert,
  KeyboardAvoidingView, ScrollView, TouchableOpacity, Button,
  Image, TextInput, Switch } from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator, NavigationActions } from 'react-navigation';
import { ImagePicker, Permissions, MapView, Location } from 'expo';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

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
        backgroundColor: '#4510A2'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: (
        <TouchableOpacity style={{marginLeft: 15}} onPress={() => navigation.goBack(null)}>
          <Text style={{color: '#f3f3f3', font: 16, fontWeight: 'bold'}}>
            Cancel
          </Text>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity style={{marginRight: 15}} onPress={() => params.saveLocation(params.address)} >
          <Text style={{color: '#f3f3f3', font: 16, fontWeight: 'bold'}}>
            Done
          </Text>
        </TouchableOpacity>
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ address: null });
  }

  _getLocationAsync = async () => {
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
      console.log('not in lat range');
    } else if (location.coords.longitude > (LONGITUDE + .12) || location.coords.longitude < (LONGITUDE - .12)) {
      this.setState({
        errorMessage: 'Your location is not in Denton, select location in Denton area'
      });
      console.log('not in long range');
    } else {
      this.map.animateToRegion(newRegion);
      this._geocodeCoords(coords);
      this.setState({
        marker: coords,
        region: newRegion,
      });
    }
  };

  _geocodeCoords = async (location) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let geocodeAddress = await Location.reverseGeocodeAsync(location);
    let address = geocodeAddress[0].name.toString() + ", " + geocodeAddress[0].city.toString();
    this.setState({
      text: address,
      address: geocodeAddress
    });
    this.props.navigation.setParams({ address: geocodeAddress});
  };

  onRegionChange(region) {
    this.setState({ region });
  }

  onMapPress(e) {
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
        marker: e.nativeEvent.coordinate,
        region: newRegion,
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
    });

    let isLocationError = false;
    if (this.state.errorMessage) {
      isLocationError = true;
    }

    let isMarker = false;
    if(this.state.maker) {
      isMarker = true;
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
          <MapView.Marker coordinate={this.state.marker}/>
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
            />
          </View>
        </SafeAreaView>
        {/* Rest of the app comes ABOVE the action button component !*/}
          <ActionButton
            icon={<Icon name="md-locate" size="25" style={styles.actionButtonIcon} />}
            buttonColor='#f3f3f3'
            onPress={() => this._getLocationAsync()}
            position="right"
          />
        <View style={[styles.bubble, styles.latlng, {display: isLocationError ? '' : 'none'}]}>
          <Text style={{ textAlign: 'center' }}>
            {isLocationError ? this.state.errorMessage : ''}
          </Text>
        </View>
      </View>
    );
  }
}