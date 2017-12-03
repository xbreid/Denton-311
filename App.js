import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator } from 'react-navigation';
import Fire from './src/fire';
import * as firebase from 'firebase';

ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);

import MainScreen from './src/screens/MainScreen';
import NewRequest from './src/screens/NewRequest';
import RecentRequests from './src/screens/RecentRequests';
import UserRequests from './src/screens/UserRequests';
import UserInfo from './src/screens/UserInfo';


const Routes = {
  MainScreen: {
    name: 'Welcome Screen',
    description: 'Welcome splash screen',
    screen: MainScreen,
  },
  NewRequest: {
    name: 'New Request',
    description: 'Create new non-emergency request',
    screen: NewRequest,
  },
  RecentRequests: {
    name: 'Recent Requests',
    description: 'Recent requests in the city',
    screen: RecentRequests,
  },
  UserRequests: {
    name: 'My Requests',
    description: 'Users recent requests',
    screen: UserRequests,
  },
  UserInfo: {
    name: 'My Info',
    description: 'Application Settings/User Info',
    screen: UserInfo,
  },
};

const AppNavigator = StackNavigator(
  {
    ...Routes,
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none',
  },
);

export default class App extends React.Component {
  componentDidMount() {
    Fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user);
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        // ...
      } else {
        // user is logged out somehow, sign them back in
        Fire.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(function() {
            // Existing and future Auth states are now persisted in the device
            // local storage.
            // ...
            // New sign-in will be persisted with local persistence.
            return Fire.auth().signInAnonymously();
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
          });
      }
      // ...
    });
  }

  render() {
    return <AppNavigator />;
  }
}
