import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { SafeAreaView, StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { MapView } from 'expo';
import Fire from '../fire';
import ReportTemplate from '../components/Report';
import moment from 'moment';

const ReportRoute = {
  ReportScreen: {
    screen: ReportTemplate,
  },
};

class ReportList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
    }
  }

  componentDidMount() {
    let user = Fire.auth().currentUser;
    this.getLatestReports(user.uid);
  }

  getLatestReports(uid) {
    return Fire.database().ref().child('user-reports/' + uid).limitToLast(100).on('value', (snapshot) => {
      let reports= [];
      snapshot.forEach((child) => {
        reports.unshift(child.val());
      });
      this.setState({ reports: reports });
    });
  }

  render() {
    const styles = StyleSheet.create({
      item: {
        paddingHorizontal: 20,
        paddingVertical: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        alignSelf: 'flex-start'
      },
      itemContainer: {
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
      },
      title: {
        fontSize: 20,
        color: '#444',
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

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentInsetAdjustmentBehavior="automatic">
        {Array.from(this.state.reports).map((report, index, arr) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              const { path, params, screen } = ReportRoute['ReportScreen'];
              const { router } = screen;
              const action = path && router.getActionForPathAndParams(path, params);
              this.props.navigation.navigate('ReportScreen', {report: report}, action);
            }}
          >
            <SafeAreaView
              style={styles.itemContainer}
              forceInset={{ vertical: 'never' }}
            >
              <View style={styles.item}>
                <View>
                  <Text style={styles.title}>{report.title}</Text>
                  <Text>{report.address}</Text>
                  <Text>{report.status + ' ' + moment(report.dateCreated, moment.ISO_8601).fromNow()}</Text>
                </View>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

class ReportMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: []
    }
  }

  componentDidMount() {
    Fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      this.getLatestReports(user.uid);
    });
  }

  getLatestReports(uid) {
    return Fire.database().ref().child('user-reports/' + uid).limitToLast(100).on('value', (snapshot) => {
      let reports= [];
      snapshot.forEach((child) => {
        reports.unshift(child.val());
      });
      this.setState({ reports: reports });
    });
  }


  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 33.214840,
          longitude: -97.133064,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {Array.from(this.state.reports).map((report, index, arr) => (
          <MapView.Marker
            coordinate={report.coords}
            title={report.title}
            description={report.address}
            onCalloutPress={() => {
              const { path, params, screen } = ReportRoute['ReportScreen'];
              const { router } = screen;
              const action = path && router.getActionForPathAndParams(path, params);
              this.props.navigation.navigate('ReportScreen', {report: report}, action);
            }}
          />
        ))}
      </MapView>
    );
  }
}

const Tabs = TabNavigator({
  ListTab: {
    screen: ReportList,
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
    screen: ReportMap,
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

const Stack = StackNavigator({
  Requests: {
    screen: Tabs,
    navigationOptions: ({navigation}) => ({
      title: 'My Requests',
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
  ...ReportRoute,
});

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4510A2'
  },
  headerTitle: {
    color: 'white'
  },
});

export default Stack;