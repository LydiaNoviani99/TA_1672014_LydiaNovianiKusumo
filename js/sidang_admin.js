var tahun_ajaranGlobal;
var dosenGlobal;
var filterDosenGlobal;
var nikFilterDosen;
var nameFilterDosen;
var email_dosen;

$(document).ready(function () {

    $('#halaman_nilai').hide();

    initializeNilai();

//    document.getElementById('filterTanggalSidang').valueAsDate = new Date();

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

var DosenDataRef = firebase.database().ref().child('dosen');
DosenDataRef.on('value', function (snap) {
    if (snap.exists()) {
        obj = [];
        snap.forEach(function (childSnap) {
            var c2 = childSnap.val();
//                console.log(c2);
            obj2 = {'nik': c2.nik, 'name': c2.name, 'email': c2.email, 'id_role': c2.id_role, 'nama_role': c2.nama_role};
            obj.push(obj2);
        });
        addComboDosen(obj);
    }
});

function addComboDosen(data) {
    $('#filterDosen').empty();
    $('#filterDosen')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Dosen--"));
    $.each(data, function (key, value) {
        $('#filterDosen')
                .append($("<option></option>")
                        .attr("value", value.nik)
                        .text(value.nik + ' - ' + value.name));
    });
}

function initializeNilai() {
    // Sidang 1
    $('#nilai1Sidang1').val("");
    $('#nilai2aSidang1').val("");
    $('#nilai2bSidang1').val("");
    $('#nilai3aSidang1').val("");
    $('#nilai3bSidang1').val("");
    $('#nilai3cSidang1').val("");
    $('#nilai3dSidang1').val("");
    $('#nilai3eSidang1').val("");
    $('#nilai3fSidang1').val("");
    $('#nilai4aSidang1').val("");
    $('#nilai4bSidang1').val("");

    // Sidang 2
    $('#nilaiA1Sidang2').val("");
    $('#nilaiA2bSidang2').val("");
    $('#nilaiA3Sidang2').val("");
    $('#nilaiA4Sidang2').val("");
    $('#nilaiB1Sidang2').val("");
    $('#nilaiB2Sidang2').val("");
    $('#nilaiB3Sidang2').val("");
    $('#nilaiB4Sidang2').val("");
    $('#nilaiB5Sidang2').val("");
    $('#nilaiB6Sidang2').val("");
    $('#nilaiB7Sidang2').val("");
    $('#nilaiB8Sidang2').val("");
    $('#nilaiC1Sidang2').val("");
    $('#nilaiC2Sidang2').val("");
    $('#nilaiC3Sidang2').val("");
    $('#nilaiD1Sidang2').val("");
    $('#nilaiD2Sidang2').val("");
    $('#nilaiD3Sidang2').val("");
    $('#nilaiE1Sidang2').val("");
    $('#nilaiE2Sidang2').val("");
    $('#nilaiE3Sidang2').val("");
    $('#nilaiE4Sidang2').val("");
    $('#nilaiE5Sidang2').val("");
    $('#nilaiE6Sidang2').val("");
    $('#nilaiE7Sidang2').val("");

    // Sidang 3
    $('#nilaiA1Sidang3').val("");
    $('#nilaiA2bSidang3').val("");
    $('#nilaiB1Sidang3').val("");
    $('#nilaiB2Sidang3').val("");
    $('#nilaiB3Sidang3').val("");
    $('#nilaiB4Sidang3').val("");
    $('#nilaiB5Sidang3').val("");

    // Produk
    $('#nilaiA1Produk').val("");
    $('#nilaiA2bProduk').val("");
    $('#nilaiA3Produk').val("");
    $('#nilaiA4Produk').val("");
    $('#nilaiB1Produk').val("");
    $('#nilaiB2Produk').val("");
    $('#nilaiB3Produk').val("");
    $('#nilaiB4Produk').val("");
    $('#nilaiB5Produk').val("");
    $('#nilaiB6Produk').val("");
    $('#nilaiB7Produk').val("");
    $('#nilaiB8Produk').val("");
    $('#nilaiC1Produk').val("");
    $('#nilaiC2Produk').val("");
    $('#nilaiD1Produk').val("");
    $('#nilaiD2Produk').val("");
    $('#nilaiD3Produk').val("");

    // Proses Sidang 1
    $('#nilai1ProsesSidang1').val("");
    $('#nilai2ProsesSidang1').val("");
    $('#nilai3ProsesSidang1').val("");
    $('#nilai4ProsesSidang1').val("");
    $('#nilai5ProsesSidang1').val("");

    // Proses Sidang 2
    $('#nilai1ProsesSidang2').val("");
    $('#nilai2ProsesSidang2').val("");
    $('#nilai3ProsesSidang2').val("");
    $('#nilai4ProsesSidang2').val("");
    $('#nilai5ProsesSidang2').val("");
    $('#nilai6ProsesSidang2').val("");
    $('#nilai7ProsesSidang2').val("");
    $('#nilai8ProsesSidang2').val("");

    // Proses Sidang 3
    $('#nilai1ProsesSidang3').val("");
    $('#nilai2ProsesSidang3').val("");
    $('#nilai3ProsesSidang3').val("");
}

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

    view_sidang_table_admin();
    view_sidang_table_filter_tanggal_admin()

    $("#filterTahun_Ajaran").change(function () {
        view_sidang_table_admin();
        view_sidang_table_filter_tanggal_admin()
    });

    $("#filterDosen").change(function () {
        view_sidang_table_filter_tanggal_admin();
        view_sidang_table_admin();
    });

    $("#filterTanggalSidang").change(function () {
        view_sidang_table_filter_tanggal_admin()
    });
}

var tanggal_dipilih;

function view_sidang_table_filter_tanggal_admin() {
    var dosenPilih = $('#filterDosen option:selected').val();
    dosenGlobal = dosenPilih;
    $('#viewSidangTableFilterTanggal').DataTable().clear().draw();
    var p_id = $('#filterTahun_Ajaran option:selected').val();
    tanggal_dipilih = $('#filterTanggalSidang').val();
    filterDosenGlobal = $('#filterDosen option:selected').text();
    nikFilterDosen = filterDosenGlobal.substr(0, filterDosenGlobal.indexOf(' -'));
    nameFilterDosen = filterDosenGlobal.substr(filterDosenGlobal.indexOf('- ') + 2);
    $('#viewSidangTableFilterTanggal').DataTable().clear().draw();
    tahun_ajaranGlobal = p_id;

//    alert(tanggal_dipilih)

    if (p_id == "-") {
        $('#viewSidangTable').DataTable().clear().draw();
    } else {
        var dosenDataRef = firebase.database().ref('dosen/');
        dosenDataRef.on('value', function (snap) {});

        var assignSidangDataRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal);
        assignSidangDataRef.on("value", function (snap) {
            if (snap.exists()) {
                objTanggal = [];
                snap.forEach(function (childSnap) {
                    var c21 = childSnap.val();
                    var topikDataRef = firebase.database().ref('topik/' + tahun_ajaranGlobal + '/');
                    topikDataRef.on('value', function (snap) {
                        snap.forEach(function (data) {
                            var c2T = data.val();
                            obj2Tanggal = {
                                'id_topik': c2T.id,
                                'judul2_topik': c2T.judul_topik,
                                'mahasiswa2': c2T.mahasiswa,
                                'dosen_pembimbing1': c2T.dosen_pembimbing1,
                                'dosen_pembimbing2': c2T.dosen_pembimbing2,

                                'idTopik': c21.idTopik,
                                'sidangId': c21.sidangId,
                                'sidangName': c21.sidangName,
                                'tanggal': new Date(c21.tanggal).toDateString(),
                                'jam_mulai': c21.jam_mulai,
                                'ruangan': c21.ruangan,
                                'catatan': c21.catatan,
                                'dosen_penguji1': c21.dosen_penguji1,
                                'dosen_penguji2': c21.dosen_penguji2,

                                'pemb1': c2T.dosen_pembimbing1.name,
                                'pemb2': c2T.dosen_pembimbing2.name,
                                'peng1': c21.dosen_penguji1.name,
                                'peng2': c21.dosen_penguji2.name
                            };
//                            alert(c21.tanggal + " aaaa " + tanggal_dipilih)
                            if (c21.tanggal === tanggal_dipilih) {
                                if (c21.idTopik === c2T.id) {
                                    objTanggal.push(obj2Tanggal);
                                }
                                addViewSidangFilterTanggal(objTanggal);
                            }
//                            if (c21.tanggal === tanggal_dipilih) {
//                                if (c2T.dosen_pembimbing1.nik === nikFilterDosen
//                                        || c2T.dosen_pembimbing2.nik === nikFilterDosen
//                                        || c21.dosen_penguji1.nik === nikFilterDosen
//                                        || c21.dosen_penguji2.nik === nikFilterDosen) {
//
//                                    if (c21.idTopik === c2T.id) {
//                                        objTanggal.push(obj2Tanggal);
//
//                                    }
//                                    addViewSidangFilterTanggal(objTanggal);
//                                }
//                            }
                        });
                    });
                });
            }
        });
    }
}
function addViewSidangFilterTanggal(data) {
    $('#viewSidangTableFilterTanggal').DataTable().clear().draw();
    $('#viewSidangTableFilterTanggal').DataTable().rows.add(data).draw();
}
var obj2AAA;
var ketemuEmailDosenPenguji1 = false;
var emailDosenSemua;
function view_sidang_table_admin() {
    $('#viewSidangTable').DataTable().clear().draw();
    $('#viewSidangTablePemb1').DataTable().clear().draw();
    $('#viewSidangTablePemb2').DataTable().clear().draw();
    $('#viewSidangTablePeng1').DataTable().clear().draw();
    $('#viewSidangTablePeng2').DataTable().clear().draw();
    var dosenPilih = $('#filterDosen option:selected').val();
    dosenGlobal = dosenPilih;
    $('#viewSidangTable').DataTable().clear().draw();
    var p_id = $('#filterTahun_Ajaran option:selected').val();
    $('#viewSidangTable').DataTable().clear().draw();
    filterDosenGlobal = $('#filterDosen option:selected').text();
    nikFilterDosen = filterDosenGlobal.substr(0, filterDosenGlobal.indexOf(' -'));
    nameFilterDosen = filterDosenGlobal.substr(filterDosenGlobal.indexOf('- ') + 2);
    tahun_ajaranGlobal = p_id;

    if (p_id == "-") {
        $('#viewSidangTable').DataTable().clear().draw();
        $('#viewSidangTablePemb1').DataTable().clear().draw();
        $('#viewSidangTablePemb2').DataTable().clear().draw();
        $('#viewSidangTablePeng1').DataTable().clear().draw();
        $('#viewSidangTablePeng2').DataTable().clear().draw();
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
                            obj2AAA = {
                                'id_topik': c2T.id,
                                'judul2_topik': c2T.judul_topik,
                                'mahasiswa2': c2T.mahasiswa,
                                'dosen_pembimbing1': c2T.dosen_pembimbing1,
                                'dosen_pembimbing2': c2T.dosen_pembimbing2,

                                'idTopik': c21.idTopik,
                                'sidangId': c21.sidangId,
                                'sidangName': c21.sidangName,
                                'tanggal': new Date(c21.tanggal),
//                                'tanggal': new Date(c21.tanggal).toDateString(),
                                'jam_mulai': c21.jam_mulai,
                                'ruangan': c21.ruangan,
                                'catatan': c21.catatan,
                                'dosen_penguji1': c21.dosen_penguji1,
                                'dosen_penguji2': c21.dosen_penguji2,

                                'pemb1': c2T.dosen_pembimbing1.name,
                                'pemb2': c2T.dosen_pembimbing2.name,
                                'peng1': c21.dosen_penguji1.name,
                                'peng2': c21.dosen_penguji2.name
                            };
                            if (c2T.dosen_pembimbing1.nik === nikFilterDosen) {
                                if (c21.idTopik === c2T.id) {
                                    obj.push(obj2AAA);

                                }
                                addViewSidangPemb1(obj);
                            } else if (c2T.dosen_pembimbing2.nik === nikFilterDosen) {
                                if (c21.idTopik === c2T.id) {
                                    obj1.push(obj2AAA);

                                }
                                addViewSidangPemb2(obj1);
                            } else if (c21.dosen_penguji1.nik === nikFilterDosen) {
                                if (c21.idTopik === c2T.id) {
                                    obj2.push(obj2AAA);

                                }
                                addViewSidangPeng1(obj2);
                            } else if (c21.dosen_penguji2.nik === nikFilterDosen) {
                                if (c21.idTopik === c2T.id) {
                                    obj3.push(obj2AAA);
                                }
                                addViewSidangPeng2(obj3);
                            }
                        });
                    });
                });
            }
        });
    }
}

function addViewSidangPemb1(data) {
    $('#viewSidangTablePemb1').DataTable().clear().draw();
    $('#viewSidangTablePemb1').DataTable().rows.add(data).draw();
}
function addViewSidangPemb2(data) {
    $('#viewSidangTablePemb2').DataTable().clear().draw();
    $('#viewSidangTablePemb2').DataTable().rows.add(data).draw();
}
function addViewSidangPeng1(data) {
    $('#viewSidangTablePeng1').DataTable().clear().draw();
    $('#viewSidangTablePeng1').DataTable().rows.add(data).draw();
}
function addViewSidangPeng2(data) {
    $('#viewSidangTablePeng2').DataTable().clear().draw();
    $('#viewSidangTablePeng2').DataTable().rows.add(data).draw();
}

var bobot_nilai_sidang1;
var email_dosen_beri_nilai;
function beriNilaiSidang(id, nrp, jenisSidang, idSidang) {
    tempKeyTopik = id;
    $('#halaman_sidang').hide();
    $('#halaman_nilai').show();

    var dosenPilih = $('#filterDosen option:selected').val();
    dosenGlobal = dosenPilih;
    var topikDataRef = firebase.database().ref('topik/').child(tahun_ajaranGlobal).child(tempKeyTopik);
    topikDataRef.on('value', function (snap) {
        objTopik = [];
        if (snap.exists()) {
            var objTopik = snap.val();
            var gTopikId = objTopik.id;
            var gTopikMahasiswaNrp = objTopik.mahasiswa.nrp;
            var gTopikMahasiswaName = objTopik.mahasiswa.name;
            var gTopikJudulTopik = objTopik.judul_topik;
            var gTopikDosenPemb1Nik = objTopik.dosen_pembimbing1.nik;
            var gTopikDosenPemb1Name = objTopik.dosen_pembimbing1.name;
            var gTopikDosenPemb2Nik = objTopik.dosen_pembimbing2.nik;
            var gTopikDosenPemb2Name = objTopik.dosen_pembimbing2.name;
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

                    if (c2Sidang.idTopik === gTopikId && ketemu == 0) {
                        ketemu = 1;
                        var gTopikDosenPeng1Nik = c2Sidang.dosen_penguji1.nik;
                        var gTopikDosenPeng2Nik = c2Sidang.dosen_penguji2.nik;

                        var gTanggalSidang = new Date(c2Sidang.tanggal);
                        var hariIni = new Date();

                        if (gTopikDosenPemb1Nik === dosenGlobal) {
                            if (c2Sidang.idTopik === gTopikId) {
                                document.getElementById('nilaiSidangName').innerHTML = jenisSidang;
                                document.getElementById('nilaiBiodataDosen').innerHTML = gTopikDosenPemb1Nik + " - " + gTopikDosenPemb1Name;
                                document.getElementById('nilaiSebagaiDosen').innerHTML = "Pembimbing 1";
                                document.getElementById('nilaiMahasiswaNrp').innerHTML = gTopikMahasiswaNrp;
                                document.getElementById('nilaiMahasiswaName').innerHTML = gTopikMahasiswaName;
                                document.getElementById('nilaiJudulTopik').innerHTML = gTopikJudulTopik;
                                if (jenisSidang === "Sidang 1") {
                                    $('.nav-tabs li:eq(0) a').tab('show');
                                    $('#nilai_sidang_2').hide();
                                    $('#nilai_proses_2').hide();
                                    $('#nilai_sidang_3').hide();
                                    $('#nilai_proses_3').hide();
                                    $('#nilai_produk').hide();
                                } else if (jenisSidang === "Sidang 2") {
                                    $('.nav-tabs li:eq(1) a').tab('show');
                                    $('#nilai_sidang_1').hide();
                                    $('#nilai_proses_1').hide();
                                    $('#nilai_sidang_3').hide();
                                    $('#nilai_proses_3').hide();
                                    $('#nilai_produk').hide();
                                } else if (jenisSidang === "Sidang 3") {
                                    $('.nav-tabs li:eq(2) a').tab('show');
                                    $('#nilai_sidang_1').hide();
                                    $('#nilai_proses_1').hide();
                                    $('#nilai_sidang_2').hide();
                                    $('#nilai_proses_2').hide();
                                }

                                $("#btnSaveNilaiSidang1").click(function () {
                                    var SD1RP1 = $('#nilai1Sidang1').val();
                                    var SD1PD1 = $('#nilai2aSidang1').val();
                                    var SD1PD2 = $('#nilai2bSidang1').val();
                                    var SD1AM1 = $('#nilai3aSidang1').val();
                                    var SD1AM2 = $('#nilai3bSidang1').val();
                                    var SD1AM3 = $('#nilai3cSidang1').val();
                                    var SD1AM4 = $('#nilai3dSidang1').val();
                                    var SD1AM5 = $('#nilai3eSidang1').val();
                                    var SD1AM6 = $('#nilai3fSidang1').val();
                                    var SD1PR1 = $('#nilai4aSidang1').val();
                                    var SD1PR2 = $('#nilai4bSidang1').val();

                                    if (SD1RP1 !== ''
                                            && SD1PD1 !== '' && SD1PD2 !== ''
                                            && SD1AM1 !== '' && SD1AM2 !== '' && SD1AM3 !== '' && SD1AM4 !== '' && SD1AM5 !== '' && SD1AM6 !== ''
                                            && SD1PR1 !== '' && SD1PR2 !== '') {

                                        nrpSidang = gTopikMahasiswaNrp + "Sidang1";

                                        firebase.database().ref('nilai_pemb1/').child(nrpSidang).set({
                                            SD1RP1: {
                                                id: "SD1RP1",
                                                nilai: SD1RP1
                                            },
                                            SD1PD1: {
                                                id: "SD1PD1",
                                                nilai: SD1PD1
                                            },
                                            SD1PD2: {
                                                id: "SD1PD2",
                                                nilai: SD1PD2
                                            },
                                            SD1AM1: {
                                                id: "SD1AM1",
                                                nilai: SD1AM1
                                            },
                                            SD1AM2: {
                                                id: "SD1AM2",
                                                nilai: SD1AM2
                                            },
                                            SD1AM3: {
                                                id: "SD1AM3",
                                                nilai: SD1AM3
                                            },
                                            SD1AM4: {
                                                id: "SD1AM4",
                                                nilai: SD1AM4
                                            },
                                            SD1AM5: {
                                                id: "SD1AM5",
                                                nilai: SD1AM5
                                            },
                                            SD1AM6: {
                                                id: "SD1AM6",
                                                nilai: SD1AM6
                                            },
                                            SD1PR1: {
                                                id: "SD1PR1",
                                                nilai: SD1PR1
                                            },
                                            SD1PR2: {
                                                id: "SD1PR2",
                                                nilai: SD1PR2
                                            }
                                        });
                                        //alert("test");

                                        HitungTotalNilaiSidang1_Pemb1(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang1(gTopikId, idSidang);


                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });

                                $("#btnSaveNilaiSidang2").click(function () {
                                    var SD2GK1 = $('#nilaiA1Sidang2').val();
                                    var SD2GK2 = $('#nilaiA2bSidang2').val();
                                    var SD2GK3 = $('#nilaiA3Sidang2').val();
                                    var SD2GK4 = $('#nilaiA4Sidang2').val();
                                    var SD2GP1 = $('#nilaiB1Sidang2').val();
                                    var SD2GP2 = $('#nilaiB2Sidang2').val();
                                    var SD2GP3 = $('#nilaiB3Sidang2').val();
                                    var SD2GP4 = $('#nilaiB4Sidang2').val();
                                    var SD2GP5 = $('#nilaiB5Sidang2').val();
                                    var SD2GP6 = $('#nilaiB6Sidang2').val();
                                    var SD2GP7 = $('#nilaiB7Sidang2').val();
                                    var SD2GP8 = $('#nilaiB8Sidang2').val();
                                    var SD2LJ1 = $('#nilaiC1Sidang2').val();
                                    var SD2LJ2 = $('#nilaiC2Sidang2').val();
                                    var SD2LJ3 = $('#nilaiC3Sidang2').val();
                                    var SD2PP1 = $('#nilaiD1Sidang2').val();
                                    var SD2PP2 = $('#nilaiD2Sidang2').val();
                                    var SD2PP3 = $('#nilaiD3Sidang2').val();
                                    var SD2PD1 = $('#nilaiE1Sidang2').val();
                                    var SD2PD2 = $('#nilaiE2Sidang2').val();
                                    var SD2PD3 = $('#nilaiE3Sidang2').val();
                                    var SD2PD4 = $('#nilaiE4Sidang2').val();
                                    var SD2PD5 = $('#nilaiE5Sidang2').val();
                                    var SD2PD6 = $('#nilaiE6Sidang2').val();
                                    var SD2PD7 = $('#nilaiE7Sidang2').val();
                                    if (SD2GK1 !== '' && SD2GK2 !== '' && SD2GK3 !== '' && SD2GK4 !== ''
                                            && SD2GP1 !== '' && SD2GP2 !== '' && SD2GP3 !== '' && SD2GP4 !== ''
                                            && SD2GP5 !== '' && SD2GP6 !== '' && SD2GP7 !== '' && SD2GP8 !== ''
                                            && SD2LJ1 !== '' && SD2LJ2 !== '' && SD2LJ3 !== ''
                                            && SD2PP1 !== '' && SD2PP2 !== '' && SD2PP3 !== ''
                                            && SD2PD1 !== '' && SD2PD2 !== '' && SD2PD3 !== '' && SD2PD4 !== ''
                                            && SD2PD5 !== '' && SD2PD6 !== '' && SD2PD7 !== '') {

                                        nrpSidang = gTopikMahasiswaNrp + "Sidang2";
                                        firebase.database().ref('nilai_pemb1/').child(nrpSidang).set({
                                            SD2GK1: {
                                                id: "SD2GK1",
                                                nilai: SD2GK1
                                            },
                                            SD2GK2: {
                                                id: "SD2GK2",
                                                nilai: SD2GK2
                                            },
                                            SD2GK3: {
                                                id: "SD2GK3",
                                                nilai: SD2GK3
                                            },
                                            SD2GK4: {
                                                id: "SD2GK4",
                                                nilai: SD2GK4
                                            },
                                            SD2GP1: {
                                                id: "SD2GP1",
                                                nilai: SD2GP1
                                            },
                                            SD2GP2: {
                                                id: "SD2GP2",
                                                nilai: SD2GP2
                                            },
                                            SD2GP3: {
                                                id: "SD2GP3",
                                                nilai: SD2GP3
                                            },
                                            SD2GP4: {
                                                id: "SD2GP4",
                                                nilai: SD2GP4
                                            },
                                            SD2GP5: {
                                                id: "SD2GP5",
                                                nilai: SD2GP5
                                            },
                                            SD2GP6: {
                                                id: "SD2GP6",
                                                nilai: SD2GP6
                                            },
                                            SD2GP7: {
                                                id: "SD2GP7",
                                                nilai: SD2GP7
                                            },
                                            SD2GP8: {
                                                id: "SD2GP8",
                                                nilai: SD2GP8
                                            },
                                            SD2LJ1: {
                                                id: "SD2LJ1",
                                                nilai: SD2LJ1
                                            },
                                            SD2LJ2: {
                                                id: "SD2LJ2",
                                                nilai: SD2LJ2
                                            },
                                            SD2LJ3: {
                                                id: "SD2LJ3",
                                                nilai: SD2LJ3
                                            },
                                            SD2PP1: {
                                                id: "SD2PP1",
                                                nilai: SD2PP1
                                            },
                                            SD2PP2: {
                                                id: "SD2PP2",
                                                nilai: SD2PP2
                                            },
                                            SD2PP3: {
                                                id: "SD2PP3",
                                                nilai: SD2PP3
                                            },
                                            SD2PD1: {
                                                id: "SD2PD1",
                                                nilai: SD2PD1
                                            },
                                            SD2PD2: {
                                                id: "SD2PD2",
                                                nilai: SD2PD2
                                            },
                                            SD2PD3: {
                                                id: "SD2PD3",
                                                nilai: SD2PD3
                                            },
                                            SD2PD4: {
                                                id: "SD2PD4",
                                                nilai: SD2PD4
                                            },
                                            SD2PD5: {
                                                id: "SD2PD5",
                                                nilai: SD2PD5
                                            },
                                            SD2PD6: {
                                                id: "SD2PD6",
                                                nilai: SD2PD6
                                            },
                                            SD2PD7: {
                                                id: "SD2PD7",
                                                nilai: SD2PD7
                                            }
                                        });

                                        HitungTotalNilaiSidang2_Pemb1(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang2(gTopikId, idSidang);

                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });

                                $("#btnSaveNilaiSidang3").click(function () {
                                    var SD3MP1 = $('#nilaiA1Sidang3').val();
                                    var SD3MP2 = $('#nilaiA2bSidang3').val();
                                    var SD3MJ1 = $('#nilaiB1Sidang3').val();
                                    var SD3MJ2 = $('#nilaiB2Sidang3').val();
                                    var SD3MJ3 = $('#nilaiB3Sidang3').val();
                                    var SD3MJ4 = $('#nilaiB4Sidang3').val();
                                    var SD3MJ5 = $('#nilaiB5Sidang3').val();


                                    if (SD3MP1 !== '' && SD3MP2 !== ''
                                            && SD3MJ1 !== '' && SD3MJ2 !== '' && SD3MJ3 !== ''
                                            && SD3MJ4 !== '' && SD3MJ5 !== '') {
                                        nrpSidang = gTopikMahasiswaNrp + "Sidang3";
                                        firebase.database().ref('nilai_pemb1/').child(nrpSidang).set({

                                            SD3MP1: {
                                                id: "SD3MP1",
                                                nilai: SD3MP1
                                            },
                                            SD3MP2: {
                                                id: "SD3MP2",
                                                nilai: SD3MP2
                                            },
                                            SD3MJ1: {
                                                id: "SD3MJ1",
                                                nilai: SD3MJ1
                                            },
                                            SD3MJ2: {
                                                id: "SD3MJ2",
                                                nilai: SD3MJ2
                                            },
                                            SD3MJ3: {
                                                id: "SD3MJ3",
                                                nilai: SD3MJ3
                                            },
                                            SD3MJ4: {
                                                id: "SD3MJ4",
                                                nilai: SD3MJ4
                                            },
                                            SD3MJ5: {
                                                id: "SD3MJ5",
                                                nilai: SD3MJ5
                                            }

                                        });
                                        HitungTotalNilaiSidang3_Pemb1(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang3(gTopikId, idSidang);
                                        HitungNilaiAkhirTugasAkhirMahasiswa(gTopikId, idSidang);

                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }

                                });

                                $("#btnSaveNilaiProduk").click(function () {
                                    var PTAGK1 = $('#nilaiA1Produk').val();
                                    var PTAGK2 = $('#nilaiA2bProduk').val();
                                    var PTAGK3 = $('#nilaiA3Produk').val();
                                    var PTAGK4 = $('#nilaiA4Produk').val();
                                    var PTAGP1 = $('#nilaiB1Produk').val();
                                    var PTAGP2 = $('#nilaiB2Produk').val();
                                    var PTAGP3 = $('#nilaiB3Produk').val();
                                    var PTAGP4 = $('#nilaiB4Produk').val();
                                    var PTAGP5 = $('#nilaiB5Produk').val();
                                    var PTAGP6 = $('#nilaiB6Produk').val();
                                    var PTAGP7 = $('#nilaiB7Produk').val();
                                    var PTAGP8 = $('#nilaiB8Produk').val();
                                    var PTALJ1 = $('#nilaiC1Produk').val();
                                    var PTALJ2 = $('#nilaiC2Produk').val();
                                    var PTAMB1 = $('#nilaiD1Produk').val();
                                    var PTAMB2 = $('#nilaiD2Produk').val();
                                    var PTAMB3 = $('#nilaiD3Produk').val();

                                    if (PTAGK1 !== '' && PTAGK2 !== '' && PTAGK3 !== '' && PTAGK4 !== ''
                                            && PTAGP1 !== '' && PTAGP2 !== '' && PTAGP3 !== '' && PTAGP4 !== ''
                                            && PTAGP5 !== '' && PTAGP6 !== '' && PTAGP7 !== '' && PTAGP8 !== ''
                                            && PTALJ1 !== '' && PTALJ2 !== ''
                                            && PTAMB1 !== '' && PTAMB2 !== '' && PTAMB3 !== '') {
                                        nrpSidang = gTopikMahasiswaNrp + "NProduk";
                                        firebase.database().ref('nilai_pemb1/').child(nrpSidang).set({
                                            PTAGK1: {
                                                id: "PTAGK1",
                                                nilai: PTAGK1
                                            },
                                            PTAGK2: {
                                                id: "PTAGK2",
                                                nilai: PTAGK2
                                            },
                                            PTAGK3: {
                                                id: "PTAGK3",
                                                nilai: PTAGK3
                                            },
                                            PTAGK4: {
                                                id: "PTAGK4",
                                                nilai: PTAGK4
                                            },
                                            PTAGP1: {
                                                id: "PTAGP1",
                                                nilai: PTAGP1
                                            },
                                            PTAGP2: {
                                                id: "PTAGP2",
                                                nilai: PTAGP2
                                            },
                                            PTAGP3: {
                                                id: "PTAGP3",
                                                nilai: PTAGP3
                                            },
                                            PTAGP4: {
                                                id: "PTAGP4",
                                                nilai: PTAGP4
                                            },
                                            PTAGP5: {
                                                id: "PTAGP5",
                                                nilai: PTAGP5
                                            },
                                            PTAGP6: {
                                                id: "PTAGP6",
                                                nilai: PTAGP6
                                            },
                                            PTAGP7: {
                                                id: "PTAGP7",
                                                nilai: PTAGP7
                                            },
                                            PTAGP8: {
                                                id: "PTAGP8",
                                                nilai: PTAGP8
                                            },
                                            PTALJ1: {
                                                id: "PTALJ1",
                                                nilai: PTALJ1
                                            },
                                            PTALJ2: {
                                                id: "PTALJ2",
                                                nilai: PTALJ2
                                            },
                                            PTAMB1: {
                                                id: "PTAMB1",
                                                nilai: PTAMB1
                                            },
                                            PTAMB2: {
                                                id: "PTAMB2",
                                                nilai: PTAMB2
                                            },
                                            PTAMB3: {
                                                id: "PTAMB3",
                                                nilai: PTAMB3
                                            }
                                        });
                                        HitungTotalNilaiProduk_Pemb1(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang3(gTopikId, idSidang);
                                        HitungNilaiAkhirTugasAkhirMahasiswa(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }

                                });

                                $("#btnSaveNilaiSidangProses1").click(function () {
                                    var NP1IN1 = $('#nilai1ProsesSidang1').val();
                                    var NP1IN2 = $('#nilai2ProsesSidang1').val();
                                    var NP1IN3 = $('#nilai3ProsesSidang1').val();
                                    var NP1IN4 = $('#nilai4ProsesSidang1').val();
                                    var NP1IN5 = $('#nilai5ProsesSidang1').val();

                                    if (NP1IN1 !== ''
                                            && NP1IN2 !== '' && NP1IN3 !== ''
                                            && NP1IN4 !== '' && NP1IN5 !== '') {
                                        nrpSidang = gTopikMahasiswaNrp + "Proses1";
                                        firebase.database().ref('nilai_pemb1/').child(nrpSidang).set({
                                            NP1IN1: {
                                                id: "NP1IN1",
                                                nilai: NP1IN1
                                            },
                                            NP1IN2: {
                                                id: "NP1IN2",
                                                nilai: NP1IN2
                                            },
                                            NP1IN3: {
                                                id: "NP1IN3",
                                                nilai: NP1IN3
                                            },
                                            NP1IN4: {
                                                id: "NP1IN4",
                                                nilai: NP1IN4
                                            },
                                            NP1IN5: {
                                                id: "NP1IN5",
                                                nilai: NP1IN5
                                            }
                                        });
                                        HitungTotalNilaiSidang1_Pemb1_Proses(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang1(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }


                                });

                                $("#btnSaveNilaiSidangProses2").click(function () {
                                    var NP2IN1 = $('#nilai1ProsesSidang2').val();
                                    var NP2IN2 = $('#nilai2ProsesSidang2').val();
                                    var NP2IN3 = $('#nilai3ProsesSidang2').val();
                                    var NP2IN4 = $('#nilai4ProsesSidang2').val();
                                    var NP2IN5 = $('#nilai5ProsesSidang2').val();
                                    var NP2IN6 = $('#nilai6ProsesSidang2').val();
                                    var NP2IN7 = $('#nilai7ProsesSidang2').val();
                                    var NP2IN8 = $('#nilai8ProsesSidang2').val();
                                    if (NP2IN1 !== ''
                                            && NP2IN2 !== '' && NP2IN3 !== ''
                                            && NP2IN4 !== '' && NP2IN5 !== ''
                                            && NP2IN6 !== ''
                                            && NP2IN7 !== '' && NP2IN8 !== '') {
                                        nrpSidang = gTopikMahasiswaNrp + "Proses2";
                                        firebase.database().ref('nilai_pemb1/').child(nrpSidang).set({
                                            NP2IN1: {
                                                id: "NP2IN1",
                                                nilai: NP2IN1
                                            },
                                            NP2IN2: {
                                                id: "NP2IN2",
                                                nilai: NP2IN2
                                            },
                                            NP2IN3: {
                                                id: "NP2IN3",
                                                nilai: NP2IN3
                                            },
                                            NP2IN4: {
                                                id: "NP2IN4",
                                                nilai: NP2IN4
                                            },
                                            NP2IN5: {
                                                id: "NP2IN5",
                                                nilai: NP2IN5
                                            },
                                            NP2IN6: {
                                                id: "NP2IN6",
                                                nilai: NP2IN6
                                            },
                                            NP2IN7: {
                                                id: "NP2IN7",
                                                nilai: NP2IN7
                                            },
                                            NP2IN8: {
                                                id: "NP2IN8",
                                                nilai: NP2IN8
                                            }
                                        });
                                        HitungTotalNilaiSidang2_Pemb1_Proses(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang2(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }

                                });

                                $("#btnSaveNilaiSidangProses3").click(function () {
                                    var NP3IN1 = $('#nilai1ProsesSidang3').val();
                                    var NP3IN2 = $('#nilai2ProsesSidang3').val();
                                    var NP3IN3 = $('#nilai3ProsesSidang3').val();

                                    if (NP3IN1 !== '' && NP3IN2 !== ''
                                            && NP3IN3 !== '') {
                                        nrpSidang = gTopikMahasiswaNrp + "Proses3";
                                        firebase.database().ref('nilai_pemb1/').child(nrpSidang).set({
                                            NP3IN1: {
                                                id: "NP3IN1",
                                                nilai: NP3IN1
                                            },
                                            NP3IN2: {
                                                id: "NP3IN2",
                                                nilai: NP3IN2
                                            },
                                            NP3IN3: {
                                                id: "NP3IN3",
                                                nilai: NP3IN3
                                            },
                                        });
                                        HitungTotalNilaiSidang3_Pemb1_Proses(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang3(gTopikId, idSidang);
                                        HitungNilaiAkhirTugasAkhirMahasiswa(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });

                            }
                        }

                        if (gTopikDosenPemb2Nik === dosenGlobal) {
                            if (c2Sidang.idTopik === gTopikId) {
                                if (jenisSidang === "Sidang 1") {
                                    $('.nav-tabs li:eq(3) a').tab('show');
                                    $('#nilai_sidang_1').hide();
                                    $('#nilai_sidang_2').hide();
                                    $('#nilai_proses_2').hide();
                                    $('#nilai_sidang_3').hide();
                                    $('#nilai_proses_3').hide();
                                    $('#nilai_produk').hide();
                                } else if (jenisSidang === "Sidang 2") {
                                    $('.nav-tabs li:eq(4) a').tab('show');
                                    $('#nilai_sidang_1').hide();
                                    $('#nilai_proses_1').hide();
                                    $('#nilai_sidang_2').hide();
                                    $('#nilai_sidang_3').hide();
                                    $('#nilai_proses_3').hide();
                                    $('#nilai_produk').hide();
                                } else if (jenisSidang === "Sidang 3") {
                                    $('.nav-tabs li:eq(5) a').tab('show');
                                    $('#nilai_sidang_1').hide();
                                    $('#nilai_proses_1').hide();
                                    $('#nilai_sidang_2').hide();
                                    $('#nilai_proses_2').hide();
                                    $('#nilai_sidang_3').hide();
                                }

                                document.getElementById('nilaiSidangName').innerHTML = c2Sidang.sidangName;
                                document.getElementById('nilaiBiodataDosen').innerHTML = gTopikDosenPemb2Nik + " - " + gTopikDosenPemb2Name;
                                document.getElementById('nilaiSebagaiDosen').innerHTML = "Pembimbing 2";
                                document.getElementById('nilaiMahasiswaNrp').innerHTML = gTopikMahasiswaNrp;
                                document.getElementById('nilaiMahasiswaName').innerHTML = gTopikMahasiswaName;
                                document.getElementById('nilaiJudulTopik').innerHTML = gTopikJudulTopik;

                                $("#btnSaveNilaiProduk").click(function () {
                                    var PTAGK1 = $('#nilaiA1Produk').val();
                                    var PTAGK2 = $('#nilaiA2bProduk').val();
                                    var PTAGK3 = $('#nilaiA3Produk').val();
                                    var PTAGK4 = $('#nilaiA4Produk').val();
                                    var PTAGP1 = $('#nilaiB1Produk').val();
                                    var PTAGP2 = $('#nilaiB2Produk').val();
                                    var PTAGP3 = $('#nilaiB3Produk').val();
                                    var PTAGP4 = $('#nilaiB4Produk').val();
                                    var PTAGP5 = $('#nilaiB5Produk').val();
                                    var PTAGP6 = $('#nilaiB6Produk').val();
                                    var PTAGP7 = $('#nilaiB7Produk').val();
                                    var PTAGP8 = $('#nilaiB8Produk').val();
                                    var PTALJ1 = $('#nilaiC1Produk').val();
                                    var PTALJ2 = $('#nilaiC2Produk').val();
                                    var PTAMB1 = $('#nilaiD1Produk').val();
                                    var PTAMB2 = $('#nilaiD2Produk').val();
                                    var PTAMB3 = $('#nilaiD3Produk').val();

                                    if (PTAGK1 !== '' && PTAGK2 !== '' && PTAGK3 !== '' && PTAGK4 !== ''
                                            && PTAGP1 !== '' && PTAGP2 !== '' && PTAGP3 !== '' && PTAGP4 !== ''
                                            && PTAGP5 !== '' && PTAGP6 !== '' && PTAGP7 !== '' && PTAGP8 !== ''
                                            && PTALJ1 !== '' && PTALJ2 !== ''
                                            && PTAMB1 !== '' && PTAMB2 !== '' && PTAMB3 !== '') {
                                        nrpSidang = gTopikMahasiswaNrp + "NProduk";
                                        firebase.database().ref('nilai_pemb2/').child(nrpSidang).set({
                                            PTAGK1: {
                                                id: "PTAGK1",
                                                nilai: PTAGK1
                                            },
                                            PTAGK2: {
                                                id: "PTAGK2",
                                                nilai: PTAGK2
                                            },
                                            PTAGK3: {
                                                id: "PTAGK3",
                                                nilai: PTAGK3
                                            },
                                            PTAGK4: {
                                                id: "PTAGK4",
                                                nilai: PTAGK4
                                            },
                                            PTAGP1: {
                                                id: "PTAGP1",
                                                nilai: PTAGP1
                                            },
                                            PTAGP2: {
                                                id: "PTAGP2",
                                                nilai: PTAGP2
                                            },
                                            PTAGP3: {
                                                id: "PTAGP3",
                                                nilai: PTAGP3
                                            },
                                            PTAGP4: {
                                                id: "PTAGP4",
                                                nilai: PTAGP4
                                            },
                                            PTAGP5: {
                                                id: "PTAGP5",
                                                nilai: PTAGP5
                                            },
                                            PTAGP6: {
                                                id: "PTAGP6",
                                                nilai: PTAGP6
                                            },
                                            PTAGP7: {
                                                id: "PTAGP7",
                                                nilai: PTAGP7
                                            },
                                            PTAGP8: {
                                                id: "PTAGP8",
                                                nilai: PTAGP8
                                            },
                                            PTALJ1: {
                                                id: "PTALJ1",
                                                nilai: PTALJ1
                                            },
                                            PTALJ2: {
                                                id: "PTALJ2",
                                                nilai: PTALJ2
                                            },
                                            PTAMB1: {
                                                id: "PTAMB1",
                                                nilai: PTAMB1
                                            },
                                            PTAMB2: {
                                                id: "PTAMB2",
                                                nilai: PTAMB2
                                            },
                                            PTAMB3: {
                                                id: "PTAMB3",
                                                nilai: PTAMB3
                                            }
                                        });
                                        HitungTotalNilaiProduk_Pemb2(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang3(gTopikId, idSidang);
                                        HitungNilaiAkhirTugasAkhirMahasiswa(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });

                                $("#btnSaveNilaiSidangProses1").click(function () {
                                    var NP1IN1 = $('#nilai1ProsesSidang1').val();
                                    var NP1IN2 = $('#nilai2ProsesSidang1').val();
                                    var NP1IN3 = $('#nilai3ProsesSidang1').val();
                                    var NP1IN4 = $('#nilai4ProsesSidang1').val();
                                    var NP1IN5 = $('#nilai5ProsesSidang1').val();
                                    if (NP1IN1 !== ''
                                            && NP1IN2 !== '' && NP1IN3 !== ''
                                            && NP1IN4 !== '' && NP1IN5 !== '') {

                                        nrpSidang = gTopikMahasiswaNrp + "Proses1";
                                        firebase.database().ref('nilai_pemb2/').child(nrpSidang).set({
                                            NP1IN1: {
                                                id: "NP1IN1",
                                                nilai: NP1IN1
                                            },
                                            NP1IN2: {
                                                id: "NP1IN2",
                                                nilai: NP1IN2
                                            },
                                            NP1IN3: {
                                                id: "NP1IN3",
                                                nilai: NP1IN3
                                            },
                                            NP1IN4: {
                                                id: "NP1IN4",
                                                nilai: NP1IN4
                                            },
                                            NP1IN5: {
                                                id: "NP1IN5",
                                                nilai: NP1IN5
                                            }
                                        });
                                        HitungTotalNilaiSidang1_Pemb2_Proses(nrpSidang, idSidang);

                                        HitungNilaiAkhirSidang1(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });

                                $("#btnSaveNilaiSidangProses2").click(function () {
                                    var NP2IN1 = $('#nilai1ProsesSidang2').val();
                                    var NP2IN2 = $('#nilai2ProsesSidang2').val();
                                    var NP2IN3 = $('#nilai3ProsesSidang2').val();
                                    var NP2IN4 = $('#nilai4ProsesSidang2').val();
                                    var NP2IN5 = $('#nilai5ProsesSidang2').val();
                                    var NP2IN6 = $('#nilai6ProsesSidang2').val();
                                    var NP2IN7 = $('#nilai7ProsesSidang2').val();
                                    var NP2IN8 = $('#nilai8ProsesSidang2').val();

                                    if (NP2IN1 !== ''
                                            && NP2IN2 !== '' && NP2IN3 !== ''
                                            && NP2IN4 !== '' && NP2IN5 !== ''
                                            && NP2IN6 !== ''
                                            && NP2IN7 !== '' && NP2IN8 !== '') {
                                        nrpSidang = gTopikMahasiswaNrp + "Proses2";
                                        firebase.database().ref('nilai_pemb2/').child(nrpSidang).set({
                                            NP2IN1: {
                                                id: "NP2IN1",
                                                nilai: NP2IN1
                                            },
                                            NP2IN2: {
                                                id: "NP2IN2",
                                                nilai: NP2IN2
                                            },
                                            NP2IN3: {
                                                id: "NP2IN3",
                                                nilai: NP2IN3
                                            },
                                            NP2IN4: {
                                                id: "NP2IN4",
                                                nilai: NP2IN4
                                            },
                                            NP2IN5: {
                                                id: "NP2IN5",
                                                nilai: NP2IN5
                                            },
                                            NP2IN6: {
                                                id: "NP2IN6",
                                                nilai: NP2IN6
                                            },
                                            NP2IN7: {
                                                id: "NP2IN7",
                                                nilai: NP2IN7
                                            },
                                            NP2IN8: {
                                                id: "NP2IN8",
                                                nilai: NP2IN8
                                            }
                                        });
                                        HitungTotalNilaiSidang2_Pemb2_Proses(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang2(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });

                                $("#btnSaveNilaiSidangProses3").click(function () {
                                    var NP3IN1 = $('#nilai1ProsesSidang3').val();
                                    var NP3IN2 = $('#nilai2ProsesSidang3').val();
                                    var NP3IN3 = $('#nilai3ProsesSidang3').val();
                                    if (NP3IN1 !== '' && NP3IN2 !== ''
                                            && NP3IN3 !== '') {
                                        nrpSidang = gTopikMahasiswaNrp + "Proses3";
                                        firebase.database().ref('nilai_pemb2/').child(nrpSidang).set({
                                            NP3IN1: {
                                                id: "NP3IN1",
                                                nilai: NP3IN1
                                            },
                                            NP3IN2: {
                                                id: "NP3IN2",
                                                nilai: NP3IN2
                                            },
                                            NP3IN3: {
                                                id: "NP3IN3",
                                                nilai: NP3IN3
                                            },
                                        });
                                        HitungTotalNilaiSidang3_Pemb2_Proses(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang3(gTopikId, idSidang);
                                        HitungNilaiAkhirTugasAkhirMahasiswa(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });
                            }
                        }

                        if (gTopikDosenPeng1Nik === dosenGlobal) {
                            if (c2Sidang.idTopik === gTopikId) {
                                $('#nilai_proses_1').hide();
                                $('#nilai_proses_2').hide();
                                $('#nilai_proses_3').hide();

                                if (jenisSidang === "Sidang 1") {
                                    $('.nav-tabs li:eq(0) a').tab('show');
                                    $('#nilai_sidang_2').hide();
                                    $('#nilai_sidang_3').hide();
                                    $('#nilai_produk').hide();
                                } else if (jenisSidang === "Sidang 2") {
                                    $('.nav-tabs li:eq(1) a').tab('show');
                                    $('#nilai_sidang_1').hide();
                                    $('#nilai_sidang_3').hide();
                                    $('#nilai_produk').hide();
                                } else if (jenisSidang === "Sidang 3") {
                                    $('.nav-tabs li:eq(2) a').tab('show');
                                    $('#nilai_sidang_1').hide();
                                    $('#nilai_sidang_2').hide();
                                }

                                document.getElementById('nilaiSidangName').innerHTML = c2Sidang.sidangName;
                                document.getElementById('nilaiBiodataDosen').innerHTML = c2Sidang.dosen_penguji1.nik + " - " + c2Sidang.dosen_penguji1.name;
                                document.getElementById('nilaiSebagaiDosen').innerHTML = "Penguji 1";
                                document.getElementById('nilaiMahasiswaNrp').innerHTML = gTopikMahasiswaNrp;
                                document.getElementById('nilaiMahasiswaName').innerHTML = gTopikMahasiswaName;
                                document.getElementById('nilaiJudulTopik').innerHTML = gTopikJudulTopik;

                                $("#btnSaveNilaiSidang1").click(function () {
                                    var SD1RP1 = $('#nilai1Sidang1').val();
                                    var SD1PD1 = $('#nilai2aSidang1').val();
                                    var SD1PD2 = $('#nilai2bSidang1').val();
                                    var SD1AM1 = $('#nilai3aSidang1').val();
                                    var SD1AM2 = $('#nilai3bSidang1').val();
                                    var SD1AM3 = $('#nilai3cSidang1').val();
                                    var SD1AM4 = $('#nilai3dSidang1').val();
                                    var SD1AM5 = $('#nilai3eSidang1').val();
                                    var SD1AM6 = $('#nilai3fSidang1').val();
                                    var SD1PR1 = $('#nilai4aSidang1').val();
                                    var SD1PR2 = $('#nilai4bSidang1').val();

                                    if (SD1RP1 !== ''
                                            && SD1PD1 !== '' && SD1PD2 !== ''
                                            && SD1AM1 !== '' && SD1AM2 !== '' && SD1AM3 !== '' && SD1AM4 !== '' && SD1AM5 !== '' && SD1AM6 !== ''
                                            && SD1PR1 !== '' && SD1PR2 !== '') {

                                        nrpSidang = gTopikMahasiswaNrp + "Sidang1";

                                        firebase.database().ref('nilai_peng1/').child(nrpSidang).set({
                                            SD1RP1: {
                                                id: "SD1RP1",
                                                nilai: SD1RP1
                                            },
                                            SD1PD1: {
                                                id: "SD1PD1",
                                                nilai: SD1PD1
                                            },
                                            SD1PD2: {
                                                id: "SD1PD2",
                                                nilai: SD1PD2
                                            },
                                            SD1AM1: {
                                                id: "SD1AM1",
                                                nilai: SD1AM1
                                            },
                                            SD1AM2: {
                                                id: "SD1AM2",
                                                nilai: SD1AM2
                                            },
                                            SD1AM3: {
                                                id: "SD1AM3",
                                                nilai: SD1AM3
                                            },
                                            SD1AM4: {
                                                id: "SD1AM4",
                                                nilai: SD1AM4
                                            },
                                            SD1AM5: {
                                                id: "SD1AM5",
                                                nilai: SD1AM5
                                            },
                                            SD1AM6: {
                                                id: "SD1AM6",
                                                nilai: SD1AM6
                                            },
                                            SD1PR1: {
                                                id: "SD1PR1",
                                                nilai: SD1PR1
                                            },
                                            SD1PR2: {
                                                id: "SD1PR2",
                                                nilai: SD1PR2
                                            }
                                        });
                                        HitungTotalNilaiSidang1_Peng1(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang1(gTopikId, idSidang);

                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });

                                $("#btnSaveNilaiSidang2").click(function () {
                                    var SD2GK1 = $('#nilaiA1Sidang2').val();
                                    var SD2GK2 = $('#nilaiA2bSidang2').val();
                                    var SD2GK3 = $('#nilaiA3Sidang2').val();
                                    var SD2GK4 = $('#nilaiA4Sidang2').val();
                                    var SD2GP1 = $('#nilaiB1Sidang2').val();
                                    var SD2GP2 = $('#nilaiB2Sidang2').val();
                                    var SD2GP3 = $('#nilaiB3Sidang2').val();
                                    var SD2GP4 = $('#nilaiB4Sidang2').val();
                                    var SD2GP5 = $('#nilaiB5Sidang2').val();
                                    var SD2GP6 = $('#nilaiB6Sidang2').val();
                                    var SD2GP7 = $('#nilaiB7Sidang2').val();
                                    var SD2GP8 = $('#nilaiB8Sidang2').val();
                                    var SD2LJ1 = $('#nilaiC1Sidang2').val();
                                    var SD2LJ2 = $('#nilaiC2Sidang2').val();
                                    var SD2LJ3 = $('#nilaiC3Sidang2').val();
                                    var SD2PP1 = $('#nilaiD1Sidang2').val();
                                    var SD2PP2 = $('#nilaiD2Sidang2').val();
                                    var SD2PP3 = $('#nilaiD3Sidang2').val();
                                    var SD2PD1 = $('#nilaiE1Sidang2').val();
                                    var SD2PD2 = $('#nilaiE2Sidang2').val();
                                    var SD2PD3 = $('#nilaiE3Sidang2').val();
                                    var SD2PD4 = $('#nilaiE4Sidang2').val();
                                    var SD2PD5 = $('#nilaiE5Sidang2').val();
                                    var SD2PD6 = $('#nilaiE6Sidang2').val();
                                    var SD2PD7 = $('#nilaiE7Sidang2').val();
                                    if (SD2GK1 !== '' && SD2GK2 !== '' && SD2GK3 !== '' && SD2GK4 !== ''
                                            && SD2GP1 !== '' && SD2GP2 !== '' && SD2GP3 !== '' && SD2GP4 !== ''
                                            && SD2GP5 !== '' && SD2GP6 !== '' && SD2GP7 !== '' && SD2GP8 !== ''
                                            && SD2LJ1 !== '' && SD2LJ2 !== '' && SD2LJ3 !== ''
                                            && SD2PP1 !== '' && SD2PP2 !== '' && SD2PP3 !== ''
                                            && SD2PD1 !== '' && SD2PD2 !== '' && SD2PD3 !== '' && SD2PD4 !== ''
                                            && SD2PD5 !== '' && SD2PD6 !== '' && SD2PD7 !== '') {
                                        nrpSidang = gTopikMahasiswaNrp + "Sidang2";
                                        firebase.database().ref('nilai_peng1/').child(nrpSidang).set({
                                            SD2GK1: {
                                                id: "SD2GK1",
                                                nilai: SD2GK1
                                            },
                                            SD2GK2: {
                                                id: "SD2GK2",
                                                nilai: SD2GK2
                                            },
                                            SD2GK3: {
                                                id: "SD2GK3",
                                                nilai: SD2GK3
                                            },
                                            SD2GK4: {
                                                id: "SD2GK4",
                                                nilai: SD2GK4
                                            },
                                            SD2GP1: {
                                                id: "SD2GP1",
                                                nilai: SD2GP1
                                            },
                                            SD2GP2: {
                                                id: "SD2GP2",
                                                nilai: SD2GP2
                                            },
                                            SD2GP3: {
                                                id: "SD2GP3",
                                                nilai: SD2GP3
                                            },
                                            SD2GP4: {
                                                id: "SD2GP4",
                                                nilai: SD2GP4
                                            },
                                            SD2GP5: {
                                                id: "SD2GP5",
                                                nilai: SD2GP5
                                            },
                                            SD2GP6: {
                                                id: "SD2GP6",
                                                nilai: SD2GP6
                                            },
                                            SD2GP7: {
                                                id: "SD2GP7",
                                                nilai: SD2GP7
                                            },
                                            SD2GP8: {
                                                id: "SD2GP8",
                                                nilai: SD2GP8
                                            },
                                            SD2LJ1: {
                                                id: "SD2LJ1",
                                                nilai: SD2LJ1
                                            },
                                            SD2LJ2: {
                                                id: "SD2LJ2",
                                                nilai: SD2LJ2
                                            },
                                            SD2LJ3: {
                                                id: "SD2LJ3",
                                                nilai: SD2LJ3
                                            },
                                            SD2PP1: {
                                                id: "SD2PP1",
                                                nilai: SD2PP1
                                            },
                                            SD2PP2: {
                                                id: "SD2PP2",
                                                nilai: SD2PP2
                                            },
                                            SD2PP3: {
                                                id: "SD2PP3",
                                                nilai: SD2PP3
                                            },
                                            SD2PD1: {
                                                id: "SD2PD1",
                                                nilai: SD2PD1
                                            },
                                            SD2PD2: {
                                                id: "SD2PD2",
                                                nilai: SD2PD2
                                            },
                                            SD2PD3: {
                                                id: "SD2PD3",
                                                nilai: SD2PD3
                                            },
                                            SD2PD4: {
                                                id: "SD2PD4",
                                                nilai: SD2PD4
                                            },
                                            SD2PD5: {
                                                id: "SD2PD5",
                                                nilai: SD2PD5
                                            },
                                            SD2PD6: {
                                                id: "SD2PD6",
                                                nilai: SD2PD6
                                            },
                                            SD2PD7: {
                                                id: "SD2PD7",
                                                nilai: SD2PD7
                                            }
                                        });
                                        HitungTotalNilaiSidang2_Peng1(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang2(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }

                                });

                                $("#btnSaveNilaiSidang3").click(function () {
                                    var SD3MP1 = $('#nilaiA1Sidang3').val();
                                    var SD3MP2 = $('#nilaiA2bSidang3').val();
                                    var SD3MJ1 = $('#nilaiB1Sidang3').val();
                                    var SD3MJ2 = $('#nilaiB2Sidang3').val();
                                    var SD3MJ3 = $('#nilaiB3Sidang3').val();
                                    var SD3MJ4 = $('#nilaiB4Sidang3').val();
                                    var SD3MJ5 = $('#nilaiB5Sidang3').val();
                                    if (SD3MP1 !== '' && SD3MP2 !== ''
                                            && SD3MJ1 !== '' && SD3MJ2 !== '' && SD3MJ3 !== ''
                                            && SD3MJ4 !== '' && SD3MJ5 !== '') {

                                        nrpSidang = gTopikMahasiswaNrp + "Sidang3";
                                        firebase.database().ref('nilai_peng1/').child(nrpSidang).set({

                                            SD3MP1: {
                                                id: "SD3MP1",
                                                nilai: SD3MP1
                                            },
                                            SD3MP2: {
                                                id: "SD3MP2",
                                                nilai: SD3MP2
                                            },
                                            SD3MJ1: {
                                                id: "SD3MJ1",
                                                nilai: SD3MJ1
                                            },
                                            SD3MJ2: {
                                                id: "SD3MJ2",
                                                nilai: SD3MJ2
                                            },
                                            SD3MJ3: {
                                                id: "SD3MJ3",
                                                nilai: SD3MJ3
                                            },
                                            SD3MJ4: {
                                                id: "SD3MJ4",
                                                nilai: SD3MJ4
                                            },
                                            SD3MJ5: {
                                                id: "SD3MJ5",
                                                nilai: SD3MJ5
                                            }

                                        });
                                        HitungTotalNilaiSidang3_Peng1(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang3(gTopikId, idSidang);
                                        HitungNilaiAkhirTugasAkhirMahasiswa(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });

                                $("#btnSaveNilaiProduk").click(function () {
                                    var PTAGK1 = $('#nilaiA1Produk').val();
                                    var PTAGK2 = $('#nilaiA2bProduk').val();
                                    var PTAGK3 = $('#nilaiA3Produk').val();
                                    var PTAGK4 = $('#nilaiA4Produk').val();
                                    var PTAGP1 = $('#nilaiB1Produk').val();
                                    var PTAGP2 = $('#nilaiB2Produk').val();
                                    var PTAGP3 = $('#nilaiB3Produk').val();
                                    var PTAGP4 = $('#nilaiB4Produk').val();
                                    var PTAGP5 = $('#nilaiB5Produk').val();
                                    var PTAGP6 = $('#nilaiB6Produk').val();
                                    var PTAGP7 = $('#nilaiB7Produk').val();
                                    var PTAGP8 = $('#nilaiB8Produk').val();
                                    var PTALJ1 = $('#nilaiC1Produk').val();
                                    var PTALJ2 = $('#nilaiC2Produk').val();
                                    var PTAMB1 = $('#nilaiD1Produk').val();
                                    var PTAMB2 = $('#nilaiD2Produk').val();
                                    var PTAMB3 = $('#nilaiD3Produk').val();

                                    if (PTAGK1 !== '' && PTAGK2 !== '' && PTAGK3 !== '' && PTAGK4 !== ''
                                            && PTAGP1 !== '' && PTAGP2 !== '' && PTAGP3 !== '' && PTAGP4 !== ''
                                            && PTAGP5 !== '' && PTAGP6 !== '' && PTAGP7 !== '' && PTAGP8 !== ''
                                            && PTALJ1 !== '' && PTALJ2 !== ''
                                            && PTAMB1 !== '' && PTAMB2 !== '' && PTAMB3 !== '') {

                                        nrpSidang = gTopikMahasiswaNrp + "NProduk";
                                        firebase.database().ref('nilai_peng1/').child(nrpSidang).set({
                                            PTAGK1: {
                                                id: "PTAGK1",
                                                nilai: PTAGK1
                                            },
                                            PTAGK2: {
                                                id: "PTAGK2",
                                                nilai: PTAGK2
                                            },
                                            PTAGK3: {
                                                id: "PTAGK3",
                                                nilai: PTAGK3
                                            },
                                            PTAGK4: {
                                                id: "PTAGK4",
                                                nilai: PTAGK4
                                            },
                                            PTAGP1: {
                                                id: "PTAGP1",
                                                nilai: PTAGP1
                                            },
                                            PTAGP2: {
                                                id: "PTAGP2",
                                                nilai: PTAGP2
                                            },
                                            PTAGP3: {
                                                id: "PTAGP3",
                                                nilai: PTAGP3
                                            },
                                            PTAGP4: {
                                                id: "PTAGP4",
                                                nilai: PTAGP4
                                            },
                                            PTAGP5: {
                                                id: "PTAGP5",
                                                nilai: PTAGP5
                                            },
                                            PTAGP6: {
                                                id: "PTAGP6",
                                                nilai: PTAGP6
                                            },
                                            PTAGP7: {
                                                id: "PTAGP7",
                                                nilai: PTAGP7
                                            },
                                            PTAGP8: {
                                                id: "PTAGP8",
                                                nilai: PTAGP8
                                            },
                                            PTALJ1: {
                                                id: "PTALJ1",
                                                nilai: PTALJ1
                                            },
                                            PTALJ2: {
                                                id: "PTALJ2",
                                                nilai: PTALJ2
                                            },
                                            PTAMB1: {
                                                id: "PTAMB1",
                                                nilai: PTAMB1
                                            },
                                            PTAMB2: {
                                                id: "PTAMB2",
                                                nilai: PTAMB2
                                            },
                                            PTAMB3: {
                                                id: "PTAMB3",
                                                nilai: PTAMB3
                                            }
                                        });
                                        HitungTotalNilaiProduk_Peng1(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang3(gTopikId, idSidang);
                                        HitungNilaiAkhirTugasAkhirMahasiswa(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });

                            }
                        }

                        if (gTopikDosenPeng2Nik === dosenGlobal) {
                            if (c2Sidang.idTopik === gTopikId) {
                                $('#nilai_proses_1').hide();
                                $('#nilai_proses_2').hide();
                                $('#nilai_proses_3').hide();

                                if (jenisSidang === "Sidang 1") {
                                    $('.nav-tabs li:eq(0) a').tab('show');
                                    $('#nilai_sidang_2').hide();
                                    $('#nilai_sidang_3').hide();
                                    $('#nilai_produk').hide();
                                } else if (jenisSidang === "Sidang 2") {
                                    $('.nav-tabs li:eq(1) a').tab('show');
                                    $('#nilai_sidang_1').hide();
                                    $('#nilai_sidang_3').hide();
                                    $('#nilai_produk').hide();
                                } else if (jenisSidang === "Sidang 3") {
                                    $('.nav-tabs li:eq(2) a').tab('show');
                                    $('#nilai_sidang_1').hide();
                                    $('#nilai_sidang_2').hide();
                                }

                                document.getElementById('nilaiSidangName').innerHTML = c2Sidang.sidangName;
                                document.getElementById('nilaiBiodataDosen').innerHTML = c2Sidang.dosen_penguji2.nik + " - " + c2Sidang.dosen_penguji2.name;
                                document.getElementById('nilaiSebagaiDosen').innerHTML = "Penguji 2";
                                document.getElementById('nilaiMahasiswaNrp').innerHTML = gTopikMahasiswaNrp;
                                document.getElementById('nilaiMahasiswaName').innerHTML = gTopikMahasiswaName;
                                document.getElementById('nilaiJudulTopik').innerHTML = gTopikJudulTopik;

                                $("#btnSaveNilaiSidang1").click(function () {
                                    var SD1RP1 = $('#nilai1Sidang1').val();
                                    var SD1PD1 = $('#nilai2aSidang1').val();
                                    var SD1PD2 = $('#nilai2bSidang1').val();
                                    var SD1AM1 = $('#nilai3aSidang1').val();
                                    var SD1AM2 = $('#nilai3bSidang1').val();
                                    var SD1AM3 = $('#nilai3cSidang1').val();
                                    var SD1AM4 = $('#nilai3dSidang1').val();
                                    var SD1AM5 = $('#nilai3eSidang1').val();
                                    var SD1AM6 = $('#nilai3fSidang1').val();
                                    var SD1PR1 = $('#nilai4aSidang1').val();
                                    var SD1PR2 = $('#nilai4bSidang1').val();
                                    if (SD1RP1 !== ''
                                            && SD1PD1 !== '' && SD1PD2 !== ''
                                            && SD1AM1 !== '' && SD1AM2 !== '' && SD1AM3 !== '' && SD1AM4 !== '' && SD1AM5 !== '' && SD1AM6 !== ''
                                            && SD1PR1 !== '' && SD1PR2 !== '') {

                                        nrpSidang = gTopikMahasiswaNrp + "Sidang1";
                                        firebase.database().ref('nilai_peng2/').child(nrpSidang).set({
                                            SD1RP1: {
                                                id: "SD1RP1",
                                                nilai: SD1RP1
                                            },
                                            SD1PD1: {
                                                id: "SD1PD1",
                                                nilai: SD1PD1
                                            },
                                            SD1PD2: {
                                                id: "SD1PD2",
                                                nilai: SD1PD2
                                            },
                                            SD1AM1: {
                                                id: "SD1AM1",
                                                nilai: SD1AM1
                                            },
                                            SD1AM2: {
                                                id: "SD1AM2",
                                                nilai: SD1AM2
                                            },
                                            SD1AM3: {
                                                id: "SD1AM3",
                                                nilai: SD1AM3
                                            },
                                            SD1AM4: {
                                                id: "SD1AM4",
                                                nilai: SD1AM4
                                            },
                                            SD1AM5: {
                                                id: "SD1AM5",
                                                nilai: SD1AM5
                                            },
                                            SD1AM6: {
                                                id: "SD1AM6",
                                                nilai: SD1AM6
                                            },
                                            SD1PR1: {
                                                id: "SD1PR1",
                                                nilai: SD1PR1
                                            },
                                            SD1PR2: {
                                                id: "SD1PR2",
                                                nilai: SD1PR2
                                            }
                                        });

                                        HitungTotalNilaiSidang1_Peng2(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang1(gTopikId, idSidang);

                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });

                                $("#btnSaveNilaiSidang2").click(function () {
                                    var SD2GK1 = $('#nilaiA1Sidang2').val();
                                    var SD2GK2 = $('#nilaiA2bSidang2').val();
                                    var SD2GK3 = $('#nilaiA3Sidang2').val();
                                    var SD2GK4 = $('#nilaiA4Sidang2').val();
                                    var SD2GP1 = $('#nilaiB1Sidang2').val();
                                    var SD2GP2 = $('#nilaiB2Sidang2').val();
                                    var SD2GP3 = $('#nilaiB3Sidang2').val();
                                    var SD2GP4 = $('#nilaiB4Sidang2').val();
                                    var SD2GP5 = $('#nilaiB5Sidang2').val();
                                    var SD2GP6 = $('#nilaiB6Sidang2').val();
                                    var SD2GP7 = $('#nilaiB7Sidang2').val();
                                    var SD2GP8 = $('#nilaiB8Sidang2').val();
                                    var SD2LJ1 = $('#nilaiC1Sidang2').val();
                                    var SD2LJ2 = $('#nilaiC2Sidang2').val();
                                    var SD2LJ3 = $('#nilaiC3Sidang2').val();
                                    var SD2PP1 = $('#nilaiD1Sidang2').val();
                                    var SD2PP2 = $('#nilaiD2Sidang2').val();
                                    var SD2PP3 = $('#nilaiD3Sidang2').val();
                                    var SD2PD1 = $('#nilaiE1Sidang2').val();
                                    var SD2PD2 = $('#nilaiE2Sidang2').val();
                                    var SD2PD3 = $('#nilaiE3Sidang2').val();
                                    var SD2PD4 = $('#nilaiE4Sidang2').val();
                                    var SD2PD5 = $('#nilaiE5Sidang2').val();
                                    var SD2PD6 = $('#nilaiE6Sidang2').val();
                                    var SD2PD7 = $('#nilaiE7Sidang2').val();
                                    if (SD2GK1 !== '' && SD2GK2 !== '' && SD2GK3 !== '' && SD2GK4 !== ''
                                            && SD2GP1 !== '' && SD2GP2 !== '' && SD2GP3 !== '' && SD2GP4 !== ''
                                            && SD2GP5 !== '' && SD2GP6 !== '' && SD2GP7 !== '' && SD2GP8 !== ''
                                            && SD2LJ1 !== '' && SD2LJ2 !== '' && SD2LJ3 !== ''
                                            && SD2PP1 !== '' && SD2PP2 !== '' && SD2PP3 !== ''
                                            && SD2PD1 !== '' && SD2PD2 !== '' && SD2PD3 !== '' && SD2PD4 !== ''
                                            && SD2PD5 !== '' && SD2PD6 !== '' && SD2PD7 !== '') {

                                        nrpSidang = gTopikMahasiswaNrp + "Sidang2";
                                        firebase.database().ref('nilai_peng2/').child(nrpSidang).set({
                                            SD2GK1: {
                                                id: "SD2GK1",
                                                nilai: SD2GK1
                                            },
                                            SD2GK2: {
                                                id: "SD2GK2",
                                                nilai: SD2GK2
                                            },
                                            SD2GK3: {
                                                id: "SD2GK3",
                                                nilai: SD2GK3
                                            },
                                            SD2GK4: {
                                                id: "SD2GK4",
                                                nilai: SD2GK4
                                            },
                                            SD2GP1: {
                                                id: "SD2GP1",
                                                nilai: SD2GP1
                                            },
                                            SD2GP2: {
                                                id: "SD2GP2",
                                                nilai: SD2GP2
                                            },
                                            SD2GP3: {
                                                id: "SD2GP3",
                                                nilai: SD2GP3
                                            },
                                            SD2GP4: {
                                                id: "SD2GP4",
                                                nilai: SD2GP4
                                            },
                                            SD2GP5: {
                                                id: "SD2GP5",
                                                nilai: SD2GP5
                                            },
                                            SD2GP6: {
                                                id: "SD2GP6",
                                                nilai: SD2GP6
                                            },
                                            SD2GP7: {
                                                id: "SD2GP7",
                                                nilai: SD2GP7
                                            },
                                            SD2GP8: {
                                                id: "SD2GP8",
                                                nilai: SD2GP8
                                            },
                                            SD2LJ1: {
                                                id: "SD2LJ1",
                                                nilai: SD2LJ1
                                            },
                                            SD2LJ2: {
                                                id: "SD2LJ2",
                                                nilai: SD2LJ2
                                            },
                                            SD2LJ3: {
                                                id: "SD2LJ3",
                                                nilai: SD2LJ3
                                            },
                                            SD2PP1: {
                                                id: "SD2PP1",
                                                nilai: SD2PP1
                                            },
                                            SD2PP2: {
                                                id: "SD2PP2",
                                                nilai: SD2PP2
                                            },
                                            SD2PP3: {
                                                id: "SD2PP3",
                                                nilai: SD2PP3
                                            },
                                            SD2PD1: {
                                                id: "SD2PD1",
                                                nilai: SD2PD1
                                            },
                                            SD2PD2: {
                                                id: "SD2PD2",
                                                nilai: SD2PD2
                                            },
                                            SD2PD3: {
                                                id: "SD2PD3",
                                                nilai: SD2PD3
                                            },
                                            SD2PD4: {
                                                id: "SD2PD4",
                                                nilai: SD2PD4
                                            },
                                            SD2PD5: {
                                                id: "SD2PD5",
                                                nilai: SD2PD5
                                            },
                                            SD2PD6: {
                                                id: "SD2PD6",
                                                nilai: SD2PD6
                                            },
                                            SD2PD7: {
                                                id: "SD2PD7",
                                                nilai: SD2PD7
                                            }
                                        });

                                        HitungTotalNilaiSidang2_Peng2(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang2(gTopikId, idSidang);

                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });

                                $("#btnSaveNilaiSidang3").click(function () {
                                    var SD3MP1 = $('#nilaiA1Sidang3').val();
                                    var SD3MP2 = $('#nilaiA2bSidang3').val();
                                    var SD3MJ1 = $('#nilaiB1Sidang3').val();
                                    var SD3MJ2 = $('#nilaiB2Sidang3').val();
                                    var SD3MJ3 = $('#nilaiB3Sidang3').val();
                                    var SD3MJ4 = $('#nilaiB4Sidang3').val();
                                    var SD3MJ5 = $('#nilaiB5Sidang3').val();
                                    if (SD3MP1 !== '' && SD3MP2 !== ''
                                            && SD3MJ1 !== '' && SD3MJ2 !== '' && SD3MJ3 !== ''
                                            && SD3MJ4 !== '' && SD3MJ5 !== '') {
                                        nrpSidang = gTopikMahasiswaNrp + "Sidang3";
                                        firebase.database().ref('nilai_peng2/').child(nrpSidang).set({

                                            SD3MP1: {
                                                id: "SD3MP1",
                                                nilai: SD3MP1
                                            },
                                            SD3MP2: {
                                                id: "SD3MP2",
                                                nilai: SD3MP2
                                            },
                                            SD3MJ1: {
                                                id: "SD3MJ1",
                                                nilai: SD3MJ1
                                            },
                                            SD3MJ2: {
                                                id: "SD3MJ2",
                                                nilai: SD3MJ2
                                            },
                                            SD3MJ3: {
                                                id: "SD3MJ3",
                                                nilai: SD3MJ3
                                            },
                                            SD3MJ4: {
                                                id: "SD3MJ4",
                                                nilai: SD3MJ4
                                            },
                                            SD3MJ5: {
                                                id: "SD3MJ5",
                                                nilai: SD3MJ5
                                            }

                                        });
                                        HitungTotalNilaiSidang3_Peng2(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang3(gTopikId, idSidang);
                                        HitungNilaiAkhirTugasAkhirMahasiswa(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });

                                $("#btnSaveNilaiProduk").click(function () {
                                    var PTAGK1 = $('#nilaiA1Produk').val();
                                    var PTAGK2 = $('#nilaiA2bProduk').val();
                                    var PTAGK3 = $('#nilaiA3Produk').val();
                                    var PTAGK4 = $('#nilaiA4Produk').val();
                                    var PTAGP1 = $('#nilaiB1Produk').val();
                                    var PTAGP2 = $('#nilaiB2Produk').val();
                                    var PTAGP3 = $('#nilaiB3Produk').val();
                                    var PTAGP4 = $('#nilaiB4Produk').val();
                                    var PTAGP5 = $('#nilaiB5Produk').val();
                                    var PTAGP6 = $('#nilaiB6Produk').val();
                                    var PTAGP7 = $('#nilaiB7Produk').val();
                                    var PTAGP8 = $('#nilaiB8Produk').val();
                                    var PTALJ1 = $('#nilaiC1Produk').val();
                                    var PTALJ2 = $('#nilaiC2Produk').val();
                                    var PTAMB1 = $('#nilaiD1Produk').val();
                                    var PTAMB2 = $('#nilaiD2Produk').val();
                                    var PTAMB3 = $('#nilaiD3Produk').val();

                                    if (PTAGK1 !== '' && PTAGK2 !== '' && PTAGK3 !== '' && PTAGK4 !== ''
                                            && PTAGP1 !== '' && PTAGP2 !== '' && PTAGP3 !== '' && PTAGP4 !== '' && PTAGP5 !== '' && PTAGP6 !== '' && PTAGP7 !== '' && PTAGP8 !== ''
                                            && PTALJ1 !== '' && PTALJ2 !== ''
                                            && PTAMB1 !== '' && PTAMB2 !== '' && PTAMB3 !== '') {
                                        nrpSidang = gTopikMahasiswaNrp + "NProduk";
                                        firebase.database().ref('nilai_peng2/').child(nrpSidang).set({
                                            PTAGK1: {
                                                id: "PTAGK1",
                                                nilai: PTAGK1
                                            },
                                            PTAGK2: {
                                                id: "PTAGK2",
                                                nilai: PTAGK2
                                            },
                                            PTAGK3: {
                                                id: "PTAGK3",
                                                nilai: PTAGK3
                                            },
                                            PTAGK4: {
                                                id: "PTAGK4",
                                                nilai: PTAGK4
                                            },
                                            PTAGP1: {
                                                id: "PTAGP1",
                                                nilai: PTAGP1
                                            },
                                            PTAGP2: {
                                                id: "PTAGP2",
                                                nilai: PTAGP2
                                            },
                                            PTAGP3: {
                                                id: "PTAGP3",
                                                nilai: PTAGP3
                                            },
                                            PTAGP4: {
                                                id: "PTAGP4",
                                                nilai: PTAGP4
                                            },
                                            PTAGP5: {
                                                id: "PTAGP5",
                                                nilai: PTAGP5
                                            },
                                            PTAGP6: {
                                                id: "PTAGP6",
                                                nilai: PTAGP6
                                            },
                                            PTAGP7: {
                                                id: "PTAGP7",
                                                nilai: PTAGP7
                                            },
                                            PTAGP8: {
                                                id: "PTAGP8",
                                                nilai: PTAGP8
                                            },
                                            PTALJ1: {
                                                id: "PTALJ1",
                                                nilai: PTALJ1
                                            },
                                            PTALJ2: {
                                                id: "PTALJ2",
                                                nilai: PTALJ2
                                            },
                                            PTAMB1: {
                                                id: "PTAMB1",
                                                nilai: PTAMB1
                                            },
                                            PTAMB2: {
                                                id: "PTAMB2",
                                                nilai: PTAMB2
                                            },
                                            PTAMB3: {
                                                id: "PTAMB3",
                                                nilai: PTAMB3
                                            }
                                        });
                                        HitungTotalNilaiProduk_Peng2(nrpSidang, idSidang);
                                        HitungNilaiAkhirSidang3(gTopikId, idSidang);
                                        HitungNilaiAkhirTugasAkhirMahasiswa(gTopikId, idSidang);
                                    } else {
                                        alert("Masih ada nilai yang belum diisi.");
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });
    });
}

//PEMBIMBING 1

function HitungTotalNilaiSidang1_Pemb1(nrpSidang, idSidang) {
    //alert(nrpSidang+"+"+idSidang);
//    var arrTotalSidang1 = new Array();
//    var hasilTotalSidang1;
    var totalSidang1 = 0;
    var bebas = 0, bebas2 = 0;

    var indikator_nilai_sidang1 = firebase.database().ref('indikator_nilai_sidang1/');
    indikator_nilai_sidang1.on("value", function (snap) {
        objIndikatorSidang1 = [];
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                bebas2++;
                var c2IndikatorSidang1 = childSnap.val();
                var nilai_pemb1_sidang1 = firebase.database().ref('nilai_pemb1/').child(nrpSidang);
                //alert('nik: '+nilai_pemb1_sidang1);
                nilai_pemb1_sidang1.on("value", function (snap1) {
                    objnilaiSidang1_pemb1 = [];
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            bebas++;
                            var c2nilaiSidang1_pemb1 = childSnap1.val();

                            if (c2IndikatorSidang1.id === c2nilaiSidang1_pemb1.id) {
                                totalSidang1 = totalSidang1 + (parseFloat(c2nilaiSidang1_pemb1.nilai) * parseFloat(c2IndikatorSidang1.bobot));
                                //arrTotalSidang1.push(totalSidang1);
                            }
                        });
                    }
                });
            });
        }
    });
    //alert("b: "+bebas)
    //alert("b2: "+bebas2)
//    alert("t: "+totalSidang1)

    //hasilTotalSidang1 = arrTotalSidang1.pop();

    if (!confirm('Simpan nilai sidang 1?')) {
        return false;
    } else {
        if (totalSidang1.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            //hasilTotalSidang1 = arrTotalSidang1.pop();
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_sidang1_pemb1: totalSidang1.toFixed(2)
            });
            firebase.database().ref('nilai_pemb1/').child(nrpSidang).update({
                nilai_sidang1_pemb1: {
                    id: "nilai_sidang1_pemb1",
                    nilai: totalSidang1.toFixed(2)
                }
            });
            alert("Nilai Sidang 1 sebagai Pembimbing 1 disimpan : " + totalSidang1.toFixed(2));
        }

    }
}

function HitungTotalNilaiSidang1_Pemb1_Proses(nrpSidang, idSidang) {
    //alert(nrpSidang+"+"+idSidang);
    var totalSidang = 0;
    var bebas = 0, bebas2 = 0;

    var indikator_nilai_sidang1 = firebase.database().ref('indikator_nilai_proses_sidang1/');
    indikator_nilai_sidang1.on("value", function (snap) {
        objIndikatorSidang1 = [];
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                bebas2++;
                var c2IndikatorSidang1 = childSnap.val();
                var nilai_pemb1_sidang1 = firebase.database().ref('nilai_pemb1/').child(nrpSidang);
                //alert('nik: '+nilai_pemb1_sidang1);
                nilai_pemb1_sidang1.on("value", function (snap1) {
                    objnilaiSidang1_pemb1 = [];
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            bebas++;
                            var c2nilaiSidang1_pemb1 = childSnap1.val();

                            if (c2IndikatorSidang1.id === c2nilaiSidang1_pemb1.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang1_pemb1.nilai) * parseFloat(c2IndikatorSidang1.bobot));
                                //arrTotalSidang1.push(totalSidang1);
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai proses sidang 1?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_proses_sidang1_pemb1: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_pemb1/').child(nrpSidang).update({
                nilai_proses_sidang1_pemb1: {
                    id: "nilai_proses_sidang1_pemb1",
                    nilai: totalSidang.toFixed(2)
                }
            });

            alert("Nilai Proses Sidang 1 sebagai Pembimbing 1 disimpan : " + totalSidang.toFixed(2));
        }
    }
}

function HitungTotalNilaiSidang2_Pemb1(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang2 = firebase.database().ref('indikator_nilai_sidang2/');
    indikator_nilai_sidang2.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang2 = childSnap.val();
                var nilai_pemb1_sidang2 = firebase.database().ref('nilai_pemb1/').child(nrpSidang);
                //alert('nik: '+nilai_pemb1_sidang1);
                nilai_pemb1_sidang2.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang2_pemb1 = childSnap1.val();

                            if (c2IndikatorSidang2.id === c2nilaiSidang2_pemb1.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang2_pemb1.nilai) * parseFloat(c2IndikatorSidang2.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai sidang 2?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_sidang2_pemb1: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_pemb1/').child(nrpSidang).update({
                nilai_sidang2_pemb1: {
                    id: "nilai_sidang2_pemb1",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Sidang 2 Sebagai Pembimbing 1 disimpan : " + totalSidang.toFixed(2));
        }
    }
}

function HitungTotalNilaiSidang2_Pemb1_Proses(nrpSidang, idSidang) {
    //alert(nrpSidang+"+"+idSidang);
    var totalSidang = 0;
    var bebas = 0, bebas2 = 0;

    var indikator_nilai_sidang2_proses = firebase.database().ref('indikator_nilai_proses_sidang2/');
    indikator_nilai_sidang2_proses.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang2_proses = childSnap.val();
                var nilai_pemb1_sidang2_proses = firebase.database().ref('nilai_pemb1/').child(nrpSidang);
                nilai_pemb1_sidang2_proses.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang2_pemb1_proses = childSnap1.val();

                            if (c2IndikatorSidang2_proses.id === c2nilaiSidang2_pemb1_proses.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang2_pemb1_proses.nilai) * parseFloat(c2IndikatorSidang2_proses.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai proses sidang 2?')) {
        return false;
    } else {


        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_proses_sidang2_pemb1: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_pemb1/').child(nrpSidang).update({
                nilai_proses_sidang2_pemb1: {
                    id: "nilai_proses_sidang2_pemb1",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Proses Sidang 2 Sebagai Pembimbing 1 disimpan : " + totalSidang.toFixed(2));

        }

    }
}

function HitungTotalNilaiSidang3_Pemb1(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang3 = firebase.database().ref('indikator_nilai_sidang3/');
    indikator_nilai_sidang3.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang3 = childSnap.val();
                var nilai_pemb1_sidang3 = firebase.database().ref('nilai_pemb1/').child(nrpSidang);
                //alert('nik: '+nilai_pemb1_sidang1);
                nilai_pemb1_sidang3.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang3_pemb1 = childSnap1.val();

                            if (c2IndikatorSidang3.id === c2nilaiSidang3_pemb1.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang3_pemb1.nilai) * parseFloat(c2IndikatorSidang3.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai sidang 3?')) {
        return false;
    } else {



        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_sidang3_pemb1: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_pemb1/').child(nrpSidang).update({
                nilai_sidang3_pemb1: {
                    id: "nilai_sidang3_pemb1",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Sidang 3 Sebagai Pembimbing 1 disimpan : " + totalSidang.toFixed(2));

        }
    }
}

function HitungTotalNilaiSidang3_Pemb1_Proses(nrpSidang, idSidang) {
    //alert(nrpSidang+"+"+idSidang);
    var totalSidang = 0;

    var indikator_nilai_sidang3_proses = firebase.database().ref('indikator_nilai_proses_sidang3/');
    indikator_nilai_sidang3_proses.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang3_proses = childSnap.val();
                var nilai_pemb1_sidang3_proses = firebase.database().ref('nilai_pemb1/').child(nrpSidang);
                nilai_pemb1_sidang3_proses.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang3_pemb1_proses = childSnap1.val();

                            if (c2IndikatorSidang3_proses.id === c2nilaiSidang3_pemb1_proses.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang3_pemb1_proses.nilai) * parseFloat(c2IndikatorSidang3_proses.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai proses sidang 3?')) {
        return false;
    } else {


        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_proses_sidang3_pemb1: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_pemb1/').child(nrpSidang).update({
                nilai_proses_sidang3_pemb1: {
                    id: "nilai_proses_sidang3_pemb1",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Proses Sidang 3 Sebagai Pembimbing 1 disimpan : " + totalSidang.toFixed(2));

        }
    }
}

function HitungTotalNilaiProduk_Pemb1(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_produk = firebase.database().ref('indikator_nilai_produk/');
    indikator_nilai_produk.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorProduk = childSnap.val();
                var nilai_pemb1_produk = firebase.database().ref('nilai_pemb1/').child(nrpSidang);
                //alert('nik: '+nilai_pemb1_sidang1);
                nilai_pemb1_produk.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiProduk_pemb1 = childSnap1.val();

                            if (c2IndikatorProduk.id === c2nilaiProduk_pemb1.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiProduk_pemb1.nilai) * parseFloat(c2IndikatorProduk.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai produk tugas akhir?')) {
        return false;
    } else {



        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_produk_pemb1: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_pemb1/').child(nrpSidang).update({
                nilai_produk_pemb1: {
                    id: "nilai_produk_pemb1",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Produk Tugas Akhir Sebagai Pembimbing 1 disimpan : " + totalSidang.toFixed(2));

        }

    }
}


//PEMBIMBING 2

function HitungTotalNilaiSidang1_Pemb2_Proses(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang1_proses = firebase.database().ref('indikator_nilai_proses_sidang1/');
    indikator_nilai_sidang1_proses.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorProsesSidang1 = childSnap.val();
                var nilai_pemb2_sidang1_proses = firebase.database().ref('nilai_pemb2/').child(nrpSidang);
                nilai_pemb2_sidang1_proses.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang1_pemb2_proses = childSnap1.val();

                            if (c2IndikatorProsesSidang1.id === c2nilaiSidang1_pemb2_proses.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang1_pemb2_proses.nilai) * parseFloat(c2IndikatorProsesSidang1.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai proses sidang 1?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_proses_sidang1_pemb2: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_pemb2/').child(nrpSidang).update({
                nilai_proses_sidang1_pemb2: {
                    id: "nilai_proses_sidang1_pemb2",
                    nilai: totalSidang.toFixed(2)
                }
            });

            alert("Nilai Proses Sidang 1 Sebagai Pembimbing 2 disimpan : " + totalSidang.toFixed(2));

        }
    }
}

function HitungTotalNilaiSidang2_Pemb2_Proses(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang_proses = firebase.database().ref('indikator_nilai_proses_sidang2/');
    indikator_nilai_sidang_proses.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorProsesSidang = childSnap.val();
                var nilai_pemb_sidang_proses = firebase.database().ref('nilai_pemb2/').child(nrpSidang);
                nilai_pemb_sidang_proses.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang_pemb_proses = childSnap1.val();

                            if (c2IndikatorProsesSidang.id === c2nilaiSidang_pemb_proses.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang_pemb_proses.nilai) * parseFloat(c2IndikatorProsesSidang.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai proses sidang 2?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_proses_sidang2_pemb2: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_pemb2/').child(nrpSidang).update({
                nilai_proses_sidang2_pemb2: {
                    id: "nilai_proses_sidang2_pemb2",
                    nilai: totalSidang.toFixed(2)
                }
            });

            alert("Nilai Proses Sidang 2 Sebagai Pembimbing 2 disimpan : " + totalSidang.toFixed(2));

        }
    }
}

function HitungTotalNilaiSidang3_Pemb2_Proses(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang_proses = firebase.database().ref('indikator_nilai_proses_sidang3/');
    indikator_nilai_sidang_proses.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorProsesSidang = childSnap.val();
                var nilai_pemb_sidang_proses = firebase.database().ref('nilai_pemb2/').child(nrpSidang);
                nilai_pemb_sidang_proses.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang_pemb_proses = childSnap1.val();

                            if (c2IndikatorProsesSidang.id === c2nilaiSidang_pemb_proses.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang_pemb_proses.nilai) * parseFloat(c2IndikatorProsesSidang.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai proses sidang 3?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_proses_sidang3_pemb2: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_pemb2/').child(nrpSidang).update({
                nilai_proses_sidang3_pemb2: {
                    id: "nilai_proses_sidang3_pemb2",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Proses Sidang 3 Sebagai Pembimbing 2 disimpan : " + totalSidang.toFixed(2));
        }
    }
}

function HitungTotalNilaiProduk_Pemb2(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang = firebase.database().ref('indikator_nilai_produk/');
    indikator_nilai_sidang.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang = childSnap.val();
                var nilai_pemb_sidang = firebase.database().ref('nilai_pemb2/').child(nrpSidang);
                nilai_pemb_sidang.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang_pemb = childSnap1.val();

                            if (c2IndikatorSidang.id === c2nilaiSidang_pemb.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang_pemb.nilai) * parseFloat(c2IndikatorSidang.bobot));
                                //arrTotalSidang1.push(totalSidang1);
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai produk?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_produk_pemb2: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_pemb2/').child(nrpSidang).update({
                nilai_produk_pemb2: {
                    id: "nilai_produk_pemb2",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Produk Sebagai Pembimbing 2 berhasil tersimpan : " + totalSidang.toFixed(2));

        }
    }
}


//PENGUJI 1

function HitungTotalNilaiSidang1_Peng1(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang = firebase.database().ref('indikator_nilai_sidang1/');
    indikator_nilai_sidang.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang = childSnap.val();
                var nilai_peng1_sidang = firebase.database().ref('nilai_peng1/').child(nrpSidang);
                nilai_peng1_sidang.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang_peng1 = childSnap1.val();

                            if (c2IndikatorSidang.id === c2nilaiSidang_peng1.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang_peng1.nilai) * parseFloat(c2IndikatorSidang.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai sidang 1?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_sidang1_peng1: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_peng1/').child(nrpSidang).update({
                nilai_sidang1_peng1: {
                    id: "nilai_sidang1_peng1",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Sidang 1 Sebagai Penguji 1 disimpan : " + totalSidang.toFixed(2));

        }
    }
}

function HitungTotalNilaiSidang2_Peng1(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang = firebase.database().ref('indikator_nilai_sidang2/');
    indikator_nilai_sidang.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang = childSnap.val();
                var nilai_peng1_sidang = firebase.database().ref('nilai_peng1/').child(nrpSidang);
                nilai_peng1_sidang.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang_peng1 = childSnap1.val();

                            if (c2IndikatorSidang.id === c2nilaiSidang_peng1.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang_peng1.nilai) * parseFloat(c2IndikatorSidang.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai sidang 2?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_sidang2_peng1: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_peng1/').child(nrpSidang).update({
                nilai_sidang2_peng1: {
                    id: "nilai_sidang2_peng1",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Sidang 2 Sebagai Penguji 1 berhasil tersimpan : " + totalSidang.toFixed(2));

        }
    }
}

function HitungTotalNilaiSidang3_Peng1(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang = firebase.database().ref('indikator_nilai_sidang3/');
    indikator_nilai_sidang.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang = childSnap.val();
                var nilai_peng1_sidang = firebase.database().ref('nilai_peng1/').child(nrpSidang);
                nilai_peng1_sidang.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang_peng1 = childSnap1.val();

                            if (c2IndikatorSidang.id === c2nilaiSidang_peng1.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang_peng1.nilai) * parseFloat(c2IndikatorSidang.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai sidang 3?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_sidang3_peng1: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_peng1/').child(nrpSidang).update({
                nilai_sidang3_peng1: {
                    id: "nilai_sidang3_peng1",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Sidang 3 Sebagai Penguji 1 berhasil tersimpan : " + totalSidang.toFixed(2));
        }
    }
}

function HitungTotalNilaiProduk_Peng1(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang = firebase.database().ref('indikator_nilai_produk/');
    indikator_nilai_sidang.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang = childSnap.val();
                var nilai_peng_sidang = firebase.database().ref('nilai_peng1/').child(nrpSidang);
                nilai_peng_sidang.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang_peng = childSnap1.val();

                            if (c2IndikatorSidang.id === c2nilaiSidang_peng.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang_peng.nilai) * parseFloat(c2IndikatorSidang.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai produk?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_produk_peng1: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_peng1/').child(nrpSidang).update({
                nilai_produk_peng1: {
                    id: "nilai_produk_peng1",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Produk Sebagai Penguji 1 berhasil  : " + totalSidang.toFixed(2));

        }
    }
}


//PENGUJI 2

function HitungTotalNilaiSidang1_Peng2(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang = firebase.database().ref('indikator_nilai_sidang1/');
    indikator_nilai_sidang.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang = childSnap.val();
                var nilai_peng1_sidang = firebase.database().ref('nilai_peng2/').child(nrpSidang);
                nilai_peng1_sidang.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang_peng1 = childSnap1.val();

                            if (c2IndikatorSidang.id === c2nilaiSidang_peng1.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang_peng1.nilai) * parseFloat(c2IndikatorSidang.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai sidang 1?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_sidang1_peng2: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_peng2/').child(nrpSidang).update({
                nilai_sidang1_peng2: {
                    id: "nilai_sidang1_peng2",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Sidang 1 Sebagai Penguji 2 disimpan  : " + totalSidang.toFixed(2));

        }
    }
}

function HitungTotalNilaiSidang2_Peng2(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang = firebase.database().ref('indikator_nilai_sidang2/');
    indikator_nilai_sidang.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang = childSnap.val();
                var nilai_peng1_sidang = firebase.database().ref('nilai_peng2/').child(nrpSidang);
                nilai_peng1_sidang.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang_peng1 = childSnap1.val();

                            if (c2IndikatorSidang.id === c2nilaiSidang_peng1.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang_peng1.nilai) * parseFloat(c2IndikatorSidang.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai sidang 2?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_sidang2_peng2: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_peng2/').child(nrpSidang).update({
                nilai_sidang2_peng2: {
                    id: "nilai_sidang2_peng2",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Sidang 2 Sebagai Penguji 2 berhasil  : " + totalSidang.toFixed(2));

        }
    }
}

function HitungTotalNilaiSidang3_Peng2(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang = firebase.database().ref('indikator_nilai_sidang3/');
    indikator_nilai_sidang.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang = childSnap.val();
                var nilai_peng1_sidang = firebase.database().ref('nilai_peng2/').child(nrpSidang);
                nilai_peng1_sidang.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang_peng1 = childSnap1.val();

                            if (c2IndikatorSidang.id === c2nilaiSidang_peng1.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang_peng1.nilai) * parseFloat(c2IndikatorSidang.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai sidang 2?')) {
        return false;
    } else {

        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
        } else {
            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_sidang3_peng2: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_peng2/').child(nrpSidang).update({
                nilai_sidang3_peng2: {
                    id: "nilai_sidang3_peng2",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Sidang 3 Sebagai Penguji 2 berhasil  : " + totalSidang.toFixed(2));
        }
    }
}

function HitungTotalNilaiProduk_Peng2(nrpSidang, idSidang) {
    var totalSidang = 0;

    var indikator_nilai_sidang = firebase.database().ref('indikator_nilai_produk/');
    indikator_nilai_sidang.on("value", function (snap) {
        if (snap.exists()) {
            snap.forEach(function (childSnap) {
                var c2IndikatorSidang = childSnap.val();
                var nilai_peng_sidang = firebase.database().ref('nilai_peng2/').child(nrpSidang);
                nilai_peng_sidang.on("value", function (snap1) {
                    if (snap1.exists()) {
                        snap1.forEach(function (childSnap1) {
                            var c2nilaiSidang_peng = childSnap1.val();

                            if (c2IndikatorSidang.id === c2nilaiSidang_peng.id) {
                                totalSidang = totalSidang + (parseFloat(c2nilaiSidang_peng.nilai) * parseFloat(c2IndikatorSidang.bobot));
                            }
                        });
                    }
                });
            });
        }
    });

    if (!confirm('Simpan nilai produk?')) {
        return false;
    } else {


        if (totalSidang.toFixed(2) == "0.00") {
            alert("Mohon maaf, terjadi kesalahan sistem. Tolong ulangi pengisian nilai. ")
            return false;
        } else {

            firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
                nilai_produk_peng2: totalSidang.toFixed(2)
            });
            firebase.database().ref('nilai_peng2/').child(nrpSidang).update({
                nilai_produk_peng2: {
                    id: "nilai_produk_peng2",
                    nilai: totalSidang.toFixed(2)
                }
            });
            alert("Nilai Produk Sebagai Penguji 2 berhasil  : " + totalSidang.toFixed(2));
        }
    }
}


//NA Sidang1
function HitungNilaiAkhirSidang1(gTopikId, idSidang) {
    var totalProsesSidang1 = 0;
    var totalSidang1 = 0;
    var hasilNilaiAkhirSidang1 = 0;
    var lihatSidangRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang);
    lihatSidangRef.on("value", function (snap) {
        obj = [];
        if (snap.exists()) {
            var obj = snap.val();
            var nilai_proses_sidang1_pemb1 = obj.nilai_proses_sidang1_pemb1;
            var nilai_proses_sidang1_pemb2 = obj.nilai_proses_sidang1_pemb2;
            var nilai_sidang1_pemb1 = obj.nilai_sidang1_pemb1;
            var nilai_sidang1_peng1 = obj.nilai_sidang1_peng1;
            var nilai_sidang1_peng2 = obj.nilai_sidang1_peng2;

//            console.log(nilai_proses_sidang1_pemb1
//                    + " , " + nilai_proses_sidang1_pemb2
//                    + " , " + nilai_sidang1_pemb1
//                    + " , " + nilai_sidang1_peng1
//                    + " , " + nilai_sidang1_peng2)


            totalProsesSidang1 = (parseFloat(nilai_proses_sidang1_pemb1) * 0.5) + (parseFloat(nilai_proses_sidang1_pemb2) * 0.5);
            totalSidang1 = (parseFloat(nilai_sidang1_pemb1) * 0.6) + (parseFloat(nilai_sidang1_peng1) * 0.2) + (parseFloat(nilai_sidang1_peng2) * 0.2);
            hasilNilaiAkhirSidang1 = (parseFloat(totalProsesSidang1) + parseFloat(totalSidang1)) / 2;
        }
    });

    if (isNaN(totalProsesSidang1) || isNaN(totalSidang1) || isNaN(hasilNilaiAkhirSidang1)) {
        totalProsesSidang1 = 0;
        totalSidang1 = 0;
        hasilNilaiAkhirSidang1 = 0;
    }

    firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
        totalProsesSidang1: totalProsesSidang1.toFixed(2),
        totalSidang1: totalSidang1.toFixed(2),
        hasilNilaiAkhirSidang1: hasilNilaiAkhirSidang1.toFixed(2)
    });

    if (hasilNilaiAkhirSidang1 == '0.00') {
        firebase.database().ref('topik/' + tahun_ajaranGlobal).child(gTopikId).update({
            nilaiSidang1: "Belum Lengkap"
        });
    } else {
        firebase.database().ref('topik/' + tahun_ajaranGlobal).child(gTopikId).update({
            nilaiSidang1: hasilNilaiAkhirSidang1.toFixed(2)
        });
    }

    alert("Nilai Sidang 1 berhasil tersimpan");
    location.reload();
}

//NA Sidang2
function HitungNilaiAkhirSidang2(gTopikId, idSidang) {
    var totalProsesSidang2 = 0;
    var totalSidang2 = 0;
    var hasilNilaiAkhirSidang2 = 0;
    var lihatSidangRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang);
    lihatSidangRef.on("value", function (snap) {
        obj = [];
        if (snap.exists()) {
            var obj = snap.val();
            var nilai_proses_sidang2_pemb1 = obj.nilai_proses_sidang2_pemb1;
            var nilai_proses_sidang2_pemb2 = obj.nilai_proses_sidang2_pemb2;
            var nilai_sidang2_pemb1 = obj.nilai_sidang2_pemb1;
            var nilai_sidang2_peng1 = obj.nilai_sidang2_peng1;
            var nilai_sidang2_peng2 = obj.nilai_sidang2_peng2;

            totalProsesSidang2 = (parseFloat(nilai_proses_sidang2_pemb1) * 0.5) + (parseFloat(nilai_proses_sidang2_pemb2) * 0.5);
            totalSidang2 = (parseFloat(nilai_sidang2_pemb1) * 0.6) + (parseFloat(nilai_sidang2_peng1) * 0.2) + (parseFloat(nilai_sidang2_peng2) * 0.2);
            hasilNilaiAkhirSidang2 = (parseFloat(totalProsesSidang2) + parseFloat(totalSidang2)) / 2;
        }
    });


    if (isNaN(totalProsesSidang2) || isNaN(totalSidang2) || isNaN(hasilNilaiAkhirSidang2)) {
        totalProsesSidang2 = 0;
        totalSidang2 = 0;
        hasilNilaiAkhirSidang2 = 0;
    }

    firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
        totalProsesSidang2: totalProsesSidang2.toFixed(2),
        totalSidang2: totalSidang2.toFixed(2),
        hasilNilaiAkhirSidang2: hasilNilaiAkhirSidang2.toFixed(2)
    });

    if (hasilNilaiAkhirSidang2 == 0) {
        firebase.database().ref('topik/' + tahun_ajaranGlobal).child(gTopikId).update({
            nilaiSidang2: "Belum Lengkap"
        });
    } else {
        firebase.database().ref('topik/' + tahun_ajaranGlobal).child(gTopikId).update({
            nilaiSidang2: hasilNilaiAkhirSidang2.toFixed(2)
        });
    }
    alert("Nilai Sidang 2 berhasil tersimpan");
    location.reload();
}

//NA Sidang3
function HitungNilaiAkhirSidang3(gTopikId, idSidang) {
    var totalProsesSidang3 = 0;
    var totalSidang3 = 0;
    var totalProduk = 0;
    var hasilNilaiAkhirSidang3 = 0;
    var lihatSidangRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang);
    lihatSidangRef.on("value", function (snap) {
        obj = [];
        if (snap.exists()) {
            var obj = snap.val();
            var nilai_proses_sidang3_pemb1 = obj.nilai_proses_sidang3_pemb1;
            var nilai_proses_sidang3_pemb2 = obj.nilai_proses_sidang3_pemb2;
            var nilai_sidang3_pemb1 = obj.nilai_sidang3_pemb1;
            var nilai_sidang3_peng1 = obj.nilai_sidang3_peng1;
            var nilai_sidang3_peng2 = obj.nilai_sidang3_peng2;
            var nilai_produk_pemb1 = obj.nilai_produk_pemb1;
            var nilai_produk_pemb2 = obj.nilai_produk_pemb2;
            var nilai_produk_peng1 = obj.nilai_produk_peng1;
            var nilai_produk_peng2 = obj.nilai_produk_peng2;

            totalProsesSidang3 = (parseFloat(nilai_proses_sidang3_pemb1) * 0.5) + (parseFloat(nilai_proses_sidang3_pemb2) * 0.5);
            totalSidang3 = (parseFloat(nilai_sidang3_pemb1) * 0.6) + (parseFloat(nilai_sidang3_peng1) * 0.2) + (parseFloat(nilai_sidang3_peng2) * 0.2);
            totalProduk = (parseFloat(nilai_produk_pemb1) * 0.25) + (parseFloat(nilai_produk_pemb2) * 0.25) + (parseFloat(nilai_produk_peng1) * 0.25) + (parseFloat(nilai_produk_peng2) * 0.25);

            hasilNilaiAkhirSidang3 = (((parseFloat(totalSidang3) + parseFloat(totalProduk)) / 2) + parseFloat(totalProsesSidang3)) / 2;
        }
    });

    if (isNaN(totalProsesSidang3) || isNaN(totalSidang3) || isNaN(totalProduk) || isNaN(hasilNilaiAkhirSidang3)) {
        totalProsesSidang3 = 0;
        totalSidang3 = 0;
        totalProduk = 0;
        hasilNilaiAkhirSidang3 = 0;
    }

    firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
        totalProsesSidang3: totalProsesSidang3.toFixed(2),
        totalSidang3: totalSidang3.toFixed(2),
        totalProduk: totalProduk.toFixed(2),
        hasilNilaiAkhirSidang3: hasilNilaiAkhirSidang3.toFixed(2)
    });

    if (hasilNilaiAkhirSidang3 == 0) {
        firebase.database().ref('topik/' + tahun_ajaranGlobal).child(gTopikId).update({
            nilaiSidang3: "Belum Lengkap"
        });
    } else {
        firebase.database().ref('topik/' + tahun_ajaranGlobal).child(gTopikId).update({
            nilaiSidang3: hasilNilaiAkhirSidang3.toFixed(2)
        });
    }

    alert("Nilai Sidang 3 berhasil tersimpan");
}


//NA TA
function HitungNilaiAkhirTugasAkhirMahasiswa(gTopikId, idSidang) {
    var hasilNilaiAkhirTAMahasiswa = 0;
    var lihatSidangRef = firebase.database().ref('topik/' + tahun_ajaranGlobal).child(gTopikId);
    lihatSidangRef.on("value", function (snap) {
        obj = [];
        if (snap.exists()) {
            var obj = snap.val();
            var nilaiSidang1 = obj.nilaiSidang1;
            var nilaiSidang2 = obj.nilaiSidang2;
            var nilaiSidang3 = obj.nilaiSidang3;

            hasilNilaiAkhirTAMahasiswa = (parseFloat(nilaiSidang1) * 0.3) + (parseFloat(nilaiSidang2) * 0.3) + (parseFloat(nilaiSidang3) * 0.4);
        }
    });

    if (isNaN(hasilNilaiAkhirTAMahasiswa)) {
        hasilNilaiAkhirTAMahasiswa = 0;
    }
    console.log("akhir: ", hasilNilaiAkhirTAMahasiswa)

    firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidang).update({
        hasilNilaiAkhirTAMahasiswa: hasilNilaiAkhirTAMahasiswa.toFixed(2)
    });

    firebase.database().ref('topik/' + tahun_ajaranGlobal).child(gTopikId).update({
        nilaiTA: hasilNilaiAkhirTAMahasiswa.toFixed(2)
    });

    location.reload();
}

