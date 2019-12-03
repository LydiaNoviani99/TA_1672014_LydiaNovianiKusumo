var tahun_ajaranGlobal;
var nikLogin;
var email;

var filterDosenGlobal;
var nikFilterDosen;
var nameFilterDosen;

var jmlBelumNilai;
var jmlBelumNilaiSemuaSidang;
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

    $.each(data, function (key, value) {
        $('#filterDosen')
                .append($("<option></option>")
                        .attr("value", value.nik)
                        .text(value.nik + ' - ' + value.name));
    });
}

function addComboTahun_Ajaran(data) {
    $('#filterTahun_Ajaran').empty();
    $('#filterTahun_Ajaran')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Tahun Ajaran--"));
    $.each(data, function (key, value) {
        $('#filterTahun_Ajaran')
                .append($("<option></option>")
                        .attr("value", value.idx)
                        .text(value.name));
    });



//    hitungJumlahSidang();
    view_belumNilaiTable();
    view_belumNilaiTable_semuanya();

    $("#filterTahun_Ajaran").change(function () {
        inisialisasi();
        view_belumNilaiTable_semuanya();
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

        $("#filterDosen").change(function () {
            hitungJumlahSidang();
            view_belumNilaiTable();
            view_belumNilaiTable_semuanya();
        });
    });
}

function inisialisasi() {

    jmlBelumNilai = 0;
    document.getElementById("jmlBelumNilai").innerHTML = jmlBelumNilai;
    jmlBelumNilaiSemuaSidang = 0;
    document.getElementById("jmlBelumNilaiSemuaSidang").innerHTML = jmlBelumNilaiSemuaSidang;


    $('#belumNilaiTable').DataTable().clear().draw();
}
function hitungJumlahSidang() {
    filterDosenGlobal = $('#filterDosen option:selected').text();
    nikFilterDosen = filterDosenGlobal.substr(0, filterDosenGlobal.indexOf(' -'));
    nameFilterDosen = filterDosenGlobal.substr(filterDosenGlobal.indexOf('- ') + 2);

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
                            'mahasiswa': c2T.mahasiswa,
                            'dosen_pembimbing1': c2T.dosen_pembimbing1,
                            'dosen_pembimbing2': c2T.dosen_pembimbing2,
                            'sidangName': c21.sidangName,
                            'dosen_penguji1': c21.dosen_penguji1,
                            'dosen_penguji2': c21.dosen_penguji2
                        };
                    });
                });
            });
        }
    });

}
var tanggalSidang;
function view_belumNilaiTable() {
    jmlBelumNilai = 0;
    var p_id = $('#filterTahun_Ajaran option:selected').val();
    $('#belumNilaiSemuaTable').DataTable().clear().draw();
    tahun_ajaranGlobal = p_id;
    if (p_id == "-") {
        $('#belumNilaiSemuaTable').DataTable().clear().draw();
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
                                'mahasiswa': c2T.mahasiswa,
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

                            if (c2T.dosen_pembimbing1.nik === nikFilterDosen) {
                                if (c21.idTopik === c2T.id) {
                                    if (c21.sidangName === "Sidang 1") {
                                        if (typeof proses_sidang1_pemb1 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': "-",
                                                'keterangan': "nilai proses",
                                                "sebagai": "Pembimbing 1",
                                                "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                        if (typeof sidang1_pemb1 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai sidang",
                                                "sebagai": "Pembimbing 1",
                                                "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                    } else if (c21.sidangName === "Sidang 2") {
                                        if (typeof proses_sidang2_pemb1 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': "-",
                                                'keterangan': "nilai proses",
                                                "sebagai": "Pembimbing 1",
                                                "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                        if (typeof sidang2_pemb1 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai sidang",
                                                "sebagai": "Pembimbing 1",
                                                "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                    } else if (c21.sidangName === "Sidang 3") {
                                        if (typeof proses_sidang3_pemb1 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': "-",
                                                'keterangan': "nilai proses",
                                                "sebagai": "Pembimbing 1",
                                                "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                        if (typeof sidang3_pemb1 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai sidang",
                                                "sebagai": "Pembimbing 1",
                                                "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                        if (typeof produk_pemb1 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai produk",
                                                "sebagai": "Pembimbing 1",
                                                "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                    }
                                }
                            } else if (c2T.dosen_pembimbing2.nik === nikFilterDosen) {
                                if (c21.idTopik === c2T.id) {
                                    if (c21.sidangName === "Sidang 1") {
                                        if (typeof proses_sidang1_pemb2 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': "-",
                                                'keterangan': "nilai proses",
                                                "sebagai": "Pembimbing 2",
                                                "dosen": c2T.dosen_pembimbing2.nik + " - " + c2T.dosen_pembimbing2.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                    } else if (c21.sidangName === "Sidang 2") {
                                        if (typeof proses_sidang2_pemb2 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': "-",
                                                'keterangan': "nilai proses",
                                                "sebagai": "Pembimbing 2",
                                                "dosen": c2T.dosen_pembimbing2.nik + " - " + c2T.dosen_pembimbing2.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                    } else if (c21.sidangName === "Sidang 3") {
                                        if (typeof proses_sidang3_pemb2 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': "-",
                                                'keterangan': "nilai proses",
                                                "sebagai": "Pembimbing 2",
                                                "dosen": c2T.dosen_pembimbing2.nik + " - " + c2T.dosen_pembimbing2.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                        if (typeof produk_pemb2 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai produk",
                                                "sebagai": "Pembimbing 2",
                                                "dosen": c2T.dosen_pembimbing2.nik + " - " + c2T.dosen_pembimbing2.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                    }
                                }
                            } else if (c21.dosen_penguji1.nik === nikFilterDosen) {
                                if (c21.idTopik === c2T.id) {
                                    if (c21.sidangName === "Sidang 1") {
                                        if (typeof sidang1_peng1 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai sidang",
                                                "sebagai": "Penguji 1",
                                                "dosen": c21.dosen_penguji1.nik + " - " + c21.dosen_penguji1.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                    } else if (c21.sidangName === "Sidang 2") {
                                        if (typeof sidang2_peng1 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai sidang",
                                                "sebagai": "Penguji 1",
                                                "dosen": c21.dosen_penguji1.nik + " - " + c21.dosen_penguji1.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                    } else if (c21.sidangName === "Sidang 3") {
                                        if (typeof sidang3_peng1 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai sidang",
                                                "sebagai": "Penguji 1",
                                                "dosen": c21.dosen_penguji1.nik + " - " + c21.dosen_penguji1.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                        if (typeof produk_peng1 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai produk",
                                                "sebagai": "Penguji 1",
                                                "dosen": c21.dosen_penguji1.nik + " - " + c21.dosen_penguji1.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                    }
                                }
                            } else if (c21.dosen_penguji2.nik === nikFilterDosen) {
                                if (c21.idTopik === c2T.id) {
                                    if (c21.sidangName === "Sidang 1") {
                                        if (typeof sidang1_peng2 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai sidang",
                                                "sebagai": "Penguji 2",
                                                "dosen": c21.dosen_penguji2.nik + " - " + c21.dosen_penguji2.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                    } else if (c21.sidangName === "Sidang 2") {
                                        if (typeof sidang2_peng2 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai sidang",
                                                "sebagai": "Penguji 2",
                                                "dosen": c21.dosen_penguji2.nik + " - " + c21.dosen_penguji2.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                    } else if (c21.sidangName === "Sidang 3") {
                                        if (typeof sidang3_peng2 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai sidang",
                                                "sebagai": "Penguji 2",
                                                "dosen": c21.dosen_penguji2.nik + " - " + c21.dosen_penguji2.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                        if (typeof produk_peng2 === 'undefined') {
                                            obj2AAA = {
                                                'mahasiswa': c2T.mahasiswa,
                                                'sidangId': c21.sidangId,
                                                'sidangName': c21.sidangName,
                                                'tanggal': tanggalSidang,
                                                'keterangan': "nilai produk",
                                                "sebagai": "Penguji 2",
                                                "dosen": c21.dosen_penguji2.nik + " - " + c21.dosen_penguji2.name
                                            };
                                            jmlBelumNilai++;
                                            obj.push(obj2AAA);
                                        }
                                    }
                                }
                            }

                            document.getElementById("jmlBelumNilai").innerHTML = jmlBelumNilai;
                            addViewSidangBelumDinilai(obj);
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

function view_belumNilaiTable_semuanya() {
    jmlBelumNilaiSemuaSidang = 0;
    var p_id = $('#filterTahun_Ajaran option:selected').val();
    $('#belumNilaiSemuaTable').DataTable().clear().draw();
    tahun_ajaranGlobal = p_id;

    if (p_id == "-") {
        $('#belumNilaiTable').DataTable().clear().draw();
    } else {
        var assignSidangDataRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal);
        assignSidangDataRef.on("value", function (snap) {
            if (snap.exists()) {
                objSemua = [];
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
                                'mahasiswa': c2T.mahasiswa,
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


                            if (c21.idTopik === c2T.id) {
                                //Sidang 1
                                if (c21.sidangName === "Sidang 1") {
                                    // pemb1_proses1
                                    if (typeof proses_sidang1_pemb1 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': "-",
                                            'keterangan': "nilai proses",
                                            "sebagai": "Pembimbing 1",
                                            "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // pemb1_sidang1
                                    if (typeof sidang1_pemb1 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai sidang",
                                            "sebagai": "Pembimbing 1",
                                            "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // pemb2_proses1
                                    if (typeof proses_sidang1_pemb2 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': "-",
                                            'keterangan': "nilai proses",
                                            "sebagai": "Pembimbing 2",
                                            "dosen": c2T.dosen_pembimbing2.nik + " - " + c2T.dosen_pembimbing2.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // peng1_sidang1
                                    if (typeof sidang1_peng1 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai sidang",
                                            "sebagai": "Penguji 1",
                                            "dosen": c21.dosen_penguji1.nik + " - " + c21.dosen_penguji1.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // peng2_sidang1
                                    if (typeof sidang1_peng2 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai sidang",
                                            "sebagai": "Penguji 2",
                                            "dosen": c21.dosen_penguji2.nik + " - " + c21.dosen_penguji2.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                }
                                //Sidang 2
                                else if (c21.sidangName === "Sidang 2") {

                                    // pemb1_proses2
                                    if (typeof proses_sidang2_pemb1 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': "-",
                                            'keterangan': "nilai proses",
                                            "sebagai": "Pembimbing 1",
                                            "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // pemb1_sidang2
                                    if (typeof sidang2_pemb1 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai sidang",
                                            "sebagai": "Pembimbing 1",
                                            "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // pemb2_proses2
                                    if (typeof proses_sidang2_pemb2 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': "-",
                                            'keterangan': "nilai proses",
                                            "sebagai": "Pembimbing 2",
                                            "dosen": c2T.dosen_pembimbing2.nik + " - " + c2T.dosen_pembimbing2.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // peng1_sidang2
                                    if (typeof sidang2_peng1 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai sidang",
                                            "sebagai": "Penguji 1",
                                            "dosen": c21.dosen_penguji1.nik + " - " + c21.dosen_penguji1.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // peng2_sidang2
                                    if (typeof sidang2_peng2 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai sidang",
                                            "sebagai": "Penguji 2",
                                            "dosen": c21.dosen_penguji2.nik + " - " + c21.dosen_penguji2.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                }
                                //Sidang 3
                                else if (c21.sidangName === "Sidang 3") {
                                    // pemb1_proses3
                                    if (typeof proses_sidang3_pemb1 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': "-",
                                            'keterangan': "nilai proses",
                                            "sebagai": "Pembimbing 1",
                                            "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // pemb1_sidang3
                                    if (typeof sidang3_pemb1 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai sidang",
                                            "sebagai": "Pembimbing 1",
                                            "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // pemb1_produk
                                    if (typeof produk_pemb1 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai produk",
                                            "sebagai": "Pembimbing 1",
                                            "dosen": c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // pemb2_proses2
                                    if (typeof proses_sidang3_pemb2 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': "-",
                                            'keterangan': "nilai proses",
                                            "sebagai": "Pembimbing 2",
                                            "dosen": c2T.dosen_pembimbing2.nik + " - " + c2T.dosen_pembimbing2.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // pemb2_produk
                                    if (typeof produk_pemb2 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai produk",
                                            "sebagai": "Pembimbing 2",
                                            "dosen": c2T.dosen_pembimbing2.nik + " - " + c2T.dosen_pembimbing2.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // peng1_sidang3
                                    if (typeof sidang3_peng1 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai sidang",
                                            "sebagai": "Penguji 1",
                                            "dosen": c21.dosen_penguji1.nik + " - " + c21.dosen_penguji1.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // peng1_produk
                                    if (typeof produk_peng1 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai produk",
                                            "sebagai": "Penguji 1",
                                            "dosen": c21.dosen_penguji1.nik + " - " + c21.dosen_penguji1.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // peng2_sidang3
                                    if (typeof sidang3_peng2 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai sidang",
                                            "sebagai": "Penguji 2",
                                            "dosen": c21.dosen_penguji2.nik + " - " + c21.dosen_penguji2.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                    // peng2_produk
                                    if (typeof produk_peng2 === 'undefined') {
                                        obj2AAA = {
                                            'mahasiswa': c2T.mahasiswa,
                                            'sidangId': c21.sidangId,
                                            'sidangName': c21.sidangName,
                                            'tanggal': tanggalSidang,
                                            'keterangan': "nilai produk",
                                            "sebagai": "Penguji 2",
                                            "dosen": c21.dosen_penguji2.nik + " - " + c21.dosen_penguji2.name
                                        };
                                        jmlBelumNilaiSemuaSidang++;
                                        objSemua.push(obj2AAA);
                                    }
                                }
                            }


                            document.getElementById("jmlBelumNilaiSemuaSidang").innerHTML = jmlBelumNilaiSemuaSidang;
                            addViewSidangBelumDinilai_semuanya(objSemua);
                        });
                    });
                });
            }
        });
    }
}
function addViewSidangBelumDinilai_semuanya(data) {
    $('#belumNilaiSemuaTable').DataTable().clear().draw();
    $('#belumNilaiSemuaTable').DataTable().rows.add(data).draw();
}