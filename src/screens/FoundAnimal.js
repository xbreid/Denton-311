import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Switch } from 'react-native';
import { SafeAreaView, StackNavigator } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';
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

const AnimalGenderRoutes = {
  Male: {
    name: 'Male',
  },
  Female: {
    name: 'Female',
  },
  Unknown: {
    name: 'Unknown',
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


const AnimalRoutes = {
  AnimalTypesScreen: {
    screen: ListSelector,
    display: 'Type?',
    type: 'type',
    isSet: false,
    value: null,
    routes: AnimalGenderRoutes,
  },
  AnimalGenderScreen: {
    screen: ListSelector,
    display: 'Gender?',
    type: 'gender',
    isSet: false,
    value: null,
    routes: AnimalTypeRoutes
  },
};
class FoundAnimalScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      additionalDetails: null,
      dateCreated: null,
      deviceId: null,
      address: null,
      imageOne: null,
      imageTwo: null,
      imageThree: null,
      location: null,
      publicSwitch: true,
      contactSwitch: false,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      animalType: null,
      animalGender: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Found Animal",
      headerStyle: {
        backgroundColor: '#4510A2'
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
      issueId: null,
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
      animalGender: null,
    });
    this.props.navigation.goBack(null);
  };

  _saveDetails = () => {
    console.log('submit report triggered for found animal');
    console.log(this.state);
    this.props.navigation.goBack(null);
    this._clearDetails();
  };

  _getLocation = (address) => {
    console.log(address);
    console.log(address[0].name.toString() + ", " + address[0].city.toString());
    let addressString = address[0].name.toString() + ", " + address[0].city.toString();
    this.setState({
      location: address,
      address: addressString,
    });
    this.props.navigation.goBack(null);
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
    } else if (type === 'gender') {
      Object.keys(AnimalRoutes).map((routeName: string) => (
        AnimalRoutes['AnimalGenderScreen'].isSet = true
      ));
      Object.keys(AnimalRoutes).map((routeName: string) => (
        AnimalRoutes['AnimalGenderScreen'].value = value
      ));
      this.setState({animalGender: value});
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
              style={{ }}
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

const FoundAnimalStack = StackNavigator(
  {
    ...LocationRoute,
    ...AnimalRoutes,
    Index: {
      screen: FoundAnimalScreen,
    },
  },
  {
    initialRouteName: 'Index',
  }
);

export default FoundAnimalStack;