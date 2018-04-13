import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Switch, NetInfo, Alert, StatusBar } from 'react-native';
import { SafeAreaView, StackNavigator, NavigationActions  } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainScreen from './MainScreen';

const styles = {
  header: {
    backgroundColor: '#4f4380'
  },
  headerTitle: {
    color: 'white'
  },
};

export default class ConfirmReport extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Confirmed`,
    headerLeft: (
    <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation
      .dispatch(NavigationActions.reset(
        {
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'MainScreen'})
          ]
        }))}>
    <Text style={{paddingHorizontal: 15, fontWeight: 'bold', color: '#f3f3f3'}}>Close</Text>
    </TouchableOpacity>
    ),
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerMode: 'screen',
    headerVisible: true,
    gesturesEnabled: false,
  });

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar barStyle="light-content" hidden={true} />
        <Ionicons name="ios-checkmark-circle" size={150} color='#006a31' />
        <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 20}}>
          You have successfully submitted report #{this.props.navigation.state.params.reportId}!
        </Text>
        <TouchableOpacity style={{marginTop: 25}} onPress={() =>
          this.props.navigation.dispatch(NavigationActions.reset(
          {
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'MainScreen'})
            ]
          }))}>
          <Text style={{color: "#4F8EF7"}}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }
}