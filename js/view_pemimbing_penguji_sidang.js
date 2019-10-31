
var tahun_ajaranGlobal;
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
    
    viewDataSidangSebagaiPembimbing();
    viewDataSidangSebagaiPenguji();


    tahun_ajaranGlobal = $('#filterTahun_Ajaran option:selected').val();

    $("#filterTahun_Ajaran").change(function () {
        viewDataSidangSebagaiPembimbing();
        viewDataSidangSebagaiPenguji();
    });

    $("#filterDosen").change(function () {
        viewDataSidangSebagaiPembimbing();
        viewDataSidangSebagaiPenguji();
    });
}

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
    var objSidang = [];
    var obj2Sidang = [];
}

function viewDataSidangSebagaiPembimbing() {
    $('#sidangSebagaiPembimbing').DataTable().clear().draw();
    var dosenTerpilih = $('#filterDosen option:selected').val();
    $('#sidangSebagaiPembimbing').DataTable().clear().draw();

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
                            'dosen_pembimbing1': c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name,
                            'dosen_pembimbing2': c2T.dosen_pembimbing2.nik + " - " + c2T.dosen_pembimbing2.name,
                            'sidangName': c21.sidangName,
                            'dosen_penguji1': c21.dosen_penguji1,
                            'dosen_penguji2': c21.dosen_penguji2};
//                        console.log("My data: " + c2T.dosen_pembimbing1.nik + " " + c2T.dosen_pembimbing2.nik);

                        if (c21.idTopik === c2T.id) {
                            if ((dosenTerpilih === c2T.dosen_pembimbing1.nik) || (dosenTerpilih === c2T.dosen_pembimbing2.nik)) {
                                objB.push(obj2B);
                            }
                        }
                    });
                });
            });
        }
        addSidangSebagaiPembimbing(objB);
    });
}

function viewDataSidangSebagaiPenguji() {
    let dosenTerpilih = $('#filterDosen option:selected').val();
    $('#sidangSebagaiPenguji').DataTable().clear().draw();

    var assignSidangDataRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal);
    assignSidangDataRef.on("value", function (snap) {
        objU = [];
        if (snap.exists()) {
            objU = [];
            snap.forEach(function (childSnap) {
                var c21 = childSnap.val();
                var topikDataRef = firebase.database().ref('topik/' + tahun_ajaranGlobal + '/');
                topikDataRef.on('value', function (snap) {
                    snap.forEach(function (data) {
                        var c2T = data.val();
                        obj2U = {
                            'id_topik': c2T.id,
                            'judul2_topik': c2T.judul_topik,
                            'mahasiswa2': c2T.mahasiswa,
                            'dosen_pembimbing1': c2T.dosen_pembimbing1,
                            'dosen_pembimbing2': c2T.dosen_pembimbing2,
                            'sidangName': c21.sidangName,
                            'dosen_penguji1': c21.dosen_penguji1.nik + " - " + c21.dosen_penguji1.name,
                            'dosen_penguji2': c21.dosen_penguji2.nik + " - " + c21.dosen_penguji2.name};
//                        console.log("My data: " + c21.dosen_penguji1.nik + " " + c21.dosen_penguji2.nik);

                        if (c21.idTopik === c2T.id) {
                            if ((dosenTerpilih === c21.dosen_penguji1.nik) || (dosenTerpilih === c21.dosen_penguji2.nik)) {
                                objU.push(obj2U);
                            }
                        }
                    });
                });
            });
        }
        addSidangSebagaiPenguji(objU);
    });
}

function addSidangSebagaiPembimbing(data) {
    $('#sidangSebagaiPembimbing').DataTable().clear().draw();
    $('#sidangSebagaiPembimbing').DataTable().rows.add(data).draw();
}

function addSidangSebagaiPenguji(data) {
    $('#sidangSebagaiPenguji').DataTable().clear().draw();
    $('#sidangSebagaiPenguji').DataTable().rows.add(data).draw();
}

