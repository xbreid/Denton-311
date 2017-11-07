import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator } from 'react-navigation';

ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);

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
    //mode: Platform.OS === 'ios' ? 'modal' : 'card',
  },
);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
