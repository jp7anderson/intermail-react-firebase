import * as firebase from 'firebase';

var firebaseApp = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
});

module.exports = firebaseApp;
