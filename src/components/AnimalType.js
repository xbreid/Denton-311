import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';


const AnimalTypeRoutes = {
  Dog: {
    name: 'Dog',
  },
  Cat: {
    name: 'Cat',
  },
  Skunk: {
    name: 'Skunk',
  },
  Armadillo: {
    name: 'Armadillo',
  },
  Raccoon: {
    name: 'Raccoon',
  },
  Squirrel: {
    name: 'Squirrel',
  },
  Possum: {
    name: 'Possum',
  },
  Snake: {
    name: 'Snake',
  },
  Bird: {
    name: 'Bird',
  },
  Deer: {
    name: 'Deer',
  },
};

export default class AnimalTypeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animalType: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: "Type?",
      headerStyle: {
        backgroundColor: '#4510A2'
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
    this.props.navigation.setParams({ animalType: null });
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
        {Object.keys(AnimalTypeRoutes).map((routeName: string, index, arr) => (
          <TouchableOpacity
            key={routeName}
            onPress={() => {
              this.props.navigation.state.params.saveAnimalValue(AnimalTypeRoutes[routeName].name, 'type');
            }}
          >
            <SafeAreaView
              style={arr.length - 1 === index ? '' : styles.itemBorder}
              forceInset={{ vertical: 'never' }}
            >
              <View style={styles.item}>
                <Text style={styles.title}>{AnimalTypeRoutes[routeName].name}</Text>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}