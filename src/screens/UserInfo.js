import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, TextInput} from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import ContactInfo from '../components/ContactInfo';
import Fire from '../fire';

class MyInfoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "My Info",
      headerStyle: {
        backgroundColor: '#4f4380'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Icon name="ios-arrow-back" style={{paddingHorizontal: 15}} color="#f3f3f3" size={26}/>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity style={{marginRight: 15}} onPress={() => params.handleSave()} >
          <Text style={{color: '#f3f3f3', font: 16, fontWeight: 'bold'}}>
            Done
          </Text>
        </TouchableOpacity>
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this._saveDetails});
  }

  _saveDetails = () => {
    let user = Fire.auth().currentUser;
    user.updateProfile({
      displayName: this.state.firstName + ' ' + this.state.lastName,
      phoneNumber: this.state.phone
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
    user.updateEmail(this.state.email).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
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

  render() {
    return(
      <SafeAreaView style={{marginTop: 50 }}>
        <ContactInfo saveContactInfo={this._getContactInfo}/>
      </SafeAreaView>
    );
  }
}

const SettingsStack = StackNavigator({
  Requests: {
    screen: MyInfoScreen,
  },
});

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4510A2'
  },
  headerTitle: {
    color: 'white'
  },
});

export default SettingsStack;