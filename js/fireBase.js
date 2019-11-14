


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


$(document).ready(function () {
    $("#page_dashboardAdmin").hide();
    $("#page_dashboardDosen").hide();
    $("#page_sidang").hide();
    $("#page_Nilai").hide();
    $("#page_topik").hide();
    $("#page_assignSidang").hide();
    $("#page_sidangAdmin").hide();
    $("#page_nilaiAdmin").hide();
    $("#page_viewPembPeng").hide();
    $("#page_dosen").hide();
    $("#page_mahasiswa").hide();
    $("#page_tahunAjaran").hide();
    $("#labelDosen").hide();
    $("#labelAdmin").hide();
});

