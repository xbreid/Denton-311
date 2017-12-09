import React from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, Alert,
  KeyboardAvoidingView, ScrollView, TouchableOpacity, Button,
  Image, TextInput, Switch } from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator, NavigationActions } from 'react-navigation';
import { ImagePicker, Permissions, MapView, Location } from 'expo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import DisplayLatLng from '../components/DisplayLatLng';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LocationRoute = {
  LocationScreen: {
    screen: DisplayLatLng,
  },
};

const ExampleTypeRoutes = {
  Type1: {
    name: 'Problem Type 1',
  },
  Type2: {
    name: 'Problem Type 2',
  },
  Type3: {
    name: 'Problem Type 3',
  },
  Type4: {
    name: 'Problem Type 4',
  },
  Type5: {
    name: 'Problem Type 5',
  },
  Type6: {
    name: 'Problem Type 6',
  },
  Type7: {
    name: 'Problem Type 7',
  },
  Type8: {
    name: 'Problem Type 8',
  },
  Type9: {
    name: 'Problem Type 9',
  },
  Type10: {
    name: 'Problem Type 10',
  },
};

class TypeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      problemType: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Problem Type",
      headerStyle: {
        backgroundColor: '#4510A2'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: (
        <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.goBack(null)}>
          <Ionicon name="ios-arrow-back" style={{paddingHorizontal: 15}} color="#f3f3f3" size={26}/>
        </TouchableOpacity>
      ),
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ problemType: null });
  }

  render() {
    const styles = StyleSheet.create({
      item: {
        paddingHorizontal: 15,
        paddingVertical: 20,
      },
      itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#BDBDBD',
        borderBottomLeftRadius: 17
      },
      title: {
        fontSize: 18,
        color: '#444',
      },
    });

    return(
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentInsetAdjustmentBehavior="automatic">
        {Object.keys(ExampleTypeRoutes).map((routeName: string, index, arr) => (
          <TouchableOpacity
            key={routeName}
            onPress={() => {
              this.props.navigation.state.params.saveType(ExampleTypeRoutes[routeName].name);
            }}
          >
            <SafeAreaView
              style={arr.length - 1 === index ? '' : styles.itemBorder}
              forceInset={{ vertical: 'never' }}
            >
              <View style={styles.item}>
                <Text style={styles.title}>{ExampleTypeRoutes[routeName].name}</Text>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

}

const TypeRoute = {
  TypesScreen: {
    screen: TypeScreen,
  },
};

class TestScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      address: '',
      image: null,
      location: null,
      publicSwitch: true,
      contactSwitch: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      issueType: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Test Screen",
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

  _getType = (type) => {
    console.log(type);
    this.setState({issueType: type});
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
       this.setState({ image: result.uri });
      }
  };

  _pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;

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

    let isIssueType = false;
    if (!this.state.issueType) {
      isIssueType = true;
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
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {image &&
          <Image source={{ uri: image }} style={{ width: 100, height: 100, marginBottom: 10 }} />}
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
        {Object.keys(TypeRoute).map((routeName: string) => (
          <TouchableOpacity
            key={routeName}
            onPress={() => {
              const { path, params, screen } = TypeRoute[routeName];
              const { router } = screen;
              const action = path && router.getActionForPathAndParams(path, params);
              this.props.navigation.navigate(routeName, {saveType: this._getType}, action);
            }}
          >
            <SafeAreaView
              style={[styles.itemContainer,{marginTop: 10}]}
              forceInset={{ vertical: 'never' }}
            >
              <View style={styles.submitItem}>
                <Text style={styles.title}>
                  {!isIssueType ? this.state.issueType : 'Problem Type'}
                </Text>
                <Ionicon name="ios-arrow-forward" style={{paddingHorizontal: 3}} color="#BDBDBD" size={22}/>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        ))}
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

const MainStack = StackNavigator(
  {
    ...LocationRoute,
    ...TypeRoute,
    Index: {
      screen: TestScreen,
    },
  },
  {
    initialRouteName: 'Index',
  }
);

export default MainStack;