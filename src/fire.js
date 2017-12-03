import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDQeAqjA8De8wTVXglRC0ds7syx9DMQxj4",
  authDomain: "denton-311.firebaseapp.com",
  databaseURL: "https://denton-311.firebaseio.com",
  storageBucket: "denton-311.appspot.com"
};

let Fire = firebase.initializeApp(firebaseConfig);
export default Fire;