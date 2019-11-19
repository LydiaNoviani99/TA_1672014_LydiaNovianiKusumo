var tahun_ajaranGlobal;
var tempKeyTopik;
var tempAmbilIdTopik;
var dosenTerpilih;
var idTopikSidangP;
var idTopikTopikP;
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

    view_topik_to_assign_sidang();

    $("#filterTahun_Ajaran").change(function () {
        $('#assign_SidangTable').DataTable().clear().draw();
        view_topik_to_assign_sidang();

    });


}

function view_topik_to_assign_sidang() {
    $('#assign_SidangTable').DataTable().clear().draw();
    var p_id = $('#filterTahun_Ajaran option:selected').val();
    $('#assign_SidangTable').DataTable().clear().draw();
    tahun_ajaranGlobal = p_id;
//            console.log(tahun_ajaranGlobal);

    if (p_id == "-") {
        $('#assign_SidangTable').DataTable().clear().draw();
    } else {
        var assignSidangDataRef = firebase.database().ref('topik/' + tahun_ajaranGlobal);
        assignSidangDataRef.on("value", function (snap) {
            obj = [];
            if (snap.exists()) {
                obj = [];
                snap.forEach(function (childSnap) {
                    var c2 = childSnap.val();
                    obj2 = {'id_topik': c2.id,
                        'tanggal': c2.tanggal,
                        'jam_mulai': c2.jam_mulai,
                        'tempat': c2.tempat,
                        'mahasiswa': c2.mahasiswa,
                        'tahun_ajaran': c2.tahun_ajaran,
                        'judul_topik': c2.judul_topik,
                        'dosen_pembimbing1': c2.dosen_pembimbing1,
                        'dosen_pembimbing2': c2.dosen_pembimbing2,
                        'dosen_penguji1': c2.dosen_penguji1,
                        'dosen_penguji2': c2.dosen_penguji2,
                        'catatan_sidang': c2.catatan_sidang,
                        'nilaiSidang1': c2.nilaiSidang1,
                        'nilaiSidang2': c2.nilaiSidang2,
                        'nilaiSidang3': c2.nilaiSidang3,
                        'nilaiMutu': c2.nilaiMutu
                    };
                    obj.push(obj2)
                });
            }
            addAssignSidang(obj);
        });
    }
}

function addAssignSidang(data) {
    $('#assign_sidangTable').DataTable().clear().draw();
    $('#assign_sidangTable').DataTable().rows.add(data).draw();
}

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
//            addTable(obj);
        addComboDosenPembimbingSatu(obj);
        addComboDosenPembimbingDua(obj);
        addComboDosenPengujiSatu(obj);
        addComboDosenPengujiDua(obj);
    }
});


function addComboDosenPembimbingSatu(data) {
    $('#comboSidangDosenPemb1').empty();
    $('#comboSidangDosenPemb1')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Dosen Pembimbing 1--"));
    $.each(data, function (key, value) {
        $('#comboSidangDosenPemb1')
                .append($("<option></option>")
                        .attr("value", value.nik)
                        .text(value.nik + ' - ' + value.name));
    });
}

function addComboDosenPembimbingDua(data) {
    $('#comboSidangDosenPemb2').empty();
    $('#comboSidangDosenPemb2')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Dosen Pembimbing 2--"));
    $.each(data, function (key, value) {
        $('#comboSidangDosenPemb2')
                .append($("<option></option>")
                        .attr("value", value.nik)
                        .text(value.nik + ' - ' + value.name));
    });
}


function addComboDosenPengujiSatu(data) {
    $('#comboSidangDosenPeng1').empty();
    $('#comboSidangDosenPeng1')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Dosen Penguji 1--"));
    $.each(data, function (key, value) {
        $('#comboSidangDosenPeng1')
                .append($("<option></option>")
                        .attr("value", value.nik)
                        .text(value.nik + ' - ' + value.name));
    });
}

function addComboDosenPengujiDua(data) {
    $('#comboSidangDosenPeng2').empty();
    $('#comboSidangDosenPeng2')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Dosen Penguji 2--"));
    $.each(data, function (key, value) {
        $('#comboSidangDosenPeng2')
                .append($("<option></option>")
                        .attr("value", value.nik)
                        .text(value.nik + ' - ' + value.name));
    });
}

var gMahasiswaNrp = "-";
var gMahasiswaName = "-";
var gTopikJudulTopik = "-";
var gDosenPemb1Nik = "-";
var gDosenPemb1Name = "-";
var gDosenPemb2Nik = "-";
var gDosenPemb2Name = "-";
var gSidangId = "-";
var gDosenPeng1Nik = "-";
var gDosenPeng1Name = "-";
var gDosenPeng2Nik = "-";
var gDosenPeng2Name = "-";
var gSidangTanggal = "-";
var gSidangJam = "-";
var gSidangRuangan = "-";
var gSidangCatatan = "-";
var idSidangDetail = "-";
function lihatDetailSidang(id) {
    $('#lihatDetailSidang').modal('show');
    var lihatSidangRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal);
    lihatSidangRef.on("value", function (snap) {
        obj = [];
        if (snap.exists()) {
            obj2 = [];
            snap.forEach(function (childSnap) {
                var c2 = childSnap.val();
                obj2 = {
                    'sidangId': c2.sidangId,
                    'sidangName': c2.sidangName,
                    'tanggal': c2.tanggal,
                    'jam_mulai': c2.jam_mulai,
                    'ruangan': c2.ruangan,
                    'idTopik': c2.idTopik,
                    'dosen_penguji1': c2.dosen_penguji1,
                    'dosen_penguji2': c2.dosen_penguji2
                };
                idSidangDetail = c2.sidangId;

                if (c2.idTopik === id) {
                    var detailTopikDataRef = firebase.database().ref('topik/' + tahun_ajaranGlobal).child(id);
                    detailTopikDataRef.on("value", function (snap) {
                        objTopik = [];
                        if (snap.exists()) {
                            var objTopik = snap.val();
                            gId = objTopik.id;
                            gMahasiswaNrp = objTopik.mahasiswa.nrp;
                            gMahasiswaName = objTopik.mahasiswa.name;
                            gTopikJudulTopik = objTopik.judul_topik;
                            gDosenPemb1Nik = objTopik.dosen_pembimbing1.nik;
                            gDosenPemb1Name = objTopik.dosen_pembimbing1.name;
                            gDosenPemb2Nik = objTopik.dosen_pembimbing2.nik;
                            gDosenPemb2Name = objTopik.dosen_pembimbing2.name;
                        }

                        var lihatSidangRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idSidangDetail);
                        lihatSidangRef.on("value", function (snap) {

                            objSidang = [];
                            if (snap.exists()) {
                                var objSidang = snap.val();
                                gSidangId = objSidang.sidangId;
                                gSidangName = objSidang.sidangName;
                                gDosenPeng1Nik = objSidang.dosen_penguji1.nik;
                                gDosenPeng1Name = objSidang.dosen_penguji1.name;
                                gDosenPeng2Nik = objSidang.dosen_penguji2.nik;
                                gDosenPeng2Name = objSidang.dosen_penguji2.name;
                                gSidangTanggal = objSidang.tanggal;
                                gSidangJam = objSidang.jam_mulai;
                                gSidangRuangan = objSidang.ruangan;
                                gSidangCatatan = objSidang.catatan;
                            }
                        });



                        document.getElementById('lihatNrp').innerHTML = gMahasiswaNrp;
                        document.getElementById('lihatNama').innerHTML = gMahasiswaName;
                        document.getElementById('lihatJudulTopik').innerHTML = gTopikJudulTopik;
                        document.getElementById('lihatDosenPembimbing1').innerHTML = gDosenPemb1Nik + " - " + gDosenPemb1Name;
                        document.getElementById('lihatDosenPembimbing2').innerHTML = gDosenPemb2Nik + " - " + gDosenPemb2Name;

                        if (gSidangName === "Sidang 1") {
                            document.getElementById('lihatDosenPenguji1').innerHTML = gDosenPeng1Nik + " - " + gDosenPeng1Name;
                            document.getElementById('lihatDosenPenguji2').innerHTML = gDosenPeng2Nik + " - " + gDosenPeng2Name;
                            document.getElementById('lihatTanggalSidang').innerHTML = gSidangTanggal;
                            document.getElementById('lihatJamSidang').innerHTML = gSidangJam;
                            document.getElementById('lihatRuanganSidang').innerHTML = gSidangRuangan;
                            document.getElementById('lihatCatatanSidang').innerHTML = gSidangCatatan;
                        } else if (gSidangName === "Sidang 2") {
                            document.getElementById('lihat2DosenPenguji1').innerHTML = gDosenPeng1Nik + " - " + gDosenPeng1Name;
                            document.getElementById('lihat2DosenPenguji2').innerHTML = gDosenPeng2Nik + " - " + gDosenPeng2Name;
                            document.getElementById('lihat2TanggalSidang').innerHTML = gSidangTanggal;
                            document.getElementById('lihat2JamSidang').innerHTML = gSidangJam;
                            document.getElementById('lihat2RuanganSidang').innerHTML = gSidangRuangan;
                            document.getElementById('lihat2CatatanSidang').innerHTML = gSidangCatatan;
                        } else if (gSidangName === "Sidang 3") {
                            document.getElementById('lihat3DosenPenguji1').innerHTML = gDosenPeng1Nik + " - " + gDosenPeng1Name;
                            document.getElementById('lihat3DosenPenguji2').innerHTML = gDosenPeng2Nik + " - " + gDosenPeng2Name;
                            document.getElementById('lihat3TanggalSidang').innerHTML = gSidangTanggal;
                            document.getElementById('lihat3JamSidang').innerHTML = gSidangJam;
                            document.getElementById('lihat3RuanganSidang').innerHTML = gSidangRuangan;
                            document.getElementById('lihat3CatatanSidang').innerHTML = gSidangCatatan;
                        }
                        $(".close").on("click", function () {

                            document.getElementById('lihatNrp').innerHTML = "";
                            document.getElementById('lihatNama').innerHTML = "";
                            document.getElementById('lihatJudulTopik').innerHTML = "";
                            document.getElementById('lihatDosenPembimbing1').innerHTML = "";
                            document.getElementById('lihatDosenPembimbing2').innerHTML = "";

                            document.getElementById('lihatDosenPenguji1').innerHTML = "";
                            document.getElementById('lihatDosenPenguji2').innerHTML = "";
                            document.getElementById('lihatTanggalSidang').innerHTML = "";
                            document.getElementById('lihatJamSidang').innerHTML = "";
                            document.getElementById('lihatRuanganSidang').innerHTML = "";
                            document.getElementById('lihatCatatanSidang').innerHTML = "";
                            document.getElementById('lihat2DosenPenguji1').innerHTML = "";
                            document.getElementById('lihat2DosenPenguji2').innerHTML = "";
                            document.getElementById('lihat2TanggalSidang').innerHTML = "";
                            document.getElementById('lihat2JamSidang').innerHTML = "";
                            document.getElementById('lihat2RuanganSidang').innerHTML = "";
                            document.getElementById('lihat2CatatanSidang').innerHTML = "";
                            document.getElementById('lihat3DosenPenguji1').innerHTML = "";
                            document.getElementById('lihat3DosenPenguji2').innerHTML = "";
                            document.getElementById('lihat3TanggalSidang').innerHTML = "";
                            document.getElementById('lihat3JamSidang').innerHTML = "";
                            document.getElementById('lihat3RuanganSidang').innerHTML = "";
                            document.getElementById('lihat3CatatanSidang').innerHTML = "";
                        });
                    });
                }
            });
        }
    });
}

function assignSidang1(id, nrp, sidangId) {
    tempKeyTopik = id;
    $('#sidang1Modal').modal('show');
    var ta_id = $('#filterTahun_Ajaran option:selected').val();

    var assign_Sidang1DataRef = firebase.database().ref('topik/' + ta_id + '/' + tempKeyTopik);

    var ambilIdTopikRef = firebase.database().ref('topik/' + tahun_ajaranGlobal);
    var idAmbilTopik = ambilIdTopikRef.getKey();

    assign_Sidang1DataRef.on('value', function (snap) {
        obj = [];
        if (snap.exists()) {
            var obj = snap.val();
//            var gSidangId = "sidang_1";
            var gSidangName = "Sidang 1";
            var gSidangMhsNrp = obj.mahasiswa.nrp;
            var gSidangMhsName = obj.mahasiswa.name;
            var gSidangJudulTopik = obj.judul_topik;
            var gSidangDosenPemb1Nik = obj.dosen_pembimbing1.nik;
            var gSidangDosenPemb1Name = obj.dosen_pembimbing1.name;
            var gSidangDosenPemb2Nik = obj.dosen_pembimbing2.nik;
            var gSidangDosenPemb2Name = obj.dosen_pembimbing2.name;
            var gSidangTanggal = obj.tanggal;
            var gSidangJam = obj.jam_mulai;
            var gSidangRuangan = obj.ruangan;
        }

        $('#txtSidang1Jenis').val(gSidangName);
        $('#txtSidang1Jenis').attr("disabled", "true");

        $('#txtSidang1Mahasiswa').val(gSidangMhsNrp + " - " + gSidangMhsName);
        $('#txtSidang1Mahasiswa').attr("disabled", "true");

        $('#txtSidang1Topik').val(gSidangJudulTopik);
        $('#txtSidang1Topik').attr("disabled", "true");

        $('#comboSidangDosenPemb1').val(gSidangDosenPemb1Nik);
        $('#comboSidangDosenPemb1').attr("disabled", "true");

        $('#comboSidangDosenPemb2').val(gSidangDosenPemb2Nik);
        $('#comboSidangDosenPemb2').attr("disabled", "true");
    });



    var ambilIdTopikRef = firebase.database().ref('topik/' + tahun_ajaranGlobal).child(id);
    tempAmbilIdTopik = ambilIdTopikRef.getKey();
}


var hasilNilaiAkhirSidang1;
var hasilNilaiAkhirSidang2;
var hasilNilaiAkhirSidang3;
function assignSidang2(id, nrp, sidangId) {
    tempKeyTopik = id;
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
                    'nilaiSidang3': c2.nilaiSidang3
                };

                if (nrp == c2.mahasiswa.nrp) {
                    if (c2.nilaiSidang1 !== '0.00' && typeof c2.nilaiSidang1 !== 'undefined' && c2.nilaiSidang1 !== 'Belum Lengkap' && c2.nilaiSidang1 !== "-") {
                        console.log(c2.nilaiSidang1)
                        $('#sidang1Modal').modal('show');
                        var ta_id = $('#filterTahun_Ajaran option:selected').val();

                        var assign_Sidang1DataRef = firebase.database().ref('topik/' + ta_id + '/' + tempKeyTopik);

                        var ambilIdTopikRef = firebase.database().ref('topik/' + tahun_ajaranGlobal);
                        var idAmbilTopik = ambilIdTopikRef.getKey();

                        assign_Sidang1DataRef.on('value', function (snap) {
                            obj = [];
                            if (snap.exists()) {
                                var obj = snap.val();
                                var gSidangId = "sidang_2";
                                var gSidangName = "Sidang 2";
                                var gSidangMhsNrp = obj.mahasiswa.nrp;
                                var gSidangMhsName = obj.mahasiswa.name;
                                var gSidangJudulTopik = obj.judul_topik;
                                var gSidangDosenPemb1Nik = obj.dosen_pembimbing1.nik;
                                var gSidangDosenPemb1Name = obj.dosen_pembimbing1.name;
                                var gSidangDosenPemb2Nik = obj.dosen_pembimbing2.nik;
                                var gSidangDosenPemb2Name = obj.dosen_pembimbing2.name;
                            }

                            $('#txtSidang1Jenis').val(gSidangName);
                            $('#txtSidang1Jenis').attr("disabled", "true");

                            $('#txtSidang1Mahasiswa').val(gSidangMhsNrp + " - " + gSidangMhsName);
                            $('#txtSidang1Mahasiswa').attr("disabled", "true");

                            $('#txtSidang1Topik').val(gSidangJudulTopik);
                            $('#txtSidang1Topik').attr("disabled", "true");

                            $('#comboSidangDosenPemb1').val(gSidangDosenPemb1Nik);
                            $('#comboSidangDosenPemb1').attr("disabled", "true");

                            $('#comboSidangDosenPemb2').val(gSidangDosenPemb2Nik);
                            $('#comboSidangDosenPemb2').attr("disabled", "true");
                        });

                        var ambilIdTopikRef = firebase.database().ref('topik/' + tahun_ajaranGlobal).child(id);
                        tempAmbilIdTopik = ambilIdTopikRef.getKey();
                    } else {
                        alert("Lengkapi Sidang 1 terlebih dahulu");
                    }
                }
            });
        }
    });
}

function assignSidang3(id, nrp, sidangId) {
    tempKeyTopik = id;
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
                    'nilaiSidang3': c2.nilaiSidang3
                };
                if (nrp == c2.mahasiswa.nrp) {
                    if (c2.nilaiSidang2 !== '0.00' && typeof c2.nilaiSidang2 !== 'undefined' && c2.nilaiSidang2 !== 'Belum Lengkap' && c2.nilaiSidang2 !== "-") {
                        $('#sidang1Modal').modal('show');
                        var ta_id = $('#filterTahun_Ajaran option:selected').val();

                        var assign_Sidang1DataRef = firebase.database().ref('topik/' + ta_id + '/' + tempKeyTopik);

                        var ambilIdTopikRef = firebase.database().ref('topik/' + tahun_ajaranGlobal);
                        var idAmbilTopik = ambilIdTopikRef.getKey();

                        assign_Sidang1DataRef.on('value', function (snap) {
                            obj = [];
                            if (snap.exists()) {
                                var obj = snap.val();
                                var gSidangId = "sidang_3";
                                var gSidangName = "Sidang 3";
                                var gSidangMhsNrp = obj.mahasiswa.nrp;
                                var gSidangMhsName = obj.mahasiswa.name;
                                var gSidangJudulTopik = obj.judul_topik;
                                var gSidangDosenPemb1Nik = obj.dosen_pembimbing1.nik;
                                var gSidangDosenPemb1Name = obj.dosen_pembimbing1.name;
                                var gSidangDosenPemb2Nik = obj.dosen_pembimbing2.nik;
                                var gSidangDosenPemb2Name = obj.dosen_pembimbing2.name;
                            }

                            $('#txtSidang1Jenis').val(gSidangName);
                            $('#txtSidang1Jenis').attr("disabled", "true");

                            $('#txtSidang1Mahasiswa').val(gSidangMhsNrp + " - " + gSidangMhsName);
                            $('#txtSidang1Mahasiswa').attr("disabled", "true");

                            $('#txtSidang1Topik').val(gSidangJudulTopik);
                            $('#txtSidang1Topik').attr("disabled", "true");

                            $('#comboSidangDosenPemb1').val(gSidangDosenPemb1Nik);
                            $('#comboSidangDosenPemb1').attr("disabled", "true");

                            $('#comboSidangDosenPemb2').val(gSidangDosenPemb2Nik);
                            $('#comboSidangDosenPemb2').attr("disabled", "true");
                        });

                        var ambilIdTopikRef = firebase.database().ref('topik/' + tahun_ajaranGlobal).child(id);
                        tempAmbilIdTopik = ambilIdTopikRef.getKey();
                    } else {
                        alert("Lengkapi Sidang 2 terlebih dahulu")
                    }
                }
            });
        }
    });

}
var idAssignSidang;
var nrp_topik;
var name_topik;
var pemb1_topik;
var pemb12_topik;
$("#btnSaveSidang1").click(function () {
    var action = $("#btnSaveSidang1").text();

    var gSidangName = $('#txtSidang1Jenis').val();

    var txtMahasiswa = $('#txtSidang1Mahasiswa').val();

    var comboSidang1DosenPeng1 = $('#comboSidangDosenPeng1 option:selected').text();
    var comboSidang1DosenPeng2 = $('#comboSidangDosenPeng2 option:selected').text();

    var nikSidang1DosenPeng1 = "-";
    var nameSidang1DosenPeng1 = "-";
    var nikSidang1DosenPeng2 = "-";
    var nameSidang1DosenPeng2 = "-";


    if (comboSidang1DosenPeng1 === "--Pilih Dosen Penguji 1--") {
        nikSidang1DosenPeng1 = "-";
        nameSidang1DosenPeng1 = "-";
    } else {
        nikSidang1DosenPeng1 = comboSidang1DosenPeng1.substr(0, comboSidang1DosenPeng1.indexOf(' -'));
        nameSidang1DosenPeng1 = comboSidang1DosenPeng1.substr(comboSidang1DosenPeng1.indexOf('-') + 2);
    }

    if (comboSidang1DosenPeng2 === "--Pilih Dosen Penguji 2--") {
        nikSidang1DosenPeng2 = "-";
        nameSidang1DosenPeng2 = "-";
    } else {
        nikSidang1DosenPeng2 = comboSidang1DosenPeng2.substr(0, comboSidang1DosenPeng2.indexOf(' -'));
        nameSidang1DosenPeng2 = comboSidang1DosenPeng2.substr(comboSidang1DosenPeng2.indexOf('-') + 2);
    }

    var gSidangTanggal = $('#txtSidang1Tanggal').val();
    var gSidangJam = $('#txtSidang1Jam').val();
    var gSidangRuangan = $('#txtSidang1Ruangan').val();
    var gSidangCatatan = $('#txtSidang1Catatan').val();


    var topikDataRef = firebase.database().ref('topik/' + tahun_ajaranGlobal);
    topikDataRef.on('value', function (snap) {
        obj = [];
        if (snap.exists()) {
            obj = [];
            snap.forEach(function (childSnap) {
                var c2 = childSnap.val();
                obj2 = {'id': c2.id, 'judul_topik': c2.judul_topik, 'mahasiswa': c2.mahasiswa,
                    'dosen_pembimbing1': c2.dosen_pembimbing1, 'dosen_pembimbing2': c2.dosen_pembimbing2};

                if (c2.id == tempAmbilIdTopik) {
                    nrp_topik = c2.mahasiswa.nrp;
                    name_topik = c2.mahasiswa.name;
                    pemb1_topik = c2.dosen_pembimbing1;
                    pemb2_topik = c2.dosen_pembimbing2;

                }
            });
        }
    });

    idAssignSidang = firebase.database().ref().child('assign_sidang').push().key;
    firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal).child(idAssignSidang).set({
        sidangId: idAssignSidang,
        sidangName: gSidangName,
        dosen_penguji1: {
            name: nameSidang1DosenPeng1,
            nik: nikSidang1DosenPeng1
        },
        dosen_penguji2: {
            name: nameSidang1DosenPeng2,
            nik: nikSidang1DosenPeng2
        },
        tanggal: gSidangTanggal,
        jam_mulai: gSidangJam,
        ruangan: gSidangRuangan,
        catatan: gSidangCatatan,
        idTopik: tempAmbilIdTopik
    });
    alert("Data berhasil tersimpan");
});