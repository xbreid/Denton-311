import React from 'react';
import { Platform, StyleSheet, Text, View,
  ScrollView, TouchableOpacity, Button, StatusBar,
  TouchableHighlight, Image, Alert, NetInfo } from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import NewRequest from './NewRequest';
import RecentRequests from './RecentRequests';
import UserRequests from './UserRequests';
import UserInfo from './UserInfo';

const Routes = {
  NewRequest: {
    name: 'Request',
    description: 'Report an issue to the City',
    icon: 'md-create',
    screen: NewRequest,
  },
  RecentRequests: {
    name: 'Recent',
    description: 'Check recent requests and their status',
    icon: 'md-time',
    screen: RecentRequests,
  },
  UserRequests: {
    name: 'My Requests',
    description: 'Check your requests and their status',
    icon: 'md-paper-plane',
    screen: UserRequests,
  },
  UserInfo: {
    name: 'My Info',
    description: 'Application Settings/User Info',
    icon: 'md-person',
    screen: UserInfo,
  },
};

const MainScreen = ({ navigation }) => (
  <ScrollView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
    {Alert.alert(
      'NOTICE\n',
      'This app is currently in development and is testing look and feel of the interface. ' +
      '\n\n NO reports are currently being submitted to the City of Denton. ' +
      '\n\n If you should find any bugs or issues please send us an email with what you find.' +
      '\n\n 311denton@gmail.com',
      [
        {text: 'Accept'},
      ],
      { cancelable: false }
    )}
    <StatusBar
      barStyle="light-content"
    />
    <View>
    {Object.keys(Routes).map((routeName: string) => (
      <TouchableOpacity
        key={routeName}
        onPress={() => {
          const { path, params, screen } = Routes[routeName];
          const { router } = screen;
          const action = path && router.getActionForPathAndParams(path, params);
          navigation.navigate(routeName, {}, action);
        }}
      >
        <SafeAreaView
          style={styles.itemContainer}
          forceInset={{ vertical: 'never' }}
        >
          <View style={{ paddingVertical: 13  }}>
            <Icon name={Routes[routeName].icon} color="#333" size={50}/>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}> {Routes[routeName].name}</Text>
            <Text style={styles.description}>
              {Routes[routeName].description}
            </Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    ))}
    </View>
  </ScrollView>
);

const Main = StackNavigator({
    Main: {
      screen: MainScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Denton 311',
        headerRight: (
          <TouchableOpacity style={{paddingHorizontal: 15}} onPress={() => navigation.navigate('NewRequest')}>
            <Icon name="md-add" color="#f3f3f3" size={24}/>
          </TouchableOpacity>
        ),
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle
      }),
    },
  },
  {
    initialRouteName: 'Main',
  }
  );

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    paddingHorizontal: 40,
    paddingVertical: 35
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 31,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center'
  },
  description: {
    fontSize: 13,
    color: '#999',
    marginLeft: 4
  },
  header: {
    backgroundColor: '#4f4380'
  },
  headerTitle: {
    color: 'white'
  },
  headerRight: {
    textDecorationColor: '#fff'
  }
});


export default Main;