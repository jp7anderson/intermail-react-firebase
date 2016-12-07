import * as firebase from 'firebase';

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDvpJKavLgm_jcgBDodq1O-kV6-wEtDmac",
    authDomain: "intermail-react.firebaseapp.com",
    databaseURL: "https://intermail-react.firebaseio.com",
    storageBucket: "intermail-react.appspot.com",
    messagingSenderId: "775220120946"
});

module.exports = firebaseApp;
