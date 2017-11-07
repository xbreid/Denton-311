import React from 'react';
import { Platform, StyleSheet, Text, View,
  ScrollView, TouchableOpacity, Button, StatusBar,
  TouchableHighlight, Image } from 'react-native';
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
    description: 'Create new non-emergency request',
    icon: 'md-create',
    screen: NewRequest,
  },
  RecentRequests: {
    name: 'Recent',
    description: 'Recent requests in the city',
    icon: 'md-time',
    screen: RecentRequests,
  },
  UserRequests: {
    name: 'My Requests',
    description: 'Users recent requests',
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
  <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
    <StatusBar
      barStyle="light-content"
    />
    <View style={{ marginTop: 20 }}>
    {Object.keys(Routes).map((routeName: string) => (
      <TouchableOpacity
        key={routeName}
        style={{marginHorizontal: 40, marginVertical: 10 }}
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
          <View style={styles.item}>
            <Icon name={Routes[routeName].icon} color="#333" size={38}/>
            <Text style={styles.title}> {Routes[routeName].name}</Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    ))}
    </View>
    <Image
      source={require('../../assets/images/dentonskyline.gif')}
      style={{flex:1, width: null, height: null}}
      resizeMode="contain"
    />
  </View>
);

const Main = StackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Denton 311',
      headerLeft: (
        <TouchableOpacity style={{paddingHorizontal: 15}} onPress={() => navigation.goBack(null)}>
          <Icon name="md-refresh" color="#f3f3f3" size={24}/>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity style={{paddingHorizontal: 15}} onPress={() => navigation.navigate('NewRequest')}>
          <Icon name="md-add" color="#f3f3f3" size={24}/>
        </TouchableOpacity>
      ),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
});

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center'
  },
  description: {
    fontSize: 13,
    color: '#999',
  },
  header: {
    backgroundColor: '#4510A2'
  },
  headerTitle: {
    color: 'white'
  },
  headerRight: {
    textDecorationColor: '#fff'
  }
});


export default Main;