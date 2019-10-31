var app_fireBase = {};

$(document).ready(function () {
    var indexApp = {};
    (function () {
//    var firebase = app_fireBase;
        var uid = null;
        var name, email, photoUrl, nik, id_role, nama_role;

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                uid = user.uid;
                email = user.email;
                photoUrl = user.photoURL;
                var dosenRef = firebase.database().ref('dosen/');
                dosenRef.on("value", function (snap) {
                    $.each(snap.val(), function (index, element) {
                        if (email === element.email) {
                            nik = element.nik;
                            name = element.name;
                            id_role = element.id_role;
                            nama_role = element.nama_role;
                        }

                        $('#nameProfile').text(name);
                        $('#email').text(email);
                        $('#nikProfile').text(nik);
                        $('#jabatanProfile').text(nama_role);
                        $('#profileName').text(name);
                        $('#profileNik').text(nik);
                    });
                });



                $('#e_username').val(name);
                $('#e_email').val(email);
            } else {
                //redirect to login page
                uid = null;
                window.location.replace("login.php");
            }
        });

        $("#btnUbahPassword").click(function () {
            var user = firebase.auth().currentUser;
            var auth = firebase.auth();
            var emailAddress = user.email;
            auth.sendPasswordResetEmail(emailAddress).then(function () {
                // Email sent.
                alert("Silahkan Cek Email Anda!");
            }).catch(function (error) {
                // An error happened.
                alert(error);
            });
        });

        function logOut() {
            firebase.auth().signOut();
        }

        indexApp.logOut = logOut;
    })();

});

