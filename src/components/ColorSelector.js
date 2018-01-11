import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Svg } from 'expo';

const ColorRoutes = {
  Black: {
    name: 'Black',
    color: 'black'
  },
  Blue: {
    name: 'Blue',
    color: 'blue'
  },
  Brown: {
    name: 'Brown',
    color: '#663300'
  },
  Gold: {
    name: 'Gold',
    color: '#FFD700'
  },
  Green: {
    name: 'Green',
    color: 'green'
  },
  Maroon: {
    name: 'Maroon',
    color: '#830300'
  },
  Orange: {
    name: 'Orange',
    color: 'orange'
  },
  Pink: {
    name: 'Pink',
    color: 'pink'
  },
  Purple: {
    name: 'Purple',
    color: 'purple'
  },
  Red: {
    name: 'Red',
    color: 'red'
  },
  Rust: {
    name: 'Rust',
    color: '#A55D35'
  },
  Silver: {
    name: 'Silver',
    color: 'silver'
  },
  Tan: {
    name: 'Tan',
    color: '#FFCC99'
  },
  White: {
    name: 'White',
    color: '#f3f3f3'
  },
  Yellow: {
    name: 'Yellow',
    color: 'yellow'
  },
};

export default class ColorSelectorScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Color?",
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
    this.props.navigation.setParams({ color: null });
  }

  render() {
    const styles = StyleSheet.create({
      item: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingLeft: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      icon: {
        margin: 7,
        position: 'absolute'
      },
      itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#BDBDBD',
        borderBottomLeftRadius: 80
      },
      title: {
        fontSize: 18,
        color: '#444',
      },
    });

    return(
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentInsetAdjustmentBehavior="automatic">
        {Object.keys(ColorRoutes).map((routeName: string, index, arr) => (
          <TouchableOpacity
            key={routeName}
            onPress={() => {
              this.props.navigation.state.params.saveValues(ColorRoutes[routeName].name, 'color');
            }}
          >
            <SafeAreaView
              style={arr.length - 1 === index ? '' : styles.itemBorder}
              forceInset={{ vertical: 'never' }}
            >
              <Svg style={styles.icon} height={50} width={50}>
                <Svg.Circle cx={25} cy={25} r={10} fill={ColorRoutes[routeName].color} />
              </Svg>
              <View style={styles.item}>
                <Text style={styles.title}>{ColorRoutes[routeName].name}</Text>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}