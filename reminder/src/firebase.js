// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyDkV7JoyvVqdXyckGbbVmUooogLZB2bHRM",
    authDomain: "tugasakhir1672014.firebaseapp.com",
    databaseURL: "https://tugasakhir1672014.firebaseio.com",
    projectId: "tugasakhir1672014",
    storageBucket: "tugasakhir1672014.appspot.com",
    messagingSenderId: "926965532523",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = {firebase};