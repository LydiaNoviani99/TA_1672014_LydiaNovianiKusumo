var email;
var nik;
var mainApp = {};
(function () {
    var firebase = app_fireBase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
// User is signed in.
            uid = user.uid;
            name = user.displayName;
            email = user.email;
            var dosenRef = firebase.database().ref('dosen/');
            dosenRef.on('value', function (snap) {
                $.each(snap.val(), function (index, element) {
//                    console.log(element.email);
//                    console.log(element.id_role);
//                    console.log(element.nama_role);
                    if (email === element.email) {
                        nik = element.nik;
                        id_role = element.id_role;
                        nama_role = element.nama_role;
                    }
                });
                $("#profileNik").text(nik);
                $("#profileName").text(name);
                $("#id_role").text(id_role);
                //Kaprodi
                if (id_role === "1") {
                    $("#page_dashboardAdmin").show();
                    $("#page_dashboardDosen").hide();
                    $("#page_tahunAjaran").show();
                    $("#page_dosen").show();
                    $("#page_mahasiswa").show();
                    $("#page_topik").show();
                    $("#page_viewPembPeng").show();
                    $("#page_assignSidang").show();
                    $("#page_sidang").show();
                    $("#page_sidangAdmin").show();
                    $("#page_Nilai").show();
                } 
                //Sekprodi
                else if (id_role === "2") {
                    $("#page_dashboardAdmin").show();
                    $("#page_dashboardDosen").hide();
                    $("#page_tahunAjaran").show();
                    $("#page_dosen").show();
                    $("#page_mahasiswa").show();
                    $("#page_topik").show();
                    $("#page_viewPembPeng").show();
                    $("#page_assignSidang").show();
                    $("#page_sidang").show();
                    $("#page_sidangAdmin").show();
                    $("#page_Nilai").show();
                }
                //Koor TA
                else if (id_role === "3") {
                    $("#page_dashboardAdmin").show();
                    $("#page_dashboardDosen").hide();
                    $("#page_tahunAjaran").show();
                    $("#page_dosen").show();
                    $("#page_mahasiswa").show();
                    $("#page_topik").show();
                    $("#page_viewPembPeng").show();
                    $("#page_assignSidang").show();
                    $("#page_sidang").show();
                    $("#page_sidangAdmin").show();
                    $("#page_Nilai").show();
                }
                //Petugas TU
                else if (id_role === "4") {
                    $("#page_dashboardAdmin").show();
                    $("#page_dashboardDosen").hide();
                    $("#page_tahunAjaran").show();
                    $("#page_dosen").show();
                    $("#page_mahasiswa").show();
                    $("#page_topik").show();
                    $("#page_viewPembPeng").show();
                    $("#page_assignSidang").show();
                    $("#page_sidang").hide();
                    $("#page_sidangAdmin").hide();
                    $("#page_Nilai").show();
                }
                //Dosen
                else if (id_role === "5") {
                    $("#page_dashboardAdmin").hide();
                    $("#page_dashboardDosen").show();
                    $("#page_tahunAjaran").hide();
                    $("#page_dosen").hide();
                    $("#page_mahasiswa").hide();
                    $("#page_topik").hide();
                    $("#page_viewPembPeng").show();
                    $("#page_assignSidang").hide();
                    $("#page_sidang").show();
                    $("#page_sidangAdmin").hide();
                    $("#page_Nilai").show();
                }
            });

        } else {
//redirect to login page
            uid = null;
            window.location.replace("login.php");
        }
    });
    function logOut() {
        firebase.auth().signOut();
    }

    mainApp.logOut = logOut;
})()

$(document).ready(function () {
    $("#page_dashboardAdmin").hide();
    $("#page_dashboardDosen").hide();
    $("#page_tahunAjaran").hide();
    $("#page_dosen").hide();
    $("#page_mahasiswa").hide();
    $("#page_topik").hide();
    $("#page_viewPembPeng").hide();
    $("#page_assignSidang").hide();
    $("#page_sidang").hide();
    $("#page_sidangAdmin").hide();
    $("#page_Nilai").hide();
});
