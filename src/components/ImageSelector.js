import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ImagePicker } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ImageSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageOne: null,
      imageTwo: null,
      imageThree: null,
      imageIndex: 0,
    };
  }

  _pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      if (!this.state.imageOne) {
        this.setState({ imageOne: result.uri });
        this.props.saveImage(result.uri, 1);
      } else if (!this.state.imageTwo) {
        this.setState({ imageTwo: result.uri });
        this.props.saveImage(result.uri, 2);
      } else if (!this.state.imageThee && this.state.imageIndex === 0) {
        this.setState({ imageThree: result.uri, imageIndex: 1 });
        this.props.saveImage(result.uri, 3);
      } else {
        if (this.state.imageIndex === 1) {
          this.setState({ imageOne: result.uri, imageIndex: this.state.imageIndex + 1 });
          this.props.saveImage(result.uri, 1);
        } else if (this.state.imageIndex === 2) {
          this.setState({ imageTwo: result.uri, imageIndex: this.state.imageIndex + 1 });
          this.props.saveImage(result.uri, 2);
        } else {
          this.setState({ imageThree: result.uri, imageIndex: 1 });
          this.props.saveImage(result.uri, 3);
        }
      }
    }
  };

  _pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      if (!this.state.imageOne) {
        this.setState({ imageOne: result.uri });
        this.props.saveImage(result.uri, 1);
      } else if (!this.state.imageTwo) {
        this.setState({ imageTwo: result.uri });
        this.props.saveImage(result.uri, 2);
      } else if (!this.state.imageThee && this.state.imageIndex === 0) {
        this.setState({ imageThree: result.uri, imageIndex: 1 });
        this.props.saveImage(result.uri, 3);
      } else {
        if (this.state.imageIndex === 1) {
          this.setState({ imageOne: result.uri, imageIndex: this.state.imageIndex + 1 });
          this.props.saveImage(result.uri, 1);
        } else if (this.state.imageIndex === 2) {
          this.setState({ imageTwo: result.uri, imageIndex: this.state.imageIndex + 1 });
          this.props.saveImage(result.uri, 2);
        } else {
          this.setState({ imageThree: result.uri, imageIndex: 1 });
          this.props.saveImage(result.uri, 3);
        }
      }
    }
  };

  _deleteImage = (index) => {
    if (index === 1) {
      this.setState({ imageOne: null });
      this.props.removeImage(1);
    } else if (index === 2) {
      this.setState({ imageTwo: null });
      this.props.removeImage(2);
    } else {
      this.setState({ imageThree: null, imageIndex: 0 });
      this.props.removeImage(3);
    }
  };

  render() {
    let { imageOne, imageTwo, imageThree } = this.state;

    return(
      <SafeAreaView>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
          <TouchableOpacity style={{paddingHorizontal: 10}} onPress={this._pickImageFromLibrary}>
            <Icon name="upload" size={60} color="#4F8EF7" />
            <Text style={{textAlign: 'center', marginTop: 10}}>
              Upload a
            </Text>
            <Text style={{textAlign: 'center'}}>
              Picture
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingHorizontal: 10}} onPress={this._pickImageFromCamera}>
            <Icon name="camera" size={60} color="#4F8EF7" />
            <Text style={{textAlign: 'center', marginTop: 10}}>
              Take a
            </Text>
            <Text style={{textAlign: 'center'}}>
              Picture
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {imageOne &&
          <View style={{ position: 'relative' }}>
            <Image source={{ uri: imageOne }} style={{ width: 75, height: 75, marginBottom: 10 }} />
            <TouchableOpacity
              onPress={() => this._deleteImage(1)}
              style={{position: 'absolute', top: -20, right: -20, backgroundColor: 'transparent', paddingVertical: 10, paddingHorizontal: 10}}
            >
              <Image
                source={require('../../assets/images/error.png')}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
          }
          {imageTwo &&
          <View style={{ position: 'relative', marginLeft: 15 }}>
            <Image source={{ uri: imageTwo }} style={{ width: 75, height: 75, marginBottom: 10 }} />
            <TouchableOpacity
              onPress={() => this._deleteImage(2)}
              style={{position: 'absolute', top: -20, right: -20, backgroundColor: 'transparent', paddingVertical: 10, paddingHorizontal: 10}}
            >
              <Image
                source={require('../../assets/images/error.png')}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
          }
          {imageThree &&
          <View style={{ position: 'relative', marginLeft: 15 }}>
            <Image source={{ uri: imageThree }} style={{ width: 75, height: 75, marginBottom: 10 }} />
            <TouchableOpacity
              onPress={() => this._deleteImage(3)}
              style={{position: 'absolute', top: -20, right: -20, backgroundColor: 'transparent', paddingVertical: 10, paddingHorizontal: 10}}
            >
              <Image
                source={require('../../assets/images/error.png')}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
          }
        </View>
      </SafeAreaView>
    );
  }
}