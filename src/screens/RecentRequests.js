import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Image, NetInfo } from 'react-native';
import { SafeAreaView, StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { MapView } from 'expo';
import Fire from '../fire';
import ReportTemplate from '../components/Report';
import moment from 'moment';
import SnackBar from 'react-native-snackbar-component';

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
      status: true,
    }
  }

  componentDidMount() {
    // let connectedRef = Fire.database().ref(".info/connected");
    // connectedRef.on("value", function(snap) {
    //   if (snap.val() === true) {
    //     alert("connected.");
    //   } else {
    //     alert("not connected");
    //   }
    // });
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    this.checkInetConnection();
    this.getLatest100Reports();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  checkInetConnection = () => {
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); }
    );
  };

  handleConnectionChange = (isConnected) => {
    this.setState({ status: isConnected });
    //alert(`is connected: ${this.state.status}`);
  };


  getLatest100Reports() {
    return Fire.database().ref().child('reports').limitToLast(100).on('value', (snapshot) => {
      let temp = [];
      snapshot.forEach((child) => {
        temp.unshift(child.val());
      });
      this.setState({ reports: temp });
    });
  }

  render() {
    const styles = StyleSheet.create({
      item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
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
        <View>
        {Array.from(this.state.reports).map((report, index, arr) => (
          report.submitPublicly ?
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
                  <Text>{report.address.length > 25 ? report.address.substr(0, 25) + "..." : report.address}</Text>
                  <Text>{report.status + ' ' + moment(report.dateCreated, moment.ISO_8601).fromNow()}</Text>
                </View>
                {
                  report.imageOne ?
                    <Image style={{ height: 85, width: 85 }} source={{uri: `data:image/jpg;base64,${report.imageOne}`}} />
                    : <Image style={{ height: 85, width: 85 }} source={{uri: `data:image/jpg;base64,${report.mapSnapshot}`}} />
                }
              </View>
            </SafeAreaView>
          </TouchableOpacity> : null
        ))}
        <SnackBar
          visible={!this.state.status}
          textMessage="No internet connection, please connect to the internet"
          actionHandler={()=>{this.setState({status: !this.state.status})}}
          actionText="Close"
          position="top"
        />
        </View>
      </ScrollView>
    );
  }
}

class ReportMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      status: true,
    }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    this.checkInetConnection();
    this.getLatest100Reports();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  checkInetConnection = () => {
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); }
    );
  };

  handleConnectionChange = (isConnected) => {
    this.setState({ status: isConnected });
    //alert(`is connected: ${this.state.status}`);
  };

  getLatest100Reports() {
    return Fire.database().ref().child('reports').limitToLast(100).on('value', (snapshot) => {
      let reports= [];
      snapshot.forEach((child) => {
        reports.unshift(child.val());
      });
      this.setState({ reports: reports });
    });
  }


  render() {
    const styles = StyleSheet.create({
      container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.map = ref; }}
          style={styles.map}
          initialRegion={{
            latitude: 33.214840,
            longitude: -97.133064,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {Array.from(this.state.reports).map((report, index, arr) => (
            report.submitPublicly ? <MapView.Marker
              coordinate={report.coords}
              title={report.title}
              description={report.address}
              onCalloutPress={() => {
                const { path, params, screen } = ReportRoute['ReportScreen'];
                const { router } = screen;
                const action = path && router.getActionForPathAndParams(path, params);
                this.props.navigation.navigate('ReportScreen', {report: report}, action);
              }}
            >
              <MapView.Callout>
                <View style={{   flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text>{report.title + '\n'}{report.address}</Text>
                  <TouchableOpacity style={{marginHorizontal: 7, marginTop: 5}}>
                    <Icon name="ios-information-circle-outline" color="#4F8EF7" size={26}/>
                  </TouchableOpacity>
                </View>
              </MapView.Callout>
            </MapView.Marker> : null
          ))}
        </MapView>
        <SnackBar
          visible={!this.state.status}
          textMessage="No internet connection, please connect to the internet"
          actionHandler={()=>{this.setState({status: !this.state.status})}}
          actionText="Close"
          //position="top"
        />
      </View>
    );
  }
}

const RecentRequestsTabs = TabNavigator({
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
},{
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  backBehavior: 'none',
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
  ...ReportRoute,
});

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4f4380'
  },
  headerTitle: {
    color: 'white'
  },
});

export default RecentRequestsStack;