import React from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, Alert,
  KeyboardAvoidingView, ScrollView, TouchableOpacity, Button,
  Image, TextInput, Switch } from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator, NavigationActions } from 'react-navigation';
import { ImagePicker, Permissions, MapView, Location } from 'expo';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


export default class Report extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      report: {}
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Report Details",
      headerStyle: {
        backgroundColor: '#4510A2'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: (
        <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.goBack(null)}>
          <Icon name="ios-arrow-back" style={{paddingHorizontal: 15}} color="#f3f3f3" size={26}/>
        </TouchableOpacity>
      ),
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ address: null });
    this.setState({ report: this.props.navigation.state.params.report});
  }


  render() {
    const styles = StyleSheet.create({

    });


    return (
      <View style={{ paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'}}>
        <Text >
          {this.state.report.title}
        </Text>
        <Text >
          {'#' + this.state.report.reportNumber}
        </Text>
      </View>
    );
  }
}