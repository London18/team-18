import firebase from 'firebase'
const config = require('./config')

var fire = firebase.initializeApp(config);
export default fire;
