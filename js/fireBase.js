
var app_fireBase = {};
var name, email, nik, id_role, nama_role;
(function () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDkV7JoyvVqdXyckGbbVmUooogLZB2bHRM",
        authDomain: "tugasakhir1672014.firebaseapp.com",
        databaseURL: "https://tugasakhir1672014.firebaseio.com",
        projectId: "tugasakhir1672014",
        storageBucket: "tugasakhir1672014.appspot.com",
        messagingSenderId: "926965532523",
  };
    // Initialize Firebase

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    app_fireBase = firebase;
})()
