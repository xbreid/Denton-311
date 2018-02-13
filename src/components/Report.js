import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';


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

  componentDidMount() {
    this.props.navigation.setParams({ address: null });
    this.setState({ report: this.props.navigation.state.params.report});
  }


  render() {
    const styles = StyleSheet.create({
      titleContainer: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    });


    return (
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text >
            {this.state.report.title}
          </Text>
          <Text >
            {'#' + this.state.report.reportNumber}
          </Text>
        </View>
        <SafeAreaView>
        {
          this.state.report.imageOne ?
              <Image source={{uri: `data:image/jpg;base64,${this.state.report.imageOne}`}} style={{ height: 100, marginBottom: 10 }} />
            : <Text/>
        }
        </SafeAreaView>
        <View style={{alignItems: 'center', marginHorizontal: 20, marginVertical: 15}}>
          <Text >
            {!this.state.report.additionalDetails ? '' : this.state.report.additionalDetails}
            {' ' + this.state.report.address}
          </Text>
        </View>
        {
         this.state.report.problemDetails ?
           <View style={{alignItems: 'center', marginHorizontal: 20, marginVertical: 15}}>
             {Object.keys(this.state.report.problemDetails).map((key) => {
             return (
               <Text>
                 {key + ': ' + this.state.report.problemDetails[key]}
               </Text>
             )
             })}
          </View> : <Text/>
        }
        <View style={{alignItems: 'center', marginHorizontal: 20, marginVertical: 15}}>
          <Text>{this.state.report.status + ' ' + moment(this.state.report.dateCreated, moment.ISO_8601).fromNow()}</Text>
        </View>
      </ScrollView>
    );
  }
}