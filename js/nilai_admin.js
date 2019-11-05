
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
                        'nilaiTA': c2.nilaiTA
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
    var topikDataRef = firebase.database().ref('topik/').child(tahun_ajaranGlobal).child(tempKeyTopik);
    topikDataRef.on('value', function (snap) {
        objTopik = [];
        if (snap.exists()) {
            var objTopik = snap.val();
            var gTopikId = objTopik.id;
            var gTopikMahasiswaNrp = objTopik.mahasiswa.nrp;
            var gTopikMahasiswaName = objTopik.mahasiswa.name;
            var gTopikJudulTopik = objTopik.judul_topik;
        }
        var sidangDataRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal);
        var ketemu = 0;
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
                        'dosen_penguji2': c2Sidang.dosen_penguji2
                    };
                    //alert(c2Sidang.idTopik+"-"+gTopikId);


                    document.getElementById('nilaiMahasiswaNrp').innerHTML = gTopikMahasiswaNrp;
                    document.getElementById('nilaiMahasiswaName').innerHTML = gTopikMahasiswaName;
                    document.getElementById('nilaiJudulTopik').innerHTML = gTopikJudulTopik;

                    if (c2Sidang.idTopik === gTopikId && ketemu == 0) {
                        ketemu = 1;

                        if (c2Sidang.sidangName == "Sidang 1") {
                            var totalProsesSidang1 = c2Sidang.totalProsesSidang1;
                            var totalSidang1 = c2Sidang.totalSidang1;

                            nrpSidang1 = nrp + "Sidang1";
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

                            var nilaiPemb2DataRef = firebase.database().ref('nilai_pemb2/').child(nrpSidang1);
                            nilaiPemb2DataRef.on('value', function (snap) {
                                if (snap.exists()) {
                                    snap.forEach(function (childSnap) {
                                        var c2NilaiPemb2Sidang1 = childSnap.val();
                                        objNilai = {
                                            'id_nilai': c2NilaiPemb2Sidang1.id,
                                            'nilai': c2NilaiPemb2Sidang1.nilai
                                        };

                                        if (c2NilaiPemb2Sidang1.id == "SD1RP1") {
                                            document.getElementById('nilai_SD1RP1_pemb2').innerHTML = c2NilaiPemb2Sidang1.nilai
                                        }
                                        if (c2NilaiPemb2Sidang1.id == "SD1PD1") {
                                            document.getElementById('nilai_SD1PD1_pemb2').innerHTML = c2NilaiPemb2Sidang1.nilai
                                        }
                                        if (c2NilaiPemb2Sidang1.id == "SD1PD2") {
                                            document.getElementById('nilai_SD1PD2_pemb2').innerHTML = c2NilaiPemb2Sidang1.nilai
                                        }
                                        if (c2NilaiPemb2Sidang1.id == "SD1AM1") {
                                            document.getElementById('nilai_SD1AM1_pemb2').innerHTML = c2NilaiPemb2Sidang1.nilai
                                        }
                                        if (c2NilaiPemb2Sidang1.id == "SD1AM2") {
                                            document.getElementById('nilai_SD1AM2_pemb2').innerHTML = c2NilaiPemb2Sidang1.nilai
                                        }
                                        if (c2NilaiPemb2Sidang1.id == "SD1AM3") {
                                            document.getElementById('nilai_SD1AM3_pemb2').innerHTML = c2NilaiPemb2Sidang1.nilai
                                        }
                                        if (c2NilaiPemb2Sidang1.id == "SD1AM4") {
                                            document.getElementById('nilai_SD1AM4_pemb2').innerHTML = c2NilaiPemb2Sidang1.nilai
                                        }
                                        if (c2NilaiPemb2Sidang1.id == "SD1AM5") {
                                            document.getElementById('nilai_SD1AM5_pemb2').innerHTML = c2NilaiPemb2Sidang1.nilai
                                        }
                                        if (c2NilaiPemb2Sidang1.id == "SD1AM6") {
                                            document.getElementById('nilai_SD1AM6_pemb2').innerHTML = c2NilaiPemb2Sidang1.nilai
                                        }
                                        if (c2NilaiPemb2Sidang1.id == "SD1PR1") {
                                            document.getElementById('nilai_SD1PR1_pemb2').innerHTML = c2NilaiPemb2Sidang1.nilai
                                        }
                                        if (c2NilaiPemb2Sidang1.id == "SD1PR2") {
                                            document.getElementById('nilai_SD1PR2_pemb2').innerHTML = c2NilaiPemb2Sidang1.nilai
                                        }
                                        if (c2NilaiPemb2Sidang1.id == "nilai_sidang1_pemb2") {
                                            document.getElementById('nilai_sidang1_pemb2').innerHTML = c2NilaiPemb2Sidang1.nilai
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

                            document.getElementById('nilaiTotalSidang1').innerHTML = totalSidang1;


                        } else if (c2Sidang.sidangName == "Sidang 2") {
                            var totalProsesSidang2 = c2Sidang.totalProsesSidang2;
                            var totalSidang2 = c2Sidang.totalSidang2;
                        } else if (c2Sidang.sidangName == "Sidang 3") {
                            var totalProsesSidang3 = c2Sidang.totalProsesSidang3;
                            var totalSidang3 = c2Sidang.totalSidang3;
                            var totalProduk = c2Sidang.totalProduk;
                        }


                    }
                });
            }
        });
    });



}
