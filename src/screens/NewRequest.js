import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Button} from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const testScreen = ({ navigation }) => (
  <SafeAreaView>
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </SafeAreaView>
);

const Issues = {
  'Streets & Sidewalks': {
    Pothole: {
      name: 'Pothole',
      screen: testScreen
    },
  },
  'Parking & Vehicles': {
    AbandonedVehicle: {
      name: 'Abandoned Vehicle',
      screen: testScreen
    },
    BlockedDriveway: {
      name: 'Blocked Driveway',
      screen: testScreen
    },
  },
};

const RequestScreen = ({ navigation }) => (
  <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior="automatic">
    {Object.keys(Issues).map((routeName: string) => (
      <View>
        <Text style={{ marginTop: 10, padding: 10, fontSize: 18, color: '#eeac01', fontWeight: 'bold' }}>
          {routeName.toLocaleUpperCase()}
        </Text>
        {Object.keys(Issues[routeName]).map((issueCategory: string, i, arr) => (
        <TouchableOpacity
          key={issueCategory}
          onPress={() => {
            const { path, params, screen } = Issues[routeName][issueCategory];
            const { router } = screen;
            const action = path && router.getActionForPathAndParams(path, params);
            navigation.navigate(issueCategory, {}, action);
          }}
        >
          <SafeAreaView
            style={arr.length - 1 === i ? '' : styles.itemBorder}
            forceInset={{ vertical: 'never' }}
          >
            <View style={styles.item}>
              <Text style={styles.title}>
                {Issues[routeName][issueCategory].name}
              </Text>
              <Icon name="ios-arrow-forward" style={{paddingHorizontal: 3}} color="#BDBDBD" size={22}/>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      ))}
      </View>
    ))}
  </ScrollView>
);

const headerBack = (navigation) => (
  <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.goBack(null)}>
    <Icon name="ios-arrow-back" style={{paddingHorizontal: 15}} color="#f3f3f3" size={26}/>
  </TouchableOpacity>
);

const MainStack = StackNavigator({

  Requests: {
    screen: RequestScreen,
    navigationOptions: ({navigation}) => ({
      title: 'New Request',
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  Pothole: {
    screen: testScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Pothole',
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  AbandonedVehicle: {
    screen: testScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Abandoned Vehicle',
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  BlockedDriveway: {
    screen: testScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Blocked Driveway',
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
});

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemContainer: {
    //backgroundColor: '#fff',
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#BDBDBD',
    borderRadius: 20
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    //fontWeight: 'bold',
    color: '#444',
    //textAlign: 'center'
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
});

export default MainStack;