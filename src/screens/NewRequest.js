import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Button} from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const issues = {

};

const RequestScreen = ({ navigation }) => (
  <SafeAreaView>
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </SafeAreaView>
);


const MainStack = StackNavigator({
  Requests: {
    screen: RequestScreen,
    navigationOptions: ({navigation}) => ({
      title: 'New Request',
      headerLeft: (
        <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.goBack(null)}>
          <Icon name="ios-arrow-back" style={{paddingHorizontal: 15}} color="#f3f3f3" size={26}/>
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

export default MainStack;