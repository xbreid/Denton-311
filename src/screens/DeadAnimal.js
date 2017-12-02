import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Switch } from 'react-native';
import { SafeAreaView, StackNavigator } from 'react-navigation';
import { ImagePicker } from 'expo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DisplayLatLng from '../components/DisplayLatLng';
import AnimalTypeScreen from '../components/AnimalType';
import AnimalAreaScreen from '../components/DeadAnimalArea';
import AnimalWithinScreen from '../components/DeadAnimalWithin';

const LocationRoute = {
  LocationScreen: {
    screen: DisplayLatLng,
  },
};

const AnimalRoutes = {
  AnimalTypesScreen: {
    screen: AnimalTypeScreen,
    display: 'Type?',
    isSet: false,
    value: null,
  },
  AnimalAreasScreen: {
    screen: AnimalAreaScreen,
    display: 'Where?',
    isSet: false,
    value: null,
  },
  AnimalWithinScreen: {
    screen: AnimalWithinScreen,
    display: 'Within?',
    isSet: false,
    value: null,
  }
};

class DeadAnimalScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      address: '',
      imageOne: null,
      imageTwo: null,
      imageThree: null,
      imageIndex: 0,
      location: null,
      publicSwitch: true,
      contactSwitch: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      animalType: null,
      animalArea: null,
      animalWithin: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Dead Animal",
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
        <TouchableOpacity style={{marginRight: 15}} onPress={() => params.handleSave()} >
          <Text style={{color: '#f3f3f3', font: 16, fontWeight: 'bold'}}>
            Submit
          </Text>
        </TouchableOpacity>
      )
    }
  };

  componentDidMount() {
    // will need to fetch personal info from local database if user has entered any
    // fetch in componentDidMounts
    this.props.navigation.setParams({ handleSave: this._saveDetails});
  }

  _saveDetails = () => {
    console.log('test');
    this.props.navigation.goBack(null);
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

  _pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      if (!this.state.imageOne) {
        this.setState({ imageOne: result.uri });
      } else if (!this.state.imageTwo) {
        this.setState({ imageTwo: result.uri });
      } else if (!this.state.imageThee && this.state.imageIndex === 0) {
        this.setState({ imageThree: result.uri, imageIndex: 1 });
      } else {
        if (this.state.imageIndex === 1) {
          this.setState({ imageOne: result.uri, imageIndex: this.state.imageIndex + 1 });
        } else if (this.state.imageIndex === 2) {
          this.setState({ imageTwo: result.uri, imageIndex: this.state.imageIndex + 1 });
        } else {
          this.setState({ imageThree: result.uri, imageIndex: 1 });
        }
      }
    }
  };

  _pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      if (!this.state.image) {
        this.setState({ image: result.uri });
      }
    }
  };

  render() {
    let { imageOne, imageTwo, imageThree } = this.state;

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
        <SafeAreaView>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
            <TouchableOpacity style={{paddingHorizontal: 10}} onPress={this._pickImageFromLibrary}>
              <Icon name="upload" size={60} color="#4F8EF7" />
              <Text style={{textAlign: 'center', marginTop: 10}}>
                Upload a
              </Text>
              <Text style={{textAlign: 'center'}}>
                Picture
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingHorizontal: 10}} onPress={this._pickImageFromCamera}>
              <Icon name="camera" size={60} color="#4F8EF7" />
              <Text style={{textAlign: 'center', marginTop: 10}}>
                Take a
              </Text>
              <Text style={{textAlign: 'center'}}>
                Picture
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            {imageOne &&
            <Image source={{ uri: imageOne }} style={{ width: 75, height: 75, marginBottom: 10 }} />}
            {imageTwo &&
            <Image source={{ uri: imageTwo }} style={{ width: 75, height: 75, marginBottom: 10, marginLeft: 10 }} />}
            {imageThree &&
            <Image source={{ uri: imageThree }} style={{ width: 75, height: 75, marginBottom: 10, marginLeft: 10 }} />}
          </View>
        </SafeAreaView>
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
              this.props.navigation.navigate(routeName, {saveAnimalValue: this._getAnimalValue}, action);
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
          onChangeText={(text) => this.setState({text})}
          placeholder="Additional Details (optional)"
          value={this.state.text}
          multiline={true}
          returnKeyType={ "next" }
        />
        <SafeAreaView
          style={styles.itemContainer}
          forceInset={{ vertical: 'never' }}
        >
          <View style={styles.submitPublicItem}>
            <Text style={styles.title}>
              Sumbit publicly?
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
          <View>
            <TextInput
              style={styles.infoTextField}
              onChangeText={(firstName) => this.setState({firstName})}
              placeholder="First Name"
              value={this.state.firstName}
              returnKeyType={ "next" }
            />
            <TextInput
              style={styles.infoTextField}
              onChangeText={(lastName) => this.setState({lastName})}
              placeholder="Last Name"
              value={this.state.lastName}
              returnKeyType={ "next" }
            />
            <TextInput
              style={styles.infoTextField}
              onChangeText={(email) => this.setState({email})}
              placeholder="Email"
              value={this.state.ema}
              returnKeyType={ "next" }
            />
            <TextInput
              style={styles.infoTextField}
              onChangeText={(phone) => this.setState({phone})}
              placeholder="Phone"
              value={this.state.phone}
            />
          </View>
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