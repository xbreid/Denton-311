import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, Image} from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const testScreen = ({ navigation }) => (
  <SafeAreaView>
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </SafeAreaView>
);

const StreetsSidewalks = {
  Pothole: {
      name: 'Pothole',
      image: require('../../assets/images/pothole.png'),
      screen: testScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Pothole',
        headerLeft: (headerBack(navigation)),
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle
      }),
  },
  StreetSign: {
    name: 'Street Sign',
    image: require('../../assets/images/one-way-street-signal.png'),
    screen: testScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Street Sign',
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  TrafficLight: {
    name: 'Traffic Light',
    image: require('../../assets/images/traffic-light.png'),
    screen: testScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Traffic Light',
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),

  },
  StreetLight: {
    name: 'Street Light',
    image: require('../../assets/images/lamp-post.png'),
    screen: testScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Street Light',
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  BrokenSidewalk: {
    name: 'Broken Sidewalk',
    image: require('../../assets/images/crossing.png'),
    screen: testScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Broken Sidewalk',
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  FireHydrant: {
    name: 'Fire Hydrant',
    image: require('../../assets/images/fire-hydrant.png'),
    screen: testScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Fire Hydrant',
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
};

const ParkingVehicles = {
  AbandonedVehicle: {
    name: 'Abandoned Vehicle',
    image: require('../../assets/images/abandoned.png'),
    screen: testScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Abandoned Vehicle',
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  BlockedDriveway: {
    name: 'Blocked Driveway',
    image: require('../../assets/images/blocked.png'),
    screen: testScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Blocked Driveway',
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
};


const IssueButton = (navigation, issueCat, issueRoute, i, arr) => (
  <TouchableOpacity
    key={issueCat}
    onPress={() => {
      const { path, params, screen } = issueRoute;
      const { router } = screen;
      const action = path && router.getActionForPathAndParams(path, params);
      navigation.navigate(issueCat, {}, action);
    }}
  >
    <SafeAreaView
      style={arr.length - 1 === i ? '' : styles.itemBorder}
      forceInset={{ vertical: 'never' }}
    >
      <Image style={{height: 50, width: 50, margin: 10,  position: 'absolute' }} source={issueRoute.image}/>
      <View style={styles.item}>
        <Text style={styles.title}>
          {issueRoute.name}
        </Text>
        <Icon name="ios-arrow-forward" style={{paddingHorizontal: 3}} color="#BDBDBD" size={22}/>
      </View>
    </SafeAreaView>
  </TouchableOpacity>
);

const RequestScreen = ({ navigation }) => (
  <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior="automatic">
      <View key="StreetsSidewalks">
        <Text style={styles.categoryTitle}>
          STREETS & SIDEWALKS
        </Text>
        {Object.keys(StreetsSidewalks).map((issueCategory: string, i, arr) => (
          IssueButton(navigation, issueCategory, StreetsSidewalks[issueCategory], i, arr)
        ))}
        <Text style={styles.categoryTitle}>
          PARKING & VEHICLES
        </Text>
        {Object.keys(ParkingVehicles).map((issueCategory: string, i, arr) => (
          IssueButton(navigation, issueCategory, ParkingVehicles[issueCategory], i, arr)
        ))}
      </View>
  </ScrollView>
);

const headerBack = (navigation) => (
  <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.goBack(null)}>
    <Icon name="ios-arrow-back" style={{paddingHorizontal: 15}} color="#f3f3f3" size={26}/>
  </TouchableOpacity>
);


const MainStack = StackNavigator(
  {
    ...StreetsSidewalks,
    ...ParkingVehicles,
    Index: {
      screen: RequestScreen,
      navigationOptions: ({navigation}) => ({
        title: 'New Request',
        headerLeft: (headerBack(navigation)),
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle
      }),
    },
  },
  {
    initialRouteName: 'Index',
  }
);


const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    paddingLeft: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#BDBDBD',
    borderBottomLeftRadius: 80
  },
  title: {
    fontSize: 20,
    flex: 1,
    color: '#444',
    alignSelf: 'flex-start'
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
  categoryTitle: {
    marginTop: 10,
    padding: 10,
    fontSize: 18,
    color: '#eeac01',
    fontWeight: 'bold'
  }
});

export default MainStack;