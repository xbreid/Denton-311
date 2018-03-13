import React from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
import Fire from '../fire';

export default class ContactInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  }

  componentDidMount() {
    let user = Fire.auth().currentUser;
    console.log(user);
    if (user.email) {
      let name = user.displayName.split(" ");
      this.setState({
        firstName: name[0],
        lastName: name[1],
        email: user.email,
      })
    }
  }

  _setContactInfo = (value, type) => {
    if (type === "firstName") {
      this.setState({ firstName: value });
      this.props.saveContactInfo(value, type);
    } else if (type === "lastName") {
      this.setState({ lastName: value });
      this.props.saveContactInfo(value, type);
    } else if (type === "email") {
      this.setState({ email: value });
      this.props.saveContactInfo(value, type);
    } else {
      this.setState({ phone: value });
      this.props.saveContactInfo(value, type);
    }
  };

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
      <View>
        <TextInput
          style={styles.infoTextField}
          onChangeText={(firstName) => this._setContactInfo(firstName, "firstName")}
          placeholder="First Name"
          value={this.state.firstName}
          returnKeyType={ "next" }
          onSubmitEditing={() => { this.refs.LastName.focus() }}
          underlineColorAndroid="#fff"
        />
        <TextInput
          ref="LastName"
          style={styles.infoTextField}
          onChangeText={(lastName) => this._setContactInfo(lastName, "lastName")}
          placeholder="Last Name"
          value={this.state.lastName}
          returnKeyType={ "next" }
          onSubmitEditing={() => { this.refs.Email.focus() }}
          underlineColorAndroid="#fff"
        />
        <TextInput
          ref="Email"
          style={styles.infoTextField}
          onChangeText={(email) => this._setContactInfo(email, "email")}
          placeholder="Email"
          value={this.state.email}
          returnKeyType={ "next" }
          onSubmitEditing={() => { this.refs.Phone.focus() }}
          underlineColorAndroid="#fff"
        />
        <TextInput
          ref="Phone"
          style={styles.infoTextField}
          onChangeText={(phone) => this._setContactInfo(phone, "phone")}
          placeholder="Phone"
          returnKeyType={ "done" }
          value={this.state.phone}
          underlineColorAndroid="#fff"
        />
      </View>
    );
  }
}