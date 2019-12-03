var status;
var id;
var idx;
var status;
var bisaHapus = true;
var tempKey;
function fetchTahunAjaranData(callback, element) {
    var tahun_AjaranDataRef = firebase.database().ref('tahun_ajaran/').orderByChild("status");
    tahun_AjaranDataRef.on('value', function (snap) {
        if (snap.exists()) {
            obj = [];
            snap.forEach(function (childSnap) {
                var c2 = childSnap.val();
                obj2 = {'id': c2.id, 'name': c2.name, 'status': c2.status};

                obj.push(obj2);
                id = c2.id;
            });
            callback(element, obj);
        }
    });

    $("#btn-newTahun_Ajaran").click(function () {
        $('#txtTahun_AjaranName').val('');
        $('#radioStatus').val('');
    });
}

function putTahunAjaranDataToTable(element, data) {
    $('#' + element).DataTable().clear().draw();
    $('#' + element).DataTable().rows.add(data).draw();
}

function putTahunAjaranDataToCombo(element, data) {
    $("#" + element).empty();
    $.each(data, function (key, value) {
        $("#" + element)
                .append($("<option></option>")
                        .attr("value", value.id)
                        .text(value.name));
    });
}

//save tahun_ajaran
$("#btnSaveTahun_Ajaran").click(function () {
    var action = $("#btnSaveTahun_Ajaran").text();
    if (action == "Simpan Tahun Ajaran") {
        document.getElementById("tambah").innerHTML = "Tambah";
        var tahun_AjaranId = firebase.database().ref().child('tahun_ajaran').push().key;
        var tahun_AjaranName = $('#txtTahun_AjaranName').val();
        var tahun_AjaranStatus = $('input[name=radioStatus]:checked').val();

        var berhasil = false;
        var duplikat = false;
        if (tahun_AjaranName != "") {
            var tahun_AjaranDataRef = firebase.database().ref('tahun_ajaran/');
            tahun_AjaranDataRef.on('value', function (snap) {
                if (snap.exists()) {
                    obj = [];
                    snap.forEach(function (childSnap) {
                        var c2 = childSnap.val();
                        obj2 = {'id': c2.id, 'name': c2.name, 'status': c2.status};
                        if (tahun_AjaranStatus == "Aktif" && c2.status == "Aktif") {
                            duplikat = true;
                        }
                    });
                }

                if (duplikat == true) {
                    berhasil = false;
                } else if (duplikat == false) {
                    firebase.database().ref('tahun_ajaran').child(tahun_AjaranId).set({
                        id: tahun_AjaranId,
                        name: tahun_AjaranName,
                        status: tahun_AjaranStatus
                    });
                    berhasil = true;
                }
            });

            if (berhasil == true) {
                alert("Data berhasil tersimpan");
            } else {
                alert("Gagal! Data Duplikasi (Sudah ada tahun ajaran yang aktif)");
            }
        } else {
            alert("Data masih ada yang kosong");
        }

    } else {
        var tahun_AjaranName = $('#txtTahun_AjaranName').val();
        var tahun_AjaranStatus = $('input[name=radioStatus]:checked').val();

        var berhasil = false;
        var duplikat = false;

        if (tahun_AjaranName != "") {
            var tahun_AjaranDataRef = firebase.database().ref('tahun_ajaran/');
            tahun_AjaranDataRef.on('value', function (snap) {
                if (snap.exists()) {
                    obj = [];
                    snap.forEach(function (childSnap) {
                        var c2 = childSnap.val();
                        obj2 = {'id': c2.id, 'name': c2.name, 'status': c2.status};
                        if (tahun_AjaranStatus == "Aktif" && c2.status == "Aktif") {
                            duplikat = true;
                        }
                    });
                    if (duplikat == true) {
                        berhasil = false;
                    } else if (duplikat == false) {
                        firebase.database().ref('tahun_ajaran').child(tempKey).set({
                            id: tempKey,
                            name: tahun_AjaranName,
                            status: tahun_AjaranStatus
                        });
                        berhasil = true;
                    }
                }
            });
            if (berhasil == true) {
                alert("Data berhasil terbaharui");
            } else {
                alert("Gagal! Data Duplikasi (Sudah ada tahun ajaran yang aktif)");
            }
        } else {
            alert("Data masih ada yang kosong");
        }

    }

    document.getElementById("formTahun_Ajaran").reset();
    $('#tahun_AjaranModal').modal('hide');
});

function deleteTahun_Ajaran(id) {
    var tahun_AjaranDataRef = firebase.database().ref().child('tahun_ajaran/').child(id);
    if (!confirm('Apakah anda yakin akan menghapus ?')) {

        return false;
    }
    tahun_AjaranDataRef.remove();
    alert("Data berhasil terhapus");
}

function updateTahun_Ajaran(id) {
    tempKey = id;
    $('#tahun_AjaranModal').modal('show');
    document.getElementById("tambah").innerHTML = "Ubah ";
    document.getElementById("update").innerHTML = "Ubah ";
    var tahun_AjaranDataRef = firebase.database().ref('tahun_ajaran').child(id);
    tahun_AjaranDataRef.on('value', function (snap) {
        if (snap.exists()) {
//                obj = [];
            var obj = snap.val();
            var gId = obj.id;
            var gName = obj.name;
            var gStatus = obj.status;
        }

        $('#txtTahun_AjaranId').val(gId);
        $('#txtTahun_AjaranId').attr('readonly', true);
        $('#txtTahun_AjaranName').val(gName);
        $('input[name=radioStatus][value=' + gStatus + ']').attr('checked', true);
        $("#btnSaveTahun_Ajaran").prop('value', 'Ubah');
    });

    return false;
}
