import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native';
import { Constants } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Carousel from './Carousel';

const { width } = Dimensions.get('window');
const height = width * 0.3;

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    height,
  },
  image: {
    width,
    height,
  },
});

export default class Report extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      report: {},
      images: [],
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
    this.loadImages(this.props.navigation.state.params.report);
  }


  loadImages = (report) => {
    if (report.imageOne) {
      this.state.images.push({
        source: {
          uri: `data:image/jpg;base64,${report.imageOne}`
        },
      })
    }
    if (report.imageTwo) {
      this.state.images.push({
        source: {
          uri: `data:image/jpg;base64,${report.imageTwo}`
        },
      })
    }
    if (report.imageThree) {
      this.state.images.push({
        source: {
          uri: `data:image/jpg;base64,${report.imageThree}`
        },
      })
    }
    if (report.mapSnapshot) {
      this.state.images.push({
        source: {
          uri: `data:image/jpg;base64,${report.mapSnapshot}`
        },
      })
    }
  };

  render() {
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
        <View style={styles.container}>
          <Carousel images={this.state.images} />
        </View>
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