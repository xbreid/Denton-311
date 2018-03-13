import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MailComposer } from 'expo';

export default class Report extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "About",
      headerStyle: {
        backgroundColor: '#4f4380'
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

  _composeMail = async () => {

    let { status } = await MailComposer.composeAsync({
      recipients: ["311denton@gmail.com"],
      subject: "Denton 311 Bugs and Feedback",
    });
    if (status !== 'sent') {
      this.setState({
        errorMessage: 'Mail Composer failed',
      });
    }
  };


  render() {
    const styles = StyleSheet.create({
      item: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        //paddingLeft: 70,
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
    });

    return (
      <ScrollView>
        <View style={{backgroundColor: '#ffffff', marginVertical: 10}}>
          <SafeAreaView
            forceInset={{ vertical: 'never' }}
          >
            <View style={[styles.item, {borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: '#BDBDBD',
              borderBottomLeftRadius: 20}]}>
              <Text style={styles.title}>
                Version
              </Text>
              <Text>
                0.1.0
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>
                Build
              </Text>
              <Text>
                0000
              </Text>
            </View>
          </SafeAreaView>
        </View>
        <TouchableOpacity style={{backgroundColor: '#ffffff', marginVertical: 10}} onPress={() => this._composeMail()}>
          <SafeAreaView
            forceInset={{ vertical: 'never' }}
          >
            <View style={styles.item}>
              <Text style={styles.title}>
                Bugs & Feedback
              </Text>
              <Icon name="ios-arrow-forward" style={{paddingHorizontal: 3}} color="#BDBDBD" size={22}/>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
        <View style={{margin: 15}}>
          <Text>
            Copyright © 2018
          </Text>
          <Text>
            Denton 311 - UNT
          </Text>
          <Text>
            311denton@gmail.com
          </Text>
          <Text>
            All Rights Reserved
          </Text>
          <Text>
            Icons made by Freepik from www.flaticon.com
          </Text>
        </View>
      </ScrollView>
    );
  }
}