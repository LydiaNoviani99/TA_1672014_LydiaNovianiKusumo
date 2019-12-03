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
                    if (email === element.email) {
                        nik = element.nik;
                        id_role = element.id_role;
                        nama_role = element.nama_role;
                        sessionStorage.setItem("role", element.id_role);
                    }
                });

                $("#profileNik").text(nik);
                $("#profileName").text(name);
                $("#id_role").text(id_role);
                //Kaprodi
                if (sessionStorage.getItem("role") === "1") {
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
                    $("#page_nilaiAdmin").show();
                    $("#labelDosen").show();
                    $("#labelAdmin").show();
                    $("#page_belum_dinilai_admin").show();
                }
                //Sekprodi
                else if (sessionStorage.getItem("role") === "2") {
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
                    $("#page_nilaiAdmin").show();
                    $("#labelDosen").show();
                    $("#labelAdmin").show();
                    $("#page_belum_dinilai_admin").show();
                }
                //Koor TA
                else if (sessionStorage.getItem("role") === "3") {
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
                    $("#page_nilaiAdmin").show();
                    $("#labelDosen").show();
                    $("#labelAdmin").show();
                    $("#page_belum_dinilai_admin").show();
                }
                //Petugas TU
                else if (sessionStorage.getItem("role") === "4") {
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
                    $("#page_nilaiAdmin").show();
                    $("#labelDosen").hide();
                    $("#labelAdmin").show();
                    $("#page_belum_dinilai_admin").show();
                }
                //Dosen
                else if (sessionStorage.getItem("role") === "5") {
                    $("#page_dashboardAdmin").hide();
                    $("#page_dashboardDosen").show();
                    $("#page_tahunAjaran").hide();
                    $("#page_dosen").hide();
                    $("#page_mahasiswa").hide();
                    $("#page_topik").hide();
                    $("#page_viewPembPeng").hide();
                    $("#page_assignSidang").hide();
                    $("#page_sidang").show();
                    $("#page_sidangAdmin").hide();
                    $("#page_Nilai").show();
                    $("#labelDosen").show();
                    $("#labelAdmin").hide();
                    $("#page_belum_dinilai").show();
                } else {
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
                    $("#page_belum_dinilai_admin").hide();
                    $("#page_belum_dinilai").hide();
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
