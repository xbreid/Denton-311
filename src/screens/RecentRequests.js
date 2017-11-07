import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Button} from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator, NavigationActions, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { MapView } from 'expo';

const cords = {
  latitude: 33.2543416,
  longitude: -97.15247219999998,
};

const ListTab = ({ navigation }) => (
  <SafeAreaView>
    <Text>List View</Text>
  </SafeAreaView>
);

const MapTab = ({ navigation }) => (
  <MapView
    style={{ flex: 1 }}
    initialRegion={{
      latitude: 33.2543416,
      longitude: -97.15247219999998,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    <MapView.Marker
      coordinate={cords}
      title='issue name'
      description='address'
      //onPress={() => navigation.navigate('Profile', { name: 'Jordan' })}
      onPress={() => navigation.navigate('ParkingLot')}
    />
  </MapView>
);

const RecentRequestsTabs = TabNavigator({
  ListTab: {
    screen: ListTab,
    path: '/list',
    navigationOptions: {
      tabBarLabel: 'List',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={focused ? 'ios-list' : 'ios-list-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  MapTab: {
    screen: MapTab,
    path: '/map',
    navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={focused ? 'ios-map' : 'ios-map-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  }
});

const RecentRequestsStack = StackNavigator({
  Requests: {
    screen: RecentRequestsTabs,
    navigationOptions: ({navigation}) => ({
      title: 'Recent Requests',
      headerLeft: (
        <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.goBack(null)}>
          <Icon name="ios-arrow-back" style={{paddingHorizontal: 15}} color="#f3f3f3" size={26}/>
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
  header: {
    backgroundColor: '#4510A2'
  },
  headerTitle: {
    color: 'white'
  },
});

export default RecentRequestsStack;