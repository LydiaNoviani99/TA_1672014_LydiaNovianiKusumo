
var tahun_ajaranGlobal;
var email_dosen;
var tempKeyTopik;
$(document).ready(function () {

    $('#halaman_detail_nilai').hide();
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

});

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
    view_nilai_table();
    $("#filterTahun_Ajaran").change(function () {
        view_nilai_table();
    });
}

function view_nilai_table() {
    $('#nilaiAkhirTable').DataTable().clear().draw();
    var p_id = $('#filterTahun_Ajaran option:selected').val();
    tahun_ajaranGlobal = p_id;
    if (p_id == "-") {
        $('#nilaiAkhirTable').DataTable().clear().draw();
    } else {
        var topikDataRef = firebase.database().ref('topik/' + tahun_ajaranGlobal);
        topikDataRef.on('value', function (snap) {
            obj = [];
            if (snap.exists()) {
                obj = [];
                snap.forEach(function (childSnap) {
                    var c2 = childSnap.val();
                    obj2 = {
                        'id': c2.id,
                        'judul_topik': c2.judul_topik,
                        'mahasiswa': c2.mahasiswa,
                        'nilaiSidang1': c2.nilaiSidang1,
                        'nilaiSidang2': c2.nilaiSidang2,
                        'nilaiSidang3': c2.nilaiSidang3,
                        'nilaiTA': c2.nilaiTA,
                        'nilaiMutu': c2.nilaiMutu
                    };

                    obj.push(obj2);
                });
//                console.log(obj);
                addViewNilaiAkhir(obj);
            }
        });
    }
}

function addViewNilaiAkhir(data) {
    $('#nilaiAkhirTable').DataTable().clear().draw();
    $('#nilaiAkhirTable').DataTable().rows.add(data).draw();
}

var nrpSidang1;
var nrpSidang2;
function lihatDetailNilai(id, nrp) {
    $('#halaman_nilai').hide();
    $('#halaman_detail_nilai').show();
    tempKeyTopik = id;
    var ketemu = 0;
    var topikDataRef = firebase.database().ref('topik/').child(tahun_ajaranGlobal).child(tempKeyTopik);
    topikDataRef.on('value', function (snap) {
        objTopik = [];
        if (snap.exists()) {
            var objTopik = snap.val();
            var gTopikId = objTopik.id;
            var gTopikMahasiswaNrp = objTopik.mahasiswa.nrp;
            var gTopikMahasiswaName = objTopik.mahasiswa.name;
            var gTopikJudulTopik = objTopik.judul_topik;
            var gTopikPemb1Nik = objTopik.dosen_pembimbing1.nik;
            var gTopikPemb1Name = objTopik.dosen_pembimbing1.name;
            var gTopikPemb2Nik = objTopik.dosen_pembimbing2.nik;
            var gTopikPemb2Name = objTopik.dosen_pembimbing2.name;
        }
        var sidangDataRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal);
        sidangDataRef.on("value", function (snaps) {
            objSidang = [];
            if (snaps.exists()) {
                snaps.forEach(function (childSnaps) {
                    var c2Sidang = childSnaps.val();
                    obj2Sidang = {
                        'idTopik': c2Sidang.idTopik,
                        'sidangId': c2Sidang.sidangId,
                        'sidangName': c2Sidang.sidangName,
                        'tanggal': new Date(c2Sidang.tanggal).toDateString(),
                        'jam_mulai': c2Sidang.jam_mulai,
                        'ruangan': c2Sidang.ruangan,
                        'catatan': c2Sidang.catatan,
                        'dosen_penguji1': c2Sidang.dosen_penguji1,
                        'dosen_penguji2': c2Sidang.dosen_penguji2,
                        'totalProsesSidang1': c2Sidang.totalProsesSidang1,
                        'totalSidang1': c2Sidang.totalSidang1,
                        'totalProsesSidang2': c2Sidang.totalProsesSidang2,
                        'totalSidang2': c2Sidang.totalSidang2,
                        'totalProsesSidang3': c2Sidang.totalProsesSidang3,
                        'totalSidang3': c2Sidang.totalSidang3,
                        'totalProduk': c2Sidang.totalProduk
                    };
                    document.getElementById('nilaiMahasiswaNrp').innerHTML = nrp;
                    document.getElementById('nilaiMahasiswaName').innerHTML = gTopikMahasiswaName;
                    document.getElementById('nilaiJudulTopik').innerHTML = gTopikJudulTopik;
                    document.getElementById('nilaiDosenPemb1').innerHTML = gTopikPemb1Nik + " - " + gTopikPemb1Name;
                    document.getElementById('nilaiDosenPemb2').innerHTML = gTopikPemb2Nik + " - " + gTopikPemb2Name;
                    document.getElementById('nilaiDosenPeng1').innerHTML = c2Sidang.dosen_penguji1.nik + " - " + c2Sidang.dosen_penguji1.name;
                    document.getElementById('nilaiDosenPeng2').innerHTML = c2Sidang.dosen_penguji2.nik + " - " + c2Sidang.dosen_penguji2.name;

                    if (c2Sidang.sidangName == "Sidang 1") {

                        //sidang
                        nrpSidang1 = nrp + "Sidang1";
                        $('.nav-tabs li:eq(0) a').tab('show');
                        var nilaiPemb1DataRef = firebase.database().ref('nilai_pemb1/').child(nrpSidang1);
                        nilaiPemb1DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPemb1Sidang1 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPemb1Sidang1.id,
                                        'nilai': c2NilaiPemb1Sidang1.nilai
                                    };

                                    if (c2NilaiPemb1Sidang1.id == "SD1RP1") {
                                        document.getElementById('nilai_SD1RP1_pemb1').innerHTML = c2NilaiPemb1Sidang1.nilai
                                    }
                                    if (c2NilaiPemb1Sidang1.id == "SD1PD1") {
                                        document.getElementById('nilai_SD1PD1_pemb1').innerHTML = c2NilaiPemb1Sidang1.nilai
                                    }
                                    if (c2NilaiPemb1Sidang1.id == "SD1PD2") {
                                        document.getElementById('nilai_SD1PD2_pemb1').innerHTML = c2NilaiPemb1Sidang1.nilai
                                    }
                                    if (c2NilaiPemb1Sidang1.id == "SD1AM1") {
                                        document.getElementById('nilai_SD1AM1_pemb1').innerHTML = c2NilaiPemb1Sidang1.nilai
                                    }
                                    if (c2NilaiPemb1Sidang1.id == "SD1AM2") {
                                        document.getElementById('nilai_SD1AM2_pemb1').innerHTML = c2NilaiPemb1Sidang1.nilai
                                    }
                                    if (c2NilaiPemb1Sidang1.id == "SD1AM3") {
                                        document.getElementById('nilai_SD1AM3_pemb1').innerHTML = c2NilaiPemb1Sidang1.nilai
                                    }
                                    if (c2NilaiPemb1Sidang1.id == "SD1AM4") {
                                        document.getElementById('nilai_SD1AM4_pemb1').innerHTML = c2NilaiPemb1Sidang1.nilai
                                    }
                                    if (c2NilaiPemb1Sidang1.id == "SD1AM5") {
                                        document.getElementById('nilai_SD1AM5_pemb1').innerHTML = c2NilaiPemb1Sidang1.nilai
                                    }
                                    if (c2NilaiPemb1Sidang1.id == "SD1AM6") {
                                        document.getElementById('nilai_SD1AM6_pemb1').innerHTML = c2NilaiPemb1Sidang1.nilai
                                    }
                                    if (c2NilaiPemb1Sidang1.id == "SD1PR1") {
                                        document.getElementById('nilai_SD1PR1_pemb1').innerHTML = c2NilaiPemb1Sidang1.nilai
                                    }
                                    if (c2NilaiPemb1Sidang1.id == "SD1PR2") {
                                        document.getElementById('nilai_SD1PR2_pemb1').innerHTML = c2NilaiPemb1Sidang1.nilai
                                    }
                                    if (c2NilaiPemb1Sidang1.id == "nilai_sidang1_pemb1") {
                                        document.getElementById('nilai_sidang1_pemb1').innerHTML = c2NilaiPemb1Sidang1.nilai
                                    }
                                });
                            }
                        });

                        var nilaiPeng1DataRef = firebase.database().ref('nilai_peng1/').child(nrpSidang1);
                        nilaiPeng1DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPeng1Sidang1 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPeng1Sidang1.id,
                                        'nilai': c2NilaiPeng1Sidang1.nilai
                                    };

                                    if (c2NilaiPeng1Sidang1.id == "SD1RP1") {
                                        document.getElementById('nilai_SD1RP1_peng1').innerHTML = c2NilaiPeng1Sidang1.nilai
                                    }
                                    if (c2NilaiPeng1Sidang1.id == "SD1PD1") {
                                        document.getElementById('nilai_SD1PD1_peng1').innerHTML = c2NilaiPeng1Sidang1.nilai
                                    }
                                    if (c2NilaiPeng1Sidang1.id == "SD1PD2") {
                                        document.getElementById('nilai_SD1PD2_peng1').innerHTML = c2NilaiPeng1Sidang1.nilai
                                    }
                                    if (c2NilaiPeng1Sidang1.id == "SD1AM1") {
                                        document.getElementById('nilai_SD1AM1_peng1').innerHTML = c2NilaiPeng1Sidang1.nilai
                                    }
                                    if (c2NilaiPeng1Sidang1.id == "SD1AM2") {
                                        document.getElementById('nilai_SD1AM2_peng1').innerHTML = c2NilaiPeng1Sidang1.nilai
                                    }
                                    if (c2NilaiPeng1Sidang1.id == "SD1AM3") {
                                        document.getElementById('nilai_SD1AM3_peng1').innerHTML = c2NilaiPeng1Sidang1.nilai
                                    }
                                    if (c2NilaiPeng1Sidang1.id == "SD1AM4") {
                                        document.getElementById('nilai_SD1AM4_peng1').innerHTML = c2NilaiPeng1Sidang1.nilai
                                    }
                                    if (c2NilaiPeng1Sidang1.id == "SD1AM5") {
                                        document.getElementById('nilai_SD1AM5_peng1').innerHTML = c2NilaiPeng1Sidang1.nilai
                                    }
                                    if (c2NilaiPeng1Sidang1.id == "SD1AM6") {
                                        document.getElementById('nilai_SD1AM6_peng1').innerHTML = c2NilaiPeng1Sidang1.nilai
                                    }
                                    if (c2NilaiPeng1Sidang1.id == "SD1PR1") {
                                        document.getElementById('nilai_SD1PR1_peng1').innerHTML = c2NilaiPeng1Sidang1.nilai
                                    }
                                    if (c2NilaiPeng1Sidang1.id == "SD1PR2") {
                                        document.getElementById('nilai_SD1PR2_peng1').innerHTML = c2NilaiPeng1Sidang1.nilai
                                    }
                                    if (c2NilaiPeng1Sidang1.id == "nilai_sidang1_peng1") {
                                        document.getElementById('nilai_sidang1_peng1').innerHTML = c2NilaiPeng1Sidang1.nilai
                                    }
                                });
                            }
                        });

                        var nilaiPeng2DataRef = firebase.database().ref('nilai_peng2/').child(nrpSidang1);
                        nilaiPeng2DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPeng2Sidang1 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPeng2Sidang1.id,
                                        'nilai': c2NilaiPeng2Sidang1.nilai
                                    };

                                    if (c2NilaiPeng2Sidang1.id == "SD1RP1") {
                                        document.getElementById('nilai_SD1RP1_peng2').innerHTML = c2NilaiPeng2Sidang1.nilai
                                    }
                                    if (c2NilaiPeng2Sidang1.id == "SD1PD1") {
                                        document.getElementById('nilai_SD1PD1_peng2').innerHTML = c2NilaiPeng2Sidang1.nilai
                                    }
                                    if (c2NilaiPeng2Sidang1.id == "SD1PD2") {
                                        document.getElementById('nilai_SD1PD2_peng2').innerHTML = c2NilaiPeng2Sidang1.nilai
                                    }
                                    if (c2NilaiPeng2Sidang1.id == "SD1AM1") {
                                        document.getElementById('nilai_SD1AM1_peng2').innerHTML = c2NilaiPeng2Sidang1.nilai
                                    }
                                    if (c2NilaiPeng2Sidang1.id == "SD1AM2") {
                                        document.getElementById('nilai_SD1AM2_peng2').innerHTML = c2NilaiPeng2Sidang1.nilai
                                    }
                                    if (c2NilaiPeng2Sidang1.id == "SD1AM3") {
                                        document.getElementById('nilai_SD1AM3_peng2').innerHTML = c2NilaiPeng2Sidang1.nilai
                                    }
                                    if (c2NilaiPeng2Sidang1.id == "SD1AM4") {
                                        document.getElementById('nilai_SD1AM4_peng2').innerHTML = c2NilaiPeng2Sidang1.nilai
                                    }
                                    if (c2NilaiPeng2Sidang1.id == "SD1AM5") {
                                        document.getElementById('nilai_SD1AM5_peng2').innerHTML = c2NilaiPeng2Sidang1.nilai
                                    }
                                    if (c2NilaiPeng2Sidang1.id == "SD1AM6") {
                                        document.getElementById('nilai_SD1AM6_peng2').innerHTML = c2NilaiPeng2Sidang1.nilai
                                    }
                                    if (c2NilaiPeng2Sidang1.id == "SD1PR1") {
                                        document.getElementById('nilai_SD1PR1_peng2').innerHTML = c2NilaiPeng2Sidang1.nilai
                                    }
                                    if (c2NilaiPeng2Sidang1.id == "SD1PR2") {
                                        document.getElementById('nilai_SD1PR2_peng2').innerHTML = c2NilaiPeng2Sidang1.nilai
                                    }
                                    if (c2NilaiPeng2Sidang1.id == "nilai_sidang1_peng2") {
                                        document.getElementById('nilai_sidang1_peng2').innerHTML = c2NilaiPeng2Sidang1.nilai
                                    }
                                });
                            }
                        });

                        //proses
                        nrpProsesSidang1 = nrp + "Proses1";

                        var nilaiPemb1DataRef = firebase.database().ref('nilai_pemb1/').child(nrpProsesSidang1);
                        nilaiPemb1DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPemb1ProsesSidang1 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPemb1ProsesSidang1.id,
                                        'nilai': c2NilaiPemb1ProsesSidang1.nilai
                                    };

                                    if (c2NilaiPemb1ProsesSidang1.id == "NP1IN1") {
                                        document.getElementById('nilai1ProsesSidang1_pemb1').innerHTML = c2NilaiPemb1ProsesSidang1.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang1.id == "NP1IN2") {
                                        document.getElementById('nilai2ProsesSidang1_pemb1').innerHTML = c2NilaiPemb1ProsesSidang1.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang1.id == "NP1IN3") {
                                        document.getElementById('nilai3ProsesSidang1_pemb1').innerHTML = c2NilaiPemb1ProsesSidang1.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang1.id == "NP1IN4") {
                                        document.getElementById('nilai4ProsesSidang1_pemb1').innerHTML = c2NilaiPemb1ProsesSidang1.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang1.id == "NP1IN5") {
                                        document.getElementById('nilai5ProsesSidang1_pemb1').innerHTML = c2NilaiPemb1ProsesSidang1.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang1.id == "nilai_proses_sidang1_pemb1") {
                                        document.getElementById('nilai_proses_sidang1_pemb1').innerHTML = c2NilaiPemb1ProsesSidang1.nilai
                                    }
                                });
                            }
                        });

                        var nilaiPemb2DataRef = firebase.database().ref('nilai_pemb2/').child(nrpProsesSidang1);
                        nilaiPemb2DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPemb2ProsesSidang1 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPemb2ProsesSidang1.id,
                                        'nilai': c2NilaiPemb2ProsesSidang1.nilai
                                    };

                                    if (c2NilaiPemb2ProsesSidang1.id == "NP1IN1") {
                                        document.getElementById('nilai1ProsesSidang1_pemb2').innerHTML = c2NilaiPemb2ProsesSidang1.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang1.id == "NP1IN2") {
                                        document.getElementById('nilai2ProsesSidang1_pemb2').innerHTML = c2NilaiPemb2ProsesSidang1.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang1.id == "NP1IN3") {
                                        document.getElementById('nilai3ProsesSidang1_pemb2').innerHTML = c2NilaiPemb2ProsesSidang1.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang1.id == "NP1IN4") {
                                        document.getElementById('nilai4ProsesSidang1_pemb2').innerHTML = c2NilaiPemb2ProsesSidang1.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang1.id == "NP1IN5") {
                                        document.getElementById('nilai5ProsesSidang1_pemb2').innerHTML = c2NilaiPemb2ProsesSidang1.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang1.id == "nilai_proses_sidang1_pemb2") {
                                        document.getElementById('nilai_proses_sidang1_pemb2').innerHTML = c2NilaiPemb2ProsesSidang1.nilai
                                    }

                                });
                            }
                        });

                    }
                    if (c2Sidang.sidangName == "Sidang 2") {
                        //sidang
                        nrpSidang2 = nrp + "Sidang2";
                        var nilaiPemb1DataRef = firebase.database().ref('nilai_pemb1/').child(nrpSidang2);
                        nilaiPemb1DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPemb1Sidang2 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPemb1Sidang2.id,
                                        'nilai': c2NilaiPemb1Sidang2.nilai
                                    };

                                    if (c2NilaiPemb1Sidang2.id == "SD2GK1") {
                                        document.getElementById('nilai_SD2GK1_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2GK2") {
                                        document.getElementById('nilai_SD2GK2_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2GK3") {
                                        document.getElementById('nilai_SD2GK3_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2GK4") {
                                        document.getElementById('nilai_SD2GK4_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2GP1") {
                                        document.getElementById('nilai_SD2GP1_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2GP2") {
                                        document.getElementById('nilai_SD2GP2_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2GP3") {
                                        document.getElementById('nilai_SD2GP3_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2GP4") {
                                        document.getElementById('nilai_SD2GP4_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2GP5") {
                                        document.getElementById('nilai_SD2GP5_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2GP6") {
                                        document.getElementById('nilai_SD2GP6_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2GP7") {
                                        document.getElementById('nilai_SD2GP7_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2GP8") {
                                        document.getElementById('nilai_SD2GP8_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2LJ1") {
                                        document.getElementById('nilai_SD2LJ1_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2LJ2") {
                                        document.getElementById('nilai_SD2LJ2_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2LJ3") {
                                        document.getElementById('nilai_SD2LJ3_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2PD1") {
                                        document.getElementById('nilai_SD2PD1_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2PD2") {
                                        document.getElementById('nilai_SD2PD2_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2PD3") {
                                        document.getElementById('nilai_SD2PD3_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2PD4") {
                                        document.getElementById('nilai_SD2PD4_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2PD5") {
                                        document.getElementById('nilai_SD2PD5_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2PD6") {
                                        document.getElementById('nilai_SD2PD6_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2PD7") {
                                        document.getElementById('nilai_SD2PD7_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2PP1") {
                                        document.getElementById('nilai_SD2PP1_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2PP2") {
                                        document.getElementById('nilai_SD2PP2_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "SD2PP3") {
                                        document.getElementById('nilai_SD2PP3_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                    if (c2NilaiPemb1Sidang2.id == "nilai_sidang2_pemb1") {
                                        document.getElementById('nilai_sidang2_pemb1').innerHTML = c2NilaiPemb1Sidang2.nilai
                                    }
                                });
                            }
                        });

                        var nilaiPeng1DataRef = firebase.database().ref('nilai_peng1/').child(nrpSidang2);
                        nilaiPeng1DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPeng1Sidang2 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPeng1Sidang2.id,
                                        'nilai': c2NilaiPeng1Sidang2.nilai
                                    };

                                    if (c2NilaiPeng1Sidang2.id == "SD2GK1") {
                                        document.getElementById('nilai_SD2GK1_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2GK2") {
                                        document.getElementById('nilai_SD2GK2_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2GK3") {
                                        document.getElementById('nilai_SD2GK3_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2GK4") {
                                        document.getElementById('nilai_SD2GK4_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2GP1") {
                                        document.getElementById('nilai_SD2GP1_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2GP2") {
                                        document.getElementById('nilai_SD2GP2_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2GP3") {
                                        document.getElementById('nilai_SD2GP3_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2GP4") {
                                        document.getElementById('nilai_SD2GP4_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2GP5") {
                                        document.getElementById('nilai_SD2GP5_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2GP6") {
                                        document.getElementById('nilai_SD2GP6_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2GP7") {
                                        document.getElementById('nilai_SD2GP7_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2GP8") {
                                        document.getElementById('nilai_SD2GP8_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2LJ1") {
                                        document.getElementById('nilai_SD2LJ1_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2LJ2") {
                                        document.getElementById('nilai_SD2LJ2_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2LJ3") {
                                        document.getElementById('nilai_SD2LJ3_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2PD1") {
                                        document.getElementById('nilai_SD2PD1_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2PD2") {
                                        document.getElementById('nilai_SD2PD2_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2PD3") {
                                        document.getElementById('nilai_SD2PD3_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2PD4") {
                                        document.getElementById('nilai_SD2PD4_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2PD5") {
                                        document.getElementById('nilai_SD2PD5_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2PD6") {
                                        document.getElementById('nilai_SD2PD6_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2PD7") {
                                        document.getElementById('nilai_SD2PD7_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2PP1") {
                                        document.getElementById('nilai_SD2PP1_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2PP2") {
                                        document.getElementById('nilai_SD2PP2_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "SD2PP3") {
                                        document.getElementById('nilai_SD2PP3_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                    if (c2NilaiPeng1Sidang2.id == "nilai_sidang2_peng1") {
                                        document.getElementById('nilai_sidang2_peng1').innerHTML = c2NilaiPeng1Sidang2.nilai
                                    }
                                });
                            }
                        });

                        var nilaiPeng2DataRef = firebase.database().ref('nilai_peng2/').child(nrpSidang2);
                        nilaiPeng2DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPeng2Sidang2 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPeng2Sidang2.id,
                                        'nilai': c2NilaiPeng2Sidang2.nilai
                                    };

                                    if (c2NilaiPeng2Sidang2.id == "SD2GK1") {
                                        document.getElementById('nilai_SD2GK1_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2GK2") {
                                        document.getElementById('nilai_SD2GK2_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2GK3") {
                                        document.getElementById('nilai_SD2GK3_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2GK4") {
                                        document.getElementById('nilai_SD2GK4_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2GP1") {
                                        document.getElementById('nilai_SD2GP1_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2GP2") {
                                        document.getElementById('nilai_SD2GP2_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2GP3") {
                                        document.getElementById('nilai_SD2GP3_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2GP4") {
                                        document.getElementById('nilai_SD2GP4_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2GP5") {
                                        document.getElementById('nilai_SD2GP5_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2GP6") {
                                        document.getElementById('nilai_SD2GP6_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2GP7") {
                                        document.getElementById('nilai_SD2GP7_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2GP8") {
                                        document.getElementById('nilai_SD2GP8_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2LJ1") {
                                        document.getElementById('nilai_SD2LJ1_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2LJ2") {
                                        document.getElementById('nilai_SD2LJ2_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2LJ3") {
                                        document.getElementById('nilai_SD2LJ3_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2PD1") {
                                        document.getElementById('nilai_SD2PD1_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2PD2") {
                                        document.getElementById('nilai_SD2PD2_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2PD3") {
                                        document.getElementById('nilai_SD2PD3_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2PD4") {
                                        document.getElementById('nilai_SD2PD4_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2PD5") {
                                        document.getElementById('nilai_SD2PD5_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2PD6") {
                                        document.getElementById('nilai_SD2PD6_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2PD7") {
                                        document.getElementById('nilai_SD2PD7_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2PP1") {
                                        document.getElementById('nilai_SD2PP1_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2PP2") {
                                        document.getElementById('nilai_SD2PP2_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "SD2PP3") {
                                        document.getElementById('nilai_SD2PP3_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                    if (c2NilaiPeng2Sidang2.id == "nilai_sidang2_peng2") {
                                        document.getElementById('nilai_sidang2_peng2').innerHTML = c2NilaiPeng2Sidang2.nilai
                                    }
                                });
                            }
                        });

                        //proses
                        nrpProsesSidang2 = nrp + "Proses2";

                        var nilaiPemb1DataRef = firebase.database().ref('nilai_pemb1/').child(nrpProsesSidang2);
                        nilaiPemb1DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPemb1ProsesSidang2 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPemb1ProsesSidang2.id,
                                        'nilai': c2NilaiPemb1ProsesSidang2.nilai
                                    };

                                    if (c2NilaiPemb1ProsesSidang2.id == "NP2IN1") {
                                        document.getElementById('nilai1ProsesSidang2_pemb1').innerHTML = c2NilaiPemb1ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang2.id == "NP2IN2") {
                                        document.getElementById('nilai2ProsesSidang2_pemb1').innerHTML = c2NilaiPemb1ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang2.id == "NP2IN3") {
                                        document.getElementById('nilai3ProsesSidang2_pemb1').innerHTML = c2NilaiPemb1ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang2.id == "NP2IN4") {
                                        document.getElementById('nilai4ProsesSidang2_pemb1').innerHTML = c2NilaiPemb1ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang2.id == "NP2IN5") {
                                        document.getElementById('nilai5ProsesSidang2_pemb1').innerHTML = c2NilaiPemb1ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang2.id == "NP2IN6") {
                                        document.getElementById('nilai6ProsesSidang2_pemb1').innerHTML = c2NilaiPemb1ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang2.id == "NP2IN7") {
                                        document.getElementById('nilai7ProsesSidang2_pemb1').innerHTML = c2NilaiPemb1ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang2.id == "NP2IN8") {
                                        document.getElementById('nilai8ProsesSidang2_pemb1').innerHTML = c2NilaiPemb1ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang2.id == "nilai_proses_sidang2_pemb1") {
                                        document.getElementById('nilai_proses_sidang2_pemb1').innerHTML = c2NilaiPemb1ProsesSidang2.nilai
                                    }
                                });
                            }
                        });

                        var nilaiPemb2DataRef = firebase.database().ref('nilai_pemb2/').child(nrpProsesSidang2);
                        nilaiPemb2DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPemb2ProsesSidang2 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPemb2ProsesSidang2.id,
                                        'nilai': c2NilaiPemb2ProsesSidang2.nilai
                                    };

                                    if (c2NilaiPemb2ProsesSidang2.id == "NP2IN1") {
                                        document.getElementById('nilai1ProsesSidang2_pemb2').innerHTML = c2NilaiPemb2ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang2.id == "NP2IN2") {
                                        document.getElementById('nilai2ProsesSidang2_pemb2').innerHTML = c2NilaiPemb2ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang2.id == "NP2IN3") {
                                        document.getElementById('nilai3ProsesSidang2_pemb2').innerHTML = c2NilaiPemb2ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang2.id == "NP2IN4") {
                                        document.getElementById('nilai4ProsesSidang2_pemb2').innerHTML = c2NilaiPemb2ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang2.id == "NP2IN5") {
                                        document.getElementById('nilai5ProsesSidang2_pemb2').innerHTML = c2NilaiPemb2ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang2.id == "NP2IN6") {
                                        document.getElementById('nilai6ProsesSidang2_pemb2').innerHTML = c2NilaiPemb2ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang2.id == "NP2IN7") {
                                        document.getElementById('nilai7ProsesSidang2_pemb2').innerHTML = c2NilaiPemb2ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang2.id == "NP2IN8") {
                                        document.getElementById('nilai8ProsesSidang2_pemb2').innerHTML = c2NilaiPemb2ProsesSidang2.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang2.id == "nilai_proses_sidang2_pemb2") {
                                        document.getElementById('nilai_proses_sidang2_pemb2').innerHTML = c2NilaiPemb2ProsesSidang2.nilai
                                    }

                                });
                            }
                        });


                    }
                    if (c2Sidang.sidangName == "Sidang 3") {

                        //sidang
                        nrpSidang3 = nrp + "Sidang3";
                        var nilaiPemb1DataRef = firebase.database().ref('nilai_pemb1/').child(nrpSidang3);
                        nilaiPemb1DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPemb1Sidang3 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPemb1Sidang3.id,
                                        'nilai': c2NilaiPemb1Sidang3.nilai
                                    };

                                    if (c2NilaiPemb1Sidang3.id == "SD3MP1") {
                                        document.getElementById('nilai_SD3MP1_pemb1').innerHTML = c2NilaiPemb1Sidang3.nilai
                                    }
                                    if (c2NilaiPemb1Sidang3.id == "SD3MP2") {
                                        document.getElementById('nilai_SD3MP2_pemb1').innerHTML = c2NilaiPemb1Sidang3.nilai
                                    }
                                    if (c2NilaiPemb1Sidang3.id == "SD3MJ1") {
                                        document.getElementById('nilai_SD3MJ1_pemb1').innerHTML = c2NilaiPemb1Sidang3.nilai
                                    }
                                    if (c2NilaiPemb1Sidang3.id == "SD3MJ2") {
                                        document.getElementById('nilai_SD3MJ2_pemb1').innerHTML = c2NilaiPemb1Sidang3.nilai
                                    }
                                    if (c2NilaiPemb1Sidang3.id == "SD3MJ3") {
                                        document.getElementById('nilai_SD3MJ3_pemb1').innerHTML = c2NilaiPemb1Sidang3.nilai
                                    }
                                    if (c2NilaiPemb1Sidang3.id == "SD3MJ4") {
                                        document.getElementById('nilai_SD3MJ4_pemb1').innerHTML = c2NilaiPemb1Sidang3.nilai
                                    }
                                    if (c2NilaiPemb1Sidang3.id == "SD3MJ5") {
                                        document.getElementById('nilai_SD3MJ5_pemb1').innerHTML = c2NilaiPemb1Sidang3.nilai
                                    }
                                    if (c2NilaiPemb1Sidang3.id == "nilai_sidang3_pemb1") {
                                        document.getElementById('nilai_sidang3_pemb1').innerHTML = c2NilaiPemb1Sidang3.nilai
                                    }

                                });
                            }
                        });

                        var nilaiPeng1DataRef = firebase.database().ref('nilai_peng1/').child(nrpSidang3);
                        nilaiPeng1DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPeng1Sidang3 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPeng1Sidang3.id,
                                        'nilai': c2NilaiPeng1Sidang3.nilai
                                    };
                                    if (c2NilaiPeng1Sidang3.id == "SD3MP1") {
                                        document.getElementById('nilai_SD3MP1_peng1').innerHTML = c2NilaiPeng1Sidang3.nilai
                                    }
                                    if (c2NilaiPeng1Sidang3.id == "SD3MP2") {
                                        document.getElementById('nilai_SD3MP2_peng1').innerHTML = c2NilaiPeng1Sidang3.nilai
                                    }
                                    if (c2NilaiPeng1Sidang3.id == "SD3MJ1") {
                                        document.getElementById('nilai_SD3MJ1_peng1').innerHTML = c2NilaiPeng1Sidang3.nilai
                                    }
                                    if (c2NilaiPeng1Sidang3.id == "SD3MJ2") {
                                        document.getElementById('nilai_SD3MJ2_peng1').innerHTML = c2NilaiPeng1Sidang3.nilai
                                    }
                                    if (c2NilaiPeng1Sidang3.id == "SD3MJ3") {
                                        document.getElementById('nilai_SD3MJ3_peng1').innerHTML = c2NilaiPeng1Sidang3.nilai
                                    }
                                    if (c2NilaiPeng1Sidang3.id == "SD3MJ4") {
                                        document.getElementById('nilai_SD3MJ4_peng1').innerHTML = c2NilaiPeng1Sidang3.nilai
                                    }
                                    if (c2NilaiPeng1Sidang3.id == "SD3MJ5") {
                                        document.getElementById('nilai_SD3MJ5_peng1').innerHTML = c2NilaiPeng1Sidang3.nilai
                                    }
                                    if (c2NilaiPeng1Sidang3.id == "nilai_sidang3_peng1") {
                                        document.getElementById('nilai_sidang3_peng1').innerHTML = c2NilaiPeng1Sidang3.nilai
                                    }

                                });
                            }
                        });

                        var nilaiPeng2DataRef = firebase.database().ref('nilai_peng2/').child(nrpSidang3);
                        nilaiPeng2DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPeng2Sidang3 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPeng2Sidang3.id,
                                        'nilai': c2NilaiPeng2Sidang3.nilai
                                    };

                                    if (c2NilaiPeng2Sidang3.id == "SD3MP1") {
                                        document.getElementById('nilai_SD3MP1_peng2').innerHTML = c2NilaiPeng2Sidang3.nilai
                                    }
                                    if (c2NilaiPeng2Sidang3.id == "SD3MP2") {
                                        document.getElementById('nilai_SD3MP2_peng2').innerHTML = c2NilaiPeng2Sidang3.nilai
                                    }
                                    if (c2NilaiPeng2Sidang3.id == "SD3MJ1") {
                                        document.getElementById('nilai_SD3MJ1_peng2').innerHTML = c2NilaiPeng2Sidang3.nilai
                                    }
                                    if (c2NilaiPeng2Sidang3.id == "SD3MJ2") {
                                        document.getElementById('nilai_SD3MJ2_peng2').innerHTML = c2NilaiPeng2Sidang3.nilai
                                    }
                                    if (c2NilaiPeng2Sidang3.id == "SD3MJ3") {
                                        document.getElementById('nilai_SD3MJ3_peng2').innerHTML = c2NilaiPeng2Sidang3.nilai
                                    }
                                    if (c2NilaiPeng2Sidang3.id == "SD3MJ4") {
                                        document.getElementById('nilai_SD3MJ4_peng2').innerHTML = c2NilaiPeng2Sidang3.nilai
                                    }
                                    if (c2NilaiPeng2Sidang3.id == "SD3MJ5") {
                                        document.getElementById('nilai_SD3MJ5_peng2').innerHTML = c2NilaiPeng2Sidang3.nilai
                                    }
                                    if (c2NilaiPeng2Sidang3.id == "nilai_sidang3_peng2") {
                                        document.getElementById('nilai_sidang3_peng2').innerHTML = c2NilaiPeng2Sidang3.nilai
                                    }

                                });
                            }
                        });

                        //proses
                        nrpProsesSidang3 = nrp + "Proses3";

                        var nilaiPemb1DataRef = firebase.database().ref('nilai_pemb1/').child(nrpProsesSidang3);
                        nilaiPemb1DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPemb1ProsesSidang3 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPemb1ProsesSidang3.id,
                                        'nilai': c2NilaiPemb1ProsesSidang3.nilai
                                    };

                                    if (c2NilaiPemb1ProsesSidang3.id == "NP3IN1") {
                                        document.getElementById('nilai1ProsesSidang3_pemb1').innerHTML = c2NilaiPemb1ProsesSidang3.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang3.id == "NP3IN2") {
                                        document.getElementById('nilai2ProsesSidang3_pemb1').innerHTML = c2NilaiPemb1ProsesSidang3.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang3.id == "NP3IN3") {
                                        document.getElementById('nilai3ProsesSidang3_pemb1').innerHTML = c2NilaiPemb1ProsesSidang3.nilai
                                    }
                                    if (c2NilaiPemb1ProsesSidang3.id == "nilai_proses_sidang3_pemb1") {
                                        document.getElementById('nilai_proses_sidang3_pemb1').innerHTML = c2NilaiPemb1ProsesSidang3.nilai
                                    }
                                });
                            }
                        });

                        var nilaiPemb2DataRef = firebase.database().ref('nilai_pemb2/').child(nrpProsesSidang3);
                        nilaiPemb2DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPemb2ProsesSidang3 = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPemb2ProsesSidang3.id,
                                        'nilai': c2NilaiPemb2ProsesSidang3.nilai
                                    };

                                    if (c2NilaiPemb2ProsesSidang3.id == "NP3IN1") {
                                        document.getElementById('nilai1ProsesSidang3_pemb2').innerHTML = c2NilaiPemb2ProsesSidang3.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang3.id == "NP3IN2") {
                                        document.getElementById('nilai2ProsesSidang3_pemb2').innerHTML = c2NilaiPemb2ProsesSidang3.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang3.id == "NP3IN3") {
                                        document.getElementById('nilai3ProsesSidang3_pemb2').innerHTML = c2NilaiPemb2ProsesSidang3.nilai
                                    }
                                    if (c2NilaiPemb2ProsesSidang3.id == "nilai_proses_sidang3_pemb2") {
                                        document.getElementById('nilai_proses_sidang3_pemb2').innerHTML = c2NilaiPemb2ProsesSidang3.nilai
                                    }
                                });
                            }
                        });

                        //produk
                        nrpNProduk = nrp + "NProduk";
                        var nilaiPemb1DataRef = firebase.database().ref('nilai_pemb1/').child(nrpNProduk);
                        nilaiPemb1DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPemb1Produk = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPemb1Produk.id,
                                        'nilai': c2NilaiPemb1Produk.nilai
                                    };

                                    if (c2NilaiPemb1Produk.id == "PTAGK1") {
                                        document.getElementById('nilai_PTAGK1_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAGK2") {
                                        document.getElementById('nilai_PTAGK2_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAGK3") {
                                        document.getElementById('nilai_PTAGK3_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAGK4") {
                                        document.getElementById('nilai_PTAGK4_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAGP1") {
                                        document.getElementById('nilai_PTAGP1_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAGP2") {
                                        document.getElementById('nilai_PTAGP2_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAGP3") {
                                        document.getElementById('nilai_PTAGP3_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAGP4") {
                                        document.getElementById('nilai_PTAGP4_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAGP5") {
                                        document.getElementById('nilai_PTAGP5_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAGP6") {
                                        document.getElementById('nilai_PTAGP6_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAGP7") {
                                        document.getElementById('nilai_PTAGP7_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAGP8") {
                                        document.getElementById('nilai_PTAGP8_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTALJ1") {
                                        document.getElementById('nilai_PTALJ1_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTALJ2") {
                                        document.getElementById('nilai_PTALJ2_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAMB1") {
                                        document.getElementById('nilai_PTAMB1_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAMB2") {
                                        document.getElementById('nilai_PTAMB2_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "PTAMB3") {
                                        document.getElementById('nilai_PTAMB3_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }
                                    if (c2NilaiPemb1Produk.id == "nilai_produk_pemb1") {
                                        document.getElementById('nilai_produk_pemb1').innerHTML = c2NilaiPemb1Produk.nilai
                                    }

                                });
                            }
                        });

                        var nilaiPemb2DataRef = firebase.database().ref('nilai_pemb2/').child(nrpNProduk);
                        nilaiPemb2DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPemb2Produk = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPemb2Produk.id,
                                        'nilai': c2NilaiPemb2Produk.nilai
                                    };

                                    if (c2NilaiPemb2Produk.id == "PTAGK1") {
                                        document.getElementById('nilai_PTAGK1_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAGK2") {
                                        document.getElementById('nilai_PTAGK2_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAGK3") {
                                        document.getElementById('nilai_PTAGK3_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAGK4") {
                                        document.getElementById('nilai_PTAGK4_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAGP1") {
                                        document.getElementById('nilai_PTAGP1_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAGP2") {
                                        document.getElementById('nilai_PTAGP2_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAGP3") {
                                        document.getElementById('nilai_PTAGP3_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAGP4") {
                                        document.getElementById('nilai_PTAGP4_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAGP5") {
                                        document.getElementById('nilai_PTAGP5_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAGP6") {
                                        document.getElementById('nilai_PTAGP6_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAGP7") {
                                        document.getElementById('nilai_PTAGP7_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAGP8") {
                                        document.getElementById('nilai_PTAGP8_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTALJ1") {
                                        document.getElementById('nilai_PTALJ1_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTALJ2") {
                                        document.getElementById('nilai_PTALJ2_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAMB1") {
                                        document.getElementById('nilai_PTAMB1_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAMB2") {
                                        document.getElementById('nilai_PTAMB2_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "PTAMB3") {
                                        document.getElementById('nilai_PTAMB3_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                    if (c2NilaiPemb2Produk.id == "nilai_produk_pemb2") {
                                        document.getElementById('nilai_produk_pemb2').innerHTML = c2NilaiPemb2Produk.nilai
                                    }
                                });
                            }
                        });

                        var nilaiPeng1DataRef = firebase.database().ref('nilai_peng1/').child(nrpNProduk);
                        nilaiPeng1DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPeng1Produk = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPeng1Produk.id,
                                        'nilai': c2NilaiPeng1Produk.nilai
                                    };

                                    if (c2NilaiPeng1Produk.id == "PTAGK1") {
                                        document.getElementById('nilai_PTAGK1_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAGK2") {
                                        document.getElementById('nilai_PTAGK2_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAGK3") {
                                        document.getElementById('nilai_PTAGK3_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAGK4") {
                                        document.getElementById('nilai_PTAGK4_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAGP1") {
                                        document.getElementById('nilai_PTAGP1_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAGP2") {
                                        document.getElementById('nilai_PTAGP2_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAGP3") {
                                        document.getElementById('nilai_PTAGP3_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAGP4") {
                                        document.getElementById('nilai_PTAGP4_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAGP5") {
                                        document.getElementById('nilai_PTAGP5_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAGP6") {
                                        document.getElementById('nilai_PTAGP6_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAGP7") {
                                        document.getElementById('nilai_PTAGP7_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAGP8") {
                                        document.getElementById('nilai_PTAGP8_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTALJ1") {
                                        document.getElementById('nilai_PTALJ1_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTALJ2") {
                                        document.getElementById('nilai_PTALJ2_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAMB1") {
                                        document.getElementById('nilai_PTAMB1_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAMB2") {
                                        document.getElementById('nilai_PTAMB2_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "PTAMB3") {
                                        document.getElementById('nilai_PTAMB3_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                    if (c2NilaiPeng1Produk.id == "nilai_produk_peng1") {
                                        document.getElementById('nilai_produk_peng1').innerHTML = c2NilaiPeng1Produk.nilai
                                    }
                                });
                            }
                        });

                        var nilaiPeng2DataRef = firebase.database().ref('nilai_peng2/').child(nrpNProduk);
                        nilaiPeng2DataRef.on('value', function (snap) {
                            if (snap.exists()) {
                                snap.forEach(function (childSnap) {
                                    var c2NilaiPeng2Produk = childSnap.val();
                                    objNilai = {
                                        'id_nilai': c2NilaiPeng2Produk.id,
                                        'nilai': c2NilaiPeng2Produk.nilai
                                    };

                                    if (c2NilaiPeng2Produk.id == "PTAGK1") {
                                        document.getElementById('nilai_PTAGK1_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAGK2") {
                                        document.getElementById('nilai_PTAGK2_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAGK3") {
                                        document.getElementById('nilai_PTAGK3_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAGK4") {
                                        document.getElementById('nilai_PTAGK4_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAGP1") {
                                        document.getElementById('nilai_PTAGP1_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAGP2") {
                                        document.getElementById('nilai_PTAGP2_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAGP3") {
                                        document.getElementById('nilai_PTAGP3_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAGP4") {
                                        document.getElementById('nilai_PTAGP4_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAGP5") {
                                        document.getElementById('nilai_PTAGP5_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAGP6") {
                                        document.getElementById('nilai_PTAGP6_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAGP7") {
                                        document.getElementById('nilai_PTAGP7_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAGP8") {
                                        document.getElementById('nilai_PTAGP8_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTALJ1") {
                                        document.getElementById('nilai_PTALJ1_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTALJ2") {
                                        document.getElementById('nilai_PTALJ2_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAMB1") {
                                        document.getElementById('nilai_PTAMB1_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAMB2") {
                                        document.getElementById('nilai_PTAMB2_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "PTAMB3") {
                                        document.getElementById('nilai_PTAMB3_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                    if (c2NilaiPeng2Produk.id == "nilai_produk_peng2") {
                                        document.getElementById('nilai_produk_peng2').innerHTML = c2NilaiPeng2Produk.nilai
                                    }
                                });
                            }
                        });


                    }

                    if (gTopikId == c2Sidang.idTopik) {
                        
                            document.getElementById('nilaiTotalSidang1').innerHTML = c2Sidang.totalSidang1;
                            document.getElementById('nilaiTotalProsesSidang1').innerHTML = c2Sidang.totalProsesSidang1;
                            document.getElementById('nilaiTotalSidang2').innerHTML = c2Sidang.totalSidang2;
                            document.getElementById('nilaiTotalProsesSidang2').innerHTML = c2Sidang.totalProsesSidang2;
                            document.getElementById('nilaiTotalSidang3').innerHTML = c2Sidang.totalSidang3;
                            document.getElementById('nilaiTotalProsesSidang3').innerHTML = c2Sidang.totalProsesSidang3;
                            document.getElementById('nilaiTotalProduk').innerHTML = c2Sidang.totalProduk;
//                        if (c2Sidang.sidangName == "Sidang 1") {
//                            //TOTAL
//                            document.getElementById('nilaiTotalSidang1').innerHTML = c2Sidang.totalSidang1;
//                            document.getElementById('nilaiTotalProsesSidang1').innerHTML = c2Sidang.totalProsesSidang1;
//                            document.getElementById('nilaiTotalSidang2').innerHTML = c2Sidang.totalSidang2;
//                            document.getElementById('nilaiTotalProsesSidang2').innerHTML = c2Sidang.totalProsesSidang2;
//                            document.getElementById('nilaiTotalSidang3').innerHTML = c2Sidang.totalSidang3;
//                            document.getElementById('nilaiTotalProsesSidang3').innerHTML = c2Sidang.totalProsesSidang3;
//                            document.getElementById('nilaiTotalProduk').innerHTML = c2Sidang.totalProduk;
//                            
//
//                        }
//                        if (c2Sidang.sidangName == "Sidang 2") {
//                            //TOTAL
//                            document.getElementById('nilaiTotalSidang2').innerHTML = c2Sidang.totalSidang2;
//                            document.getElementById('nilaiTotalProsesSidang2').innerHTML = c2Sidang.totalProsesSidang2;
//
//
//                        }
//                        if (c2Sidang.sidangName == "Sidang 3") {
//                            //TOTAL
//                            document.getElementById('nilaiTotalSidang3').innerHTML = c2Sidang.totalSidang3;
//                            document.getElementById('nilaiTotalProsesSidang3').innerHTML = c2Sidang.totalProsesSidang3;
//                            document.getElementById('nilaiTotalProduk').innerHTML = c2Sidang.totalProduk;
//                        }
                    }
                    
                    


                });
            }
        });
    });
}
