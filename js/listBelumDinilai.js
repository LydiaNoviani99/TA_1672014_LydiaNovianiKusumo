var tahun_ajaranGlobal;
var nikLogin;
var email;
var jmlBelumNilai = 0;
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
function addComboTahun_Ajaran(data) {
    $('#filterTahun_Ajaran').empty();
    $('#filterTahun_Ajaran')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Tahun Ajaran--"));
    $.each(data, function (key, value) {
        if (value.status === "Aktif") {
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
    view_belumNilaiTable();

    $("#filterTahun_Ajaran").change(function () {
        jmlBelumNilai = "-";
        document.getElementById("jmlBelumNilai").innerHTML = jmlBelumNilai;
        view_belumNilaiTable();
    });

}

var tanggalSidang;
function view_belumNilaiTable() {
    var jmlBelumNilai = 0;
    var p_id = $('#filterTahun_Ajaran option:selected').val();
    $('#belumNilaiTable').DataTable().clear().draw();
    tahun_ajaranGlobal = p_id;
    if (p_id == "-") {
        $('#belumNilaiTable').DataTable().clear().draw();
    } else {
        var assignSidangDataRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal);
        assignSidangDataRef.on("value", function (snap) {
            if (snap.exists()) {
                obj = [];
                obj1 = [];
                obj2 = [];
                obj3 = [];
                snap.forEach(function (childSnap) {
                    var c21 = childSnap.val();
                    var topikDataRef = firebase.database().ref('topik/' + tahun_ajaranGlobal + '/');
                    topikDataRef.on('value', function (snap) {
                        snap.forEach(function (data) {
                            var c2T = data.val();
                            var formatter = 'dddd, DD MMMM YYYY, 23:59:59';
                            var date = new Date(c21.tanggal);
                            var tanggalSidang = moment(date).format(formatter);
                            obj2AAA = {
                                'id_topik': c2T.id,
                                'mahasiswa2': c2T.mahasiswa,
                                'dosen_pembimbing1': c2T.dosen_pembimbing1,
                                'dosen_pembimbing2': c2T.dosen_pembimbing2,
                                'idTopik': c21.idTopik,
                                'sidangId': c21.sidangId,
                                'sidangName': c21.sidangName,
                                'tanggal': tanggalSidang,
                                'dosen_penguji1': c21.dosen_penguji1,
                                'dosen_penguji2': c21.dosen_penguji2
                            };
                            var proses_sidang1_pemb1 = c21.nilai_proses_sidang1_pemb1;
                            var proses_sidang1_pemb2 = c21.nilai_proses_sidang1_pemb2;
                            var sidang1_pemb1 = c21.nilai_sidang1_pemb1;
                            var sidang1_peng1 = c21.nilai_sidang1_peng1;
                            var sidang1_peng2 = c21.nilai_sidang1_peng2;

                            var proses_sidang2_pemb1 = c21.nilai_proses_sidang2_pemb1;
                            var proses_sidang2_pemb2 = c21.nilai_proses_sidang2_pemb2;
                            var sidang2_pemb1 = c21.nilai_sidang2_pemb1;
                            var sidang2_peng1 = c21.nilai_sidang2_peng1;
                            var sidang2_peng2 = c21.nilai_sidang2_peng2;

                            var proses_sidang3_pemb1 = c21.nilai_proses_sidang3_pemb1;
                            var proses_sidang3_pemb2 = c21.nilai_proses_sidang3_pemb2;
                            var sidang3_pemb1 = c21.nilai_sidang3_pemb1;
                            var sidang3_peng1 = c21.nilai_sidang3_peng1;
                            var sidang3_peng2 = c21.nilai_sidang3_peng2;

                            var produk_pemb1 = c21.nilai_produk_pemb1;
                            var produk_pemb2 = c21.nilai_produk_pemb2;
                            var produk_peng1 = c21.nilai_produk_peng1;
                            var produk_peng2 = c21.nilai_produk_peng2;

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
                                                            if (c21.sidangName === "Sidang 1") {
                                                                if (typeof proses_sidang1_pemb1 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        'tanggal': "-",
                                                                        "sebagai": "Pembimbing 1",
                                                                        'keterangan': "nilai proses"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                                if (typeof sidang1_pemb1 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Pembimbing 1",
                                                                        'tanggal': tanggalSidang,
                                                                        'keterangan': "nilai sidang"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                            } else if (c21.sidangName === "Sidang 2") {
                                                                if (typeof proses_sidang2_pemb1 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Pembimbing 1",
                                                                        'tanggal': "-",
                                                                        'keterangan': "nilai proses"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                                if (typeof sidang2_pemb1 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        'tanggal': tanggalSidang,
                                                                        "sebagai": "Pembimbing 1",
                                                                        'keterangan': "nilai sidang"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                            } else if (c21.sidangName === "Sidang 3") {
                                                                if (typeof proses_sidang3_pemb1 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Pembimbing 1",
                                                                        'tanggal': "-",
                                                                        'keterangan': "nilai proses"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                                if (typeof sidang3_pemb1 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Pembimbing 1",
                                                                        'tanggal': tanggalSidang,
                                                                        'keterangan': "nilai sidang"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                                if (typeof produk_pemb1 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Pembimbing 1",
                                                                        'tanggal': tanggalSidang,
                                                                        'keterangan': "nilai produk"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                            }
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
                                                            if (c21.sidangName === "Sidang 1") {
                                                                if (typeof proses_sidang1_pemb2 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        "sebagai": "Pembimbing 2",
                                                                        'sidangName': c21.sidangName,
                                                                        'tanggal': "-",
                                                                        'keterangan': "nilai proses"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                            } else if (c21.sidangName === "Sidang 2") {
                                                                if (typeof proses_sidang2_pemb2 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        'tanggal': "-",
                                                                        "sebagai": "Pembimbing 2",
                                                                        'keterangan': "nilai proses"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                            } else if (c21.sidangName === "Sidang 3") {
                                                                if (typeof proses_sidang3_pemb2 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Pembimbing 2",
                                                                        'tanggal': "-",
                                                                        'keterangan': "nilai proses"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                                if (typeof produk_pemb2 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        "sebagai": "Pembimbing 2",
                                                                        'sidangName': c21.sidangName,
                                                                        'tanggal': tanggalSidang,
                                                                        'keterangan': "nilai produk"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                            }
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
                                                            if (c21.sidangName === "Sidang 1") {
                                                                if (typeof sidang1_peng1 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Penguji 1",
                                                                        'tanggal': tanggalSidang,
                                                                        'keterangan': "nilai sidang"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                            } else if (c21.sidangName === "Sidang 2") {
                                                                if (typeof sidang2_peng1 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Penguji 1",
                                                                        'tanggal': tanggalSidang,
                                                                        'keterangan': "nilai sidang"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                            } else if (c21.sidangName === "Sidang 3") {
                                                                if (typeof sidang3_peng1 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Penguji 1",
                                                                        'tanggal': tanggalSidang,
                                                                        'keterangan': "nilai sidang"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                                if (typeof produk_peng1 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Penguji 1",
                                                                        'tanggal': tanggalSidang,
                                                                        'keterangan': "nilai produk"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                            }
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
                                                            if (c21.sidangName === "Sidang 1") {
                                                                if (typeof sidang1_peng2 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Penguji 2",
                                                                        'tanggal': tanggalSidang,
                                                                        'keterangan': "nilai sidang"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                            } else if (c21.sidangName === "Sidang 2") {
                                                                if (typeof sidang2_peng2 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Penguji 2",
                                                                        'tanggal': tanggalSidang,
                                                                        'keterangan': "nilai sidang"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                            } else if (c21.sidangName === "Sidang 3") {
                                                                if (typeof sidang3_peng2 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Penguji 2",
                                                                        'tanggal': tanggalSidang,
                                                                        'keterangan': "nilai sidang"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                                if (typeof produk_peng2 === 'undefined') {
                                                                    obj2AAA = {
                                                                        'mahasiswa2': c2T.mahasiswa,
                                                                        'sidangId': c21.sidangId,
                                                                        'sidangName': c21.sidangName,
                                                                        "sebagai": "Penguji 2",
                                                                        'tanggal': tanggalSidang,
                                                                        'keterangan': "nilai produk"
                                                                    };
                                                                    jmlBelumNilai++;
                                                                    obj.push(obj2AAA);
                                                                }
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        }

                                        document.getElementById("jmlBelumNilai").innerHTML = jmlBelumNilai;
                                        addViewSidangBelumDinilai(obj);
                                    });
                                }
                            });
                        });
                    });
                });
            }
        });
    }

}

function addViewSidangBelumDinilai(data) {
    $('#belumNilaiTable').DataTable().clear().draw();
    $('#belumNilaiTable').DataTable().rows.add(data).draw();
}