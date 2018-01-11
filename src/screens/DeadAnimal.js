import React from 'react';
import { StyleSheet, Keyboard, Text, View, TouchableOpacity, Image, TextInput, Switch } from 'react-native';
import { SafeAreaView, StackNavigator } from 'react-navigation';
import { ImagePicker } from 'expo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DisplayLatLng from '../components/DisplayLatLng';
import ImageSelector from '../components/ImageSelector';
import ContactInfo from '../components/ContactInfo';
import Fire from '../fire';
import ListSelector from '../components/ListSelector';
import moment from 'moment';

const LocationRoute = {
  LocationScreen: {
    screen: DisplayLatLng,
  },
};

const AnimalTypeRoutes = {
  Dog: {
    name: 'Dog',
  },
  Cat: {
    name: 'Cat',
  },
  Skunk: {
    name: 'Skunk',
  },
  Armadillo: {
    name: 'Armadillo',
  },
  Raccoon: {
    name: 'Raccoon',
  },
  Squirrel: {
    name: 'Squirrel',
  },
  Possum: {
    name: 'Possum',
  },
  Snake: {
    name: 'Snake',
  },
  Bird: {
    name: 'Bird',
  },
  Deer: {
    name: 'Deer',
  },
};

const AnimalAreaRoutes = {
  MiddleOfRoad: {
    name: 'Middle of Road',
  },
  Median: {
    name: 'Median',
  },
  SideOfRoad: {
    name: 'Side of Road',
  },
  BikeLane: {
    name: 'Bike Lane',
  },
  Sidewalk: {
    name: 'Sidewalk',
  },
  BusinessParkingLot: {
    name: 'Business Parking Lot',
  },
  Alley: {
    name: 'Alley',
  },
};

const AnimalWithinRoutes = {
  Box: {
    name: 'Box',
  },
  Bag: {
    name: 'Bag',
  },
  ClothPaper: {
    name: 'Cloth/Paper',
  },
  Other: {
    name: 'Other',
  },
  Nothing: {
    name: 'Nothing',
  },
};

const AnimalRoutes = {
  AnimalTypesScreen: {
    screen: ListSelector,
    display: 'Type?',
    type: 'type',
    isSet: false,
    value: null,
    routes: AnimalTypeRoutes,
  },
  AnimalAreasScreen: {
    screen: ListSelector,
    display: 'Where?',
    type: 'area',
    isSet: false,
    value: null,
    routes: AnimalAreaRoutes,
  },
  AnimalWithinScreen: {
    screen: ListSelector,
    display: 'Within?',
    type: 'within',
    isSet: false,
    value: null,
    routes: AnimalWithinRoutes,
  }
};

class DeadAnimalScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceId: null,
      dateCreated: null,
      userId: null,
      userIsAnon: null,
      additionalDetails: null,
      address: null,
      imageOne: null,
      imageTwo: null,
      imageThree: null,
      location: null,
      publicSwitch: true,
      contactSwitch: false,
      firstName:null,
      lastName: null,
      email: null,
      phone: null,
      animalType: null,
      animalArea: null,
      animalWithin: null,
      reportNumber: null,
      coords: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Dead Animal",
      headerStyle: {
        backgroundColor: '#4f4380'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: (
        <TouchableOpacity style={{marginLeft: 15}} onPress={() => params.handleCancel()}>
          <Text style={{color: '#f3f3f3', font: 16, fontWeight: 'bold'}}>
            Cancel
          </Text>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity style={{marginRight: 15}} onPress={() => params.handleSave()} >
          <Text style={{color: '#f3f3f3', font: 16, fontWeight: 'bold'}}>
            Submit
          </Text>
        </TouchableOpacity>
      )
    }
  };

  componentDidMount() {
    Fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      this.setState({
        deviceId: Expo.Constants.deviceId,
        userIsAnon: user.isAnonymous,
        userId: user.uid,
        dateCreated: moment().format(),
      });
    });
    this.props.navigation.setParams({
      handleSave: this._saveDetails,
      handleCancel: this._clearDetails,
    });
    this.getLatestIssueId();
  }

  // might be a bug here
  // if there is no query back for some reason, the report number will default to 0
  getLatestIssueId() {
    return Fire.database().ref().child('reports').limitToLast(1).on('value', (snapshot) => {
      snapshot.forEach((child) => {
        this.setState({reportNumber: child.val().reportNumber});
      });
      if (!snapshot) {
        this.setState({reportNumber: 0});
      }
    });
  }

  writeNewReport() {
    reportNum = this.state.reportNumber + 1;

    // A report entry.
    let reportData = {
      title: 'Dead Animal',
      deviceId: this.state.deviceId,
      coords: this.state.coords,
      dateCreated: this.state.dateCreated,
      uid: Fire.auth().currentUser.uid,
      userIsAnon: this.state.userIsAnon,
      reportNumber: reportNum,
      additionalDetails: this.state.additionalDetails,
      address: this.state.address,
      imageOne: this.state.imageOne,
      imageTwo: this.state.imageTwo,
      imageThree: this.state.imageThree,
      location: this.state.location,
      submitPublicly: this.state.publicSwitch,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      animalType: this.state.animalType,
      animalArea: this.state.animalArea,
      animalWithin: this.state.animalWithin,
      status: 'submitted'
    };

    // Get a key for a new Post.
    let newReportKey = Fire.database().ref().child('reports').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    updates['/reports/' + newReportKey] = reportData;
    updates['/user-reports/' + this.state.userId + '/' + newReportKey] = reportData;

    return Fire.database().ref().update(updates);
  }

  _clearDetails = () => {
    Object.keys(AnimalRoutes).map((routeName: string) => (
      AnimalRoutes[routeName].isSet = false
    ));
    Object.keys(AnimalRoutes).map((routeName: string) => (
      AnimalRoutes[routeName].value = null
    ));
    this.setState({
      deviceId: null,
      dateCreated: null,
      userId: null,
      userIsAnon: null,
      additionalDetails: null,
      address: null,
      imageOne: null,
      imageTwo: null,
      imageThree: null,
      location: null,
      publicSwitch: true,
      contactSwitch: false,
      firstName:null,
      lastName: null,
      email: null,
      phone: null,
      animalType: null,
      animalArea: null,
      animalWithin: null,
      reportNumber: null,
      coords: null,
    });
    this.props.navigation.goBack(null);
  };

  _saveDetails = () => {
    if (this.state.location) {
      this.writeNewReport();
      this.props.navigation.goBack(null);
      this._clearDetails();
    }
  };

  _getLocation = (address, coords) => {
    if (address) {
      let addressString = address[0].name.toString() + ", " + address[0].city.toString();
      this.setState({
        location: address,
        address: addressString,
        coords: coords
      });
      this.props.navigation.goBack(null);
    }
  };

  _getContactInfo = (value, type) => {
    if (type === "firstName") {
      this.setState({ firstName: value });
    } else if (type === "lastName") {
      this.setState({ lastName: value });
    } else if (type === "email") {
      this.setState({ email: value });
    } else {
      this.setState({ phone: value });
    }
  };

  _getAnimalValue = (value, type) => {
    if (type === 'type') {
      Object.keys(AnimalRoutes).map((routeName: string, index) => (
        AnimalRoutes['AnimalTypesScreen'].isSet = true
      ));
      Object.keys(AnimalRoutes).map((routeName: string) => (
        AnimalRoutes['AnimalTypesScreen'].value = value
      ));
      this.setState({animalType: value});
    } else if (type === 'area') {
      Object.keys(AnimalRoutes).map((routeName: string) => (
        AnimalRoutes['AnimalAreasScreen'].isSet = true
      ));
      Object.keys(AnimalRoutes).map((routeName: string) => (
        AnimalRoutes['AnimalAreasScreen'].value = value
      ));
      this.setState({animalArea: value});
    } else if (type === 'within') {
      Object.keys(AnimalRoutes).map((routeName: string) => (
        AnimalRoutes['AnimalWithinScreen'].isSet = true
      ));
      Object.keys(AnimalRoutes).map((routeName: string) => (
        AnimalRoutes['AnimalWithinScreen'].value = value
      ));
      this.setState({animalWithin: value});
    }
    this.props.navigation.goBack(null);
  };

  _onPublicSwitchChange = () => {
    this.setState({ publicSwitch: !this.state.publicSwitch });
  };

  _onContactSwitchChange = () => {
    this.setState({ contactSwitch: !this.state.contactSwitch });
  };

  _deleteImage = (index) => {
    if (index === 1) {
      this.setState({ imageOne: null });
    } else if (index === 2) {
      this.setState({ imageTwo: null });
    } else {
      this.setState({ imageThree: null });
    }
  };

  _getImage = (image, index) => {
    if (index === 1) {
      this.setState({ imageOne: image });
    } else if (index === 2) {
      this.setState({ imageTwo: image });
    } else {
      this.setState({ imageThree: image });
    }
  };

  render() {
    const styles = StyleSheet.create({
      item: {
        paddingHorizontal: 20,
        paddingVertical: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      submitItem: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      submitPublicItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      itemContainer: {
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
      },
      title: {
        fontSize: 20,
        flex: 1,
        color: '#444',
        alignSelf: 'flex-start'
      },
      infoTextField: {
        height: 40,
        backgroundColor: 'white',
        fontSize: 16,
        paddingLeft: 20,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
      }
    });

    let isAddress = false;
    if (!this.state.address) {
      isAddress = true;
    }

    return(
      <KeyboardAwareScrollView>
        <ImageSelector saveImage={this._getImage} removeImage={this._deleteImage}/>
        {Object.keys(LocationRoute).map((routeName: string) => (
          <TouchableOpacity
            key={routeName}
            onPress={() => {
              const { path, params, screen } = LocationRoute[routeName];
              const { router } = screen;
              const action = path && router.getActionForPathAndParams(path, params);
              this.props.navigation.navigate(routeName, {saveLocation: this._getLocation}, action);
            }}
          >
            <SafeAreaView
              style={styles.itemContainer}
              forceInset={{ vertical: 'never' }}
            >
              <View style={styles.item}>
                <Text style={styles.title}>
                  {!isAddress ? this.state.address : 'Tap to get address'}
                </Text>
                <Ionicon name="ios-arrow-forward" style={{paddingHorizontal: 3}} color="#BDBDBD" size={22}/>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        ))}
        <View style={{marginTop: 10}}>
        {Object.keys(AnimalRoutes).map((routeName: string) => (
          <TouchableOpacity
            key={routeName}
            onPress={() => {
              const { path, params, screen } = AnimalRoutes[routeName];
              const { router } = screen;
              const action = path && router.getActionForPathAndParams(path, params);
              this.props.navigation.navigate(
                routeName,
                {
                  saveValues: this._getAnimalValue,
                  title: AnimalRoutes[routeName].display,
                  routes: AnimalRoutes[routeName].routes,
                  type: AnimalRoutes[routeName].type
                },
                action,
              );
            }}
          >
            <SafeAreaView
              style={[styles.itemContainer]}
              forceInset={{ vertical: 'never' }}
            >
              <View style={styles.submitItem}>
                <Text style={styles.title}>
                  {AnimalRoutes[routeName].isSet ? AnimalRoutes[routeName].value : AnimalRoutes[routeName].display}
                </Text>
                <Ionicon name="ios-arrow-forward" style={{paddingHorizontal: 3}} color="#BDBDBD" size={22}/>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        ))}
        </View>
        <TextInput
          style={{height: 40, backgroundColor: 'white', fontSize: 16, marginVertical: 10, paddingHorizontal: 20, paddingTop: 10}}
          onChangeText={(additionalDetails) => this.setState({additionalDetails})}
          placeholder="Additional Details (optional)"
          value={this.state.additionalDetails}
          multiline={true}
          //returnKeyType={ "next" }
        />
        <SafeAreaView
          style={styles.itemContainer}
          forceInset={{ vertical: 'never' }}
        >
          <View style={styles.submitPublicItem}>
            <Text style={styles.title}>
              Submit publicly?
            </Text>
            <Switch
              onValueChange={this._onPublicSwitchChange}
              value={this.state.publicSwitch}
            />
          </View>
        </SafeAreaView>
        <SafeAreaView
          style={[styles.itemContainer,{marginTop: 10}]}
          forceInset={{ vertical: 'never' }}
        >
          <View style={styles.submitPublicItem}>
            <Text style={styles.title}>
              Include Contact Info?
            </Text>
            <Switch
              onValueChange={this._onContactSwitchChange}
              value={this.state.contactSwitch}
            />
          </View>
        </SafeAreaView>
        <SafeAreaView style={{display: !this.state.contactSwitch ? 'none' : ''}}>
          <ContactInfo saveContactInfo={this._getContactInfo}/>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

const DeadAnimalStack = StackNavigator(
  {
    ...LocationRoute,
    ...AnimalRoutes,
    Index: {
      screen: DeadAnimalScreen,
    },
  },
  {
    initialRouteName: 'Index',
  }
);

export default DeadAnimalStack;