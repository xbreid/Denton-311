import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, TextInput} from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

class MyInfoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  }

  render() {

    const styles = StyleSheet.create({
      infoTextField: {
        height: 40,
        backgroundColor: 'white',
        fontSize: 16,
        paddingLeft: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
      }
    });

    return(
      <SafeAreaView>
        <View style={{marginTop: 30}}>
        <TextInput
          style={styles.infoTextField}
          onChangeText={(firstName) => this.setState({firstName})}
          placeholder="First Name"
          value={this.state.text}
          returnKeyType={ "next" }
        />
        <TextInput
          style={styles.infoTextField}
          onChangeText={(lastName) => this.setState({lastName})}
          placeholder="Last Name"
          value={this.state.text}
          returnKeyType={ "next" }
        />
        <TextInput
          style={styles.infoTextField}
          onChangeText={(email) => this.setState({email})}
          placeholder="Email"
          value={this.state.text}
          returnKeyType={ "next" }
        />
        <TextInput
          style={styles.infoTextField}
          onChangeText={(phone) => this.setState({phone})}
          placeholder="Phone"
          value={this.state.text}
        />
        </View>
      </SafeAreaView>
    );
  }

}

const headerBack = (navigation) => (
  <TouchableOpacity onPress={() => navigation.goBack(null)}>
    <Icon name="ios-arrow-back" style={{paddingHorizontal: 15}} color="#f3f3f3" size={26}/>
  </TouchableOpacity>
);

const headerSubmit = (navigation) => (
  <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.goBack(null)}>
    <Text style={{color: '#f3f3f3', fontWeight: 'bold', fontSize: 16}}>
      Done
    </Text>
  </TouchableOpacity>
);

const SettingsStack = StackNavigator({
  Requests: {
    screen: MyInfoScreen,
    navigationOptions: ({navigation}) => ({
      title: 'My Info',
      headerLeft: headerBack(navigation),
      headerRight: headerSubmit(navigation),
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

export default SettingsStack;