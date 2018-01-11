import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';


const TravelDirectionRoutes = {
  East: {
    name: 'Eastbound',
  },
  North: {
    name: 'Northbound',
  },
  South: {
    name: 'Southbound',
  },
  West: {
    name: 'Westbound',
  },
  Unknown: {
    name: 'Unknown',
  },
};

export default class TravelDirectionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Direction of Travel?",
      headerStyle: {
        backgroundColor: '#4f4380'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: (
        <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.goBack(null)}>
          <Ionicon name="ios-arrow-back" style={{paddingHorizontal: 15}} color="#f3f3f3" size={26}/>
        </TouchableOpacity>
      ),
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ direction: null });
  }

  render() {
    const styles = StyleSheet.create({
      item: {
        paddingHorizontal: 15,
        paddingVertical: 20,
      },
      itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#BDBDBD',
        borderBottomLeftRadius: 17
      },
      title: {
        fontSize: 18,
        color: '#444',
      },
    });

    return(
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentInsetAdjustmentBehavior="automatic">
        {Object.keys(TravelDirectionRoutes).map((routeName: string, index, arr) => (
          <TouchableOpacity
            key={routeName}
            onPress={() => {
              this.props.navigation.state.params.saveValues(TravelDirectionRoutes[routeName].name, 'direction');
            }}
          >
            <SafeAreaView
              style={arr.length - 1 === index ? '' : styles.itemBorder}
              forceInset={{ vertical: 'never' }}
            >
              <View style={styles.item}>
                <Text style={styles.title}>{TravelDirectionRoutes[routeName].name}</Text>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}