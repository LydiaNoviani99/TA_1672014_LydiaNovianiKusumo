var tempKeyTopik;
var tahun_ajaranGlobal;
$(document).ready(function () {
    $('#mahasiswaTableTopik').val('');
    var mahasiswaDataRef = firebase.database().ref('mahasiswa/');
    mahasiswaDataRef.on('value', function (snap) {
        if (snap.exists()) {
            obj = [];
            snap.forEach(function (childSnap) {
                var c2 = childSnap.val();
                obj2 = {'nrp': c2.nrp, 'name': c2.name};
                obj.push(obj2);
            });
            addTableMahasiswa(obj);
        }
    });

    function addTableMahasiswa(data) {
        $('#mahasiswaTableTopik').DataTable().clear().draw();
        $('#mahasiswaTableTopik').DataTable().rows.add(data).draw();
    }

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

        var obj = [];
        var obj2 = [];
        var objMhs = [];
        var obj2Mhs = [];

        viewTopik();

        function viewTopik() {

            $('#topikTable').DataTable().clear().draw();
            var p_id = $('#filterTahun_Ajaran option:selected').val();
            $('#topikTable').DataTable().clear().draw();
            tahun_ajaranGlobal = p_id;
            console.log("TAHUN :" + tahun_ajaranGlobal);

            if (p_id == "-") {
                $('#topikTable').DataTable().clear().draw();
            } else {
                var topikDataRef = firebase.database().ref('topik/' + tahun_ajaranGlobal);
                topikDataRef.on('value', function (snap) {
                    obj = [];
                    if (snap.exists()) {
                        obj = [];
                        snap.forEach(function (childSnap) {
                            var c2 = childSnap.val();
                            obj2 = {'id': c2.id,
                                'judul_topik': c2.judul_topik,
                                'mahasiswa': c2.mahasiswa,
                                'dosen_pembimbing1': c2.dosen_pembimbing1,
                                'dosen_pembimbing2': c2.dosen_pembimbing2};

                            obj.push(obj2);
                            addTopik(obj);
                        });
                    }
                });
            }
        }

        $("#filterTahun_Ajaran").change(function () {
            viewTopik();
        });
        function addTopik(data) {
            $('#topikTable').DataTable().clear().draw();
            $('#topikTable').DataTable().rows.add(data).draw();
        }
    }

    $("#btn-newTopik").click(function () {
//        $('#comboTahun_Ajaran').val('');
        $('#mahasiswaTableTopik').val('');
        $('#txtTopikJudul').val('');
        $('#comboTopikDosenPemb1').val('-');
        $('#comboTopikDosenPemb2').val('-');
    });
});

var tahun_AjaranDataRef = firebase.database().ref().child('tahun_ajaran');
tahun_AjaranDataRef.on('value', function (snap) {
    if (snap.exists()) {
        obj = [];
        snap.forEach(function (childSnap) {
            var c2 = childSnap.val();
//                console.log(c2);
            obj2 = {'idx': c2.id, 'name': c2.name, 'status': c2.status};
            obj.push(obj2);
        });
//            addTable(obj);
        addComboTahun_Ajaran(obj);
    }
});
function addComboTahun_Ajaran(data) {
    $('#comboTahun_Ajaran').empty();
    $('#comboTahun_Ajaran')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Tahun Ajaran--"));
    $.each(data, function (key, value) {
        $('#comboTahun_Ajaran')
                .append($("<option></option>")
                        .attr("value", value.idx)
                        .text(value.name));
    });
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
    }
});

function addComboDosenPembimbingSatu(data) {
    $('#comboTopikDosenPemb1').empty();
    $('#comboTopikDosenPemb1')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Dosen Pembimbing 1--"));
    $.each(data, function (key, value) {
        $('#comboTopikDosenPemb1')
                .append($("<option></option>")
                        .attr("value", value.nik)
                        .text(value.nik + ' - ' + value.name));
    });
}

function addComboDosenPembimbingDua(data) {
    $('#comboTopikDosenPemb2').empty();
    $('#comboTopikDosenPemb2')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Dosen Pembimbing 2--"));
    $.each(data, function (key, value) {
        $('#comboTopikDosenPemb2')
                .append($("<option></option>")
                        .attr("value", value.nik)
                        .text(value.nik + ' - ' + value.name));
    });
}

$("#btn-newTopik").click(function () {
    $("#topikModal").removeClass('hide_block');
    document.getElementById("divTabelPilihMhs").style.display = "block";
    document.getElementById("divMahasiswa").style.display = "none";

    $('#comboTahun_Ajaran').val($('#filterTahun_Ajaran option:selected').text());
    $('#comboTahun_Ajaran').attr("disabled", "true");
});



//Save
$("#btnSaveTopik").click(function () {
    var action = $("#btnSaveTopik").text();
//    alert(action);
    if (action == "Simpan Topik") {
        $.map($('#mahasiswaTableTopik').DataTable().rows('.selected').data(), function (item) {
            nrp = item.nrp;
            name = item.name;
            var idTopik = firebase.database().ref().child('topik').push().key;
            var txtTopikJudul = $('#txtTopikJudul').val();
            var comboTopikDosenPemb1 = $('#comboTopikDosenPemb1 option:selected').text();
            var comboTopikDosenPemb2 = $('#comboTopikDosenPemb2 option:selected').text();
            var nikTopikDosenPemb1 = "-";
            var nameTopikDosenPemb1 = "-";
            var nikTopikDosenPemb2 = "-";
            var nameTopikDosenPemb2 = "-";

            if (comboTopikDosenPemb1 === "--Pilih Dosen Pembimbing 1--") {
                nikTopikDosenPemb1 = "-";
                nameTopikDosenPemb1 = "-";
            } else {
                nikTopikDosenPemb1 = comboTopikDosenPemb1.substr(0, comboTopikDosenPemb1.indexOf(' -'));
                nameTopikDosenPemb1 = comboTopikDosenPemb1.substr(comboTopikDosenPemb1.indexOf('- ') + 2);
            }

            if (comboTopikDosenPemb2 === "--Pilih Dosen Pembimbing 2--") {
                nikTopikDosenPemb2 = "-";
                nameTopikDosenPemb2 = "-";
            } else {
                nikTopikDosenPemb2 = comboTopikDosenPemb2.substr(0, comboTopikDosenPemb2.indexOf(' -'));
                nameTopikDosenPemb2 = comboTopikDosenPemb2.substr(comboTopikDosenPemb2.indexOf('- ') + 2);
            }

            if (nrp != ''
                    && name != ''
                    && txtTopikJudul != ''
                    && nikTopikDosenPemb1 != ''
                    && nameTopikDosenPemb1 != ''
                    && nikTopikDosenPemb2 != ''
                    && nameTopikDosenPemb2 != '') {
                firebase.database().ref('topik/').child(tahun_ajaranGlobal).child(idTopik).set({
                    id: idTopik,
                    judul_topik: txtTopikJudul,
                    mahasiswa: {
                        name: name,
                        nrp: nrp
                    },
                    dosen_pembimbing1: {
                        name: nameTopikDosenPemb1,
                        nik: nikTopikDosenPemb1
                    },
                    dosen_pembimbing2: {
                        name: nameTopikDosenPemb2,
                        nik: nikTopikDosenPemb2
                    },
                    nilaiSidang1: "-",
                    nilaiSidang2: "-",
                    nilaiSidang3: "-"
                });
                alert("Data berhasil tersimpan");
            } else {
                alert("Masih belum lengkap");
            }
        });
    } else {
        var txtMahasiswa = $('#txtTopikMahasiswaUpdate').val();
        var txtTopikNrp = txtMahasiswa.substr(0, txtMahasiswa.indexOf(' -'));
        var txtTopikName = txtMahasiswa.substr(txtMahasiswa.indexOf('- ') + 2);
        var txtTopikJudul = $('#txtTopikJudul').val();

        var comboTopikDosenPemb1Nik = $('#comboTopikDosenPemb1 option:selected').val();

        var comboTopikDosenPemb2Nik = $('#comboTopikDosenPemb2 option:selected').val();


        var comboTopikDosenPemb1 = $('#comboTopikDosenPemb1 option:selected').text();
        var comboTopikDosenPemb2 = $('#comboTopikDosenPemb2 option:selected').text();
        var nikTopikDosenPemb1 = "-";
        var nameTopikDosenPemb1 = "-";
        var nikTopikDosenPemb2 = "-";
        var nameTopikDosenPemb2 = "-";

        if (comboTopikDosenPemb1 === "--Pilih Dosen Pembimbing 1--") {
            nikTopikDosenPemb1 = "-";
            nameTopikDosenPemb1 = "-";
        } else {
            nikTopikDosenPemb1 = comboTopikDosenPemb1.substr(0, comboTopikDosenPemb1.indexOf(' -'));
            nameTopikDosenPemb1 = comboTopikDosenPemb1.substr(comboTopikDosenPemb1.indexOf('- ') + 2);
        }

        if (comboTopikDosenPemb2 === "--Pilih Dosen Pembimbing 2--") {
            nikTopikDosenPemb2 = "-";
            nameTopikDosenPemb2 = "-";
        } else {
            nikTopikDosenPemb2 = comboTopikDosenPemb2.substr(0, comboTopikDosenPemb2.indexOf(' -'));
            nameTopikDosenPemb2 = comboTopikDosenPemb2.substr(comboTopikDosenPemb2.indexOf('- ') + 2);
        }
        if (txtMahasiswa != ''
                && txtTopikJudul != ''
                && comboTopikDosenPemb2Nik != '')
        {

            firebase.database().ref('topik/').child(tahun_ajaranGlobal).child(tempKeyTopik).update({
                judul_topik: txtTopikJudul,
                mahasiswa: {
                    name: txtTopikName,
                    nrp: txtTopikNrp
                },
                dosen_pembimbing1: {
                    name: nameTopikDosenPemb1,
                    nik: nikTopikDosenPemb1
                },
                dosen_pembimbing2: {
                    name: nameTopikDosenPemb2,
                    nik: nikTopikDosenPemb2
                }
            });
            alert("Data berhasil terbaharui");
            $('#mahasiswaTableTopik').val('');
        } else {
            alert("Masih belum lengkap");
        }
    }
    $('#topikModal').removeData();
//    $("#btnSaveTopik").prop('value', "Simpan");
    $('#topikModal').modal('hide');
});

function fetchMahasiswaData(callback, element) {
    var mahasiswaDataRef = firebase.database().ref('mahasiswa/');
    mahasiswaDataRef.on('value', function (snap) {
        if (snap.exists()) {
            obj = [];
            snap.forEach(function (childSnap) {
                var c2 = childSnap.val();
//                console.log(c2);
                obj2 = {'nrp': c2.nrp, 'name': c2.name};
                obj.push(obj2);
            });
            callback(element, obj);
        }
    });

}
function putMahasiswaDataToTable(element, data) {
    $('#' + element).DataTable().clear().draw();
    $('#' + element).DataTable().rows.add(data).draw();
}


function updateTopik(id, nrp) {
    console.log(id + nrp)
    var tahun_ajaranGlobal = $('#filterTahun_Ajaran').val();
    $('#topikModal').modal('show');

    tempKeyTopik = id;
    document.getElementById("divMahasiswa").style.display = "block";

    document.getElementById("tambah").innerHTML = "Ubah";
    document.getElementById("update").innerHTML = "Ubah";

    var tulisanHeaderModal = $("#tambah").text();
    if (tulisanHeaderModal == "Tambah") {
        document.getElementById("divTabelPilihMhs").style.display = "block";
    } else {
        document.getElementById("divTabelPilihMhs").style.display = "none";
    }

    var topikDataRef = firebase.database().ref('topik/').child(tahun_ajaranGlobal).child(tempKeyTopik);
    topikDataRef.on('value', function (snap) {
        obj = [];
        if (snap.exists()) {
            var obj = snap.val();
            var gId = obj.id;
            var gMahasiswaNrp = obj.mahasiswa.nrp;
            var gMahasiswaName = obj.mahasiswa.name;
            var gTopikJudulTopik = obj.judul_topik;
            var gDosenPemb1Nik = obj.dosen_pembimbing1.nik;
            var gDosenPemb1Name = obj.dosen_pembimbing1.name;
            var gDosenPemb2Nik = obj.dosen_pembimbing2.nik;
            var gDosenPemb2Name = obj.dosen_pembimbing2.name;
        }

        $('#comboTahun_Ajaran').val($('#filterTahun_Ajaran option:selected').text());
        $('#comboTahun_Ajaran').attr("disabled", "true");
        $('#txtTopikMahasiswaUpdate').val(gMahasiswaNrp + " - " + gMahasiswaName);
        $('#txtTopikMahasiswaUpdate').attr('disabled', true);
        $('#txtTopikJudul').val(gTopikJudulTopik);
        $('#comboTopikDosenPemb1').val(gDosenPemb1Nik);
        $('#comboTopikDosenPemb2').val(gDosenPemb2Nik);

        $("#btnSaveTopik").prop('value', 'Ubah');
    });
    return false;
}

function deleteTopik(id) {
    var topikDataRef = firebase.database().ref().child('topik/' + tahun_ajaranGlobal).child(id);
    if (!confirm('Apakah anda yakin akan menghapus ?')) {
        return false;
    }
    topikDataRef.remove();
    alert("Data berhasil terhapus");
}