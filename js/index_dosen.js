var tahun_ajaranGlobal;
var nikLogin;
var email;
$(document).ready(function () {

    var tahun_AjaranDataRef = firebase.database().ref().child('tahun_ajaran');
    tahun_AjaranDataRef.on('value', function (snap) {
        if (snap.exists()) {
            obj = [];
            snap.forEach(function (childSnap) {
                var c2 = childSnap.val();
                obj2 = {'idx': c2.id, 'name': c2.name, 'status': c2.status};
                obj.push(obj2);
            });
            addComboTahun_Ajaran(obj);
        }
    });


    tahun_ajaranGlobal = $('#filterTahun_Ajaran option:selected').val();
});
function addComboTahun_Ajaran(data) {
    $('#filterTahun_Ajaran').empty();
    $('#filterTahun_Ajaran')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Tahun Ajaran--"));
    $.each(data, function (key, value) {
        if (value.status === "true") {
            $('#filterTahun_Ajaran')
                    .append($("<option></option>")
                            .attr("value", value.idx)
                            .attr("selected", "selected")
                            .text(value.name));
        } else {
            $('#filterTahun_Ajaran')
                    .append($("<option></option>")
                            .attr("value", value.idx)
                            .text(value.name));
        }
    });

    var DosenDataRef = firebase.database().ref().child('dosen');
    DosenDataRef.on('value', function (snap) {
        if (snap.exists()) {
            obj = [];
            snap.forEach(function (childSnap) {
                var c2 = childSnap.val();
                obj2 = {'nik': c2.nik, 'name': c2.name, 'email': c2.email, 'id_role': c2.id_role, 'nama_role': c2.nama_role};
                obj.push(obj2);
            });
            addComboFilterDosen(obj);
        }
    });
    hitungJumlahSidang();

    $("#filterTahun_Ajaran").change(function () {
    });

}


function addComboFilterDosen(data) {
    $('#filterDosen').empty();
    $('#filterDosen')
            .append($("<option></option>")
                    .attr("value", "--")
                    .text("--Pilih Dosen--"));

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            uid = user.uid;
            name = user.displayName;
            email = user.email;

            var dosenRef = firebase.database().ref('dosen/');
            dosenRef.on('value', function (snap) {
                $.each(snap.val(), function (index, element) {
                    if (email === element.email) {
                        nikLogin = element.nik;
                    }
                });

                $.each(data, function (key, value) {
                    if (value.nik === nikLogin) {
                        $('#filterDosen')
                                .append($("<option></option>")
                                        .attr("value", value.nik).attr("selected", "selected")
                                        .text(value.nik + ' - ' + value.name));
                    } else {
                        $('#filterDosen')
                                .append($("<option></option>")
                                        .attr("value", value.nik)
                                        .text(value.nik + ' - ' + value.name));
                    }
                });

            });
        }

    });

}

function hitungJumlahSidang() {
    var jmlPemb1 = 0;
    var jmlPemb2 = 0;
    var jmlPeng1 = 0;
    var jmlPeng2 = 0;
    tahun_ajaranGlobal = $('#filterTahun_Ajaran option:selected').val();
    var assignSidangDataRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal);
    assignSidangDataRef.on("value", function (snap) {
        objB = [];
        if (snap.exists()) {
            objB = [];
            snap.forEach(function (childSnap) {
                var c21 = childSnap.val();
                var topikDataRef = firebase.database().ref('topik/' + tahun_ajaranGlobal + '/');
                topikDataRef.on('value', function (snap) {
                    snap.forEach(function (data) {
                        var c2T = data.val();
                        obj2B = {
                            'id_topik': c2T.id,
                            'judul2_topik': c2T.judul_topik,
                            'mahasiswa2': c2T.mahasiswa,
                            'dosen_pembimbing1': c2T.dosen_pembimbing1,
                            'dosen_pembimbing2': c2T.dosen_pembimbing2,
                            'sidangName': c21.sidangName,
                            'dosen_penguji1': c21.dosen_penguji1,
                            'dosen_penguji2': c21.dosen_penguji2
                        };
                        var dosenDataRef = firebase.database().ref('dosen/');
                        dosenDataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2d = childSnap.val();
                                    if (c2T.dosen_pembimbing1.nik === c2d.nik) {
                                        email_dosen = c2d.email;
                                        if (c21.idTopik === c2T.id) {
                                            var user = firebase.auth().currentUser;
                                            if (user != null) {
                                                user.providerData.forEach(function (profile) {
                                                    if (profile.email === email_dosen) {
                                                        jmlPemb1++;
                                                    }
                                                });
                                            }
                                        }
                                    } else if (c2T.dosen_pembimbing2.nik === c2d.nik) {
                                        email_dosen = c2d.email;
                                        if (c21.idTopik === c2T.id) {
                                            var user = firebase.auth().currentUser;
                                            if (user != null) {
                                                user.providerData.forEach(function (profile) {
                                                    if (profile.email === email_dosen) {
                                                        jmlPemb2++;
                                                    }
                                                });
                                            }
                                        }
                                    } else if (c21.dosen_penguji1.nik === c2d.nik) {
                                        email_dosen = c2d.email;
                                        if (c21.idTopik === c2T.id) {
                                            var user = firebase.auth().currentUser;
                                            if (user != null) {
                                                user.providerData.forEach(function (profile) {
                                                    if (profile.email === email_dosen) {
                                                        jmlPeng1++;
                                                    }
                                                });
                                            }
                                        }
                                    } else if (c21.dosen_penguji2.nik === c2d.nik) {
                                        email_dosen = c2d.email;
                                        if (c21.idTopik === c2T.id) {
                                            var user = firebase.auth().currentUser;
                                            if (user != null) {
                                                user.providerData.forEach(function (profile) {
                                                    if (profile.email === email_dosen) {
                                                        jmlPeng2++;
                                                    }
                                                });
                                            }
                                        }
                                    }
                                });
                            }
                        });
                        document.getElementById("jmlPemb1").innerHTML = jmlPemb1;
                        document.getElementById("jmlPemb2").innerHTML = jmlPemb2;
                        document.getElementById("jmlPeng1").innerHTML = jmlPeng1;
                        document.getElementById("jmlPeng2").innerHTML = jmlPeng2;
                    });
                });
            });


        }
    });

}
