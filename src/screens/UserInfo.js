import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableHighlight, Button} from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({ navigation }) => (
  <SafeAreaView>
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </SafeAreaView>
);


const SettingsStack = StackNavigator({
  Requests: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => ({
      title: 'My Info',
      headerLeft: (<Button onPress={() => navigation.goBack(null)} title="Cancel"/>),
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