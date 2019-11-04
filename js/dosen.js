

function fetchDosenData(callback, element) {
//    alert("masuk");
    var dosenDataRef = firebase.database().ref('dosen/');
    dosenDataRef.on('value', function (snap) {
        if (snap.exists()) {
            obj = [];
            snap.forEach(function (childSnap) {
                var c2 = childSnap.val();
//                console.log(c2);
                obj2 = {'nik': c2.nik, 'name': c2.name, 'email': c2.email, 'id_role': c2.id_role, 'nama_role': c2.nama_role};
                obj.push(obj2);
            });
            callback(element, obj);
//            addTable(obj);
        }
    });
    $("#btn-newDosen").click(function () {
        $('#txtDosenNIK').val('');
        $('#txtDosenNama').val('');
        $('#txtDosenEmail').val('');
        $('#comboJabatan').val(5);
    });
}
function putDosenDataToTable(element, data) {
    $('#' + element).DataTable().clear().draw();
    $('#' + element).DataTable().rows.add(data).draw();
}

//save dosen
$("#btnSaveDosen").click(function () {
    var action = $("#btnSaveDosen").text();
    var dosenNik = $('#txtDosenNIK').val();
    var dosenNama = $('#txtDosenNama').val();
    var dosenEmail = $('#txtDosenEmail').val();
    var jabatanId = $('#comboJabatan option:selected').val();
    var jabatanName = $('#comboJabatan option:selected').text();

    if (dosenNik != '' && dosenNama != '' && dosenEmail != '' && jabatanId != '' && jabatanName != '') {
        if (action === "Simpan Dosen") {
//        alert(action);
            document.getElementById("tambah").innerHTML = "Tambah";

            var duplikat = true;

            var dosenDataRef = firebase.database().ref('dosen/');
            dosenDataRef.on('value', function (snap) {
                if (snap.exists()) {
                    obj = [];
                    snap.forEach(function (childSnap) {
                        var c2 = childSnap.val();
                        obj2 = {'nik': c2.nik, 'name': c2.name, 'email': c2.email, 'id_role': c2.id_role, 'nama_role': c2.nama_role};
                        if (dosenNik === c2.nik) {
                            duplikat = false;
                        }
                    });
                }
            });

//            dosenDataRef.on("value", function (snap) {
//                $.each(snap.val(), function (index, element) {
//                    if (dosenNik === element.nik) {
//                        duplikat = false;
//                    }
//                });
//            });

            if (duplikat) {
                firebase.database().ref('dosen').child(dosenNik).set({
                    nik: dosenNik,
                    name: dosenNama,
                    email: dosenEmail,
                    id_role: jabatanId,
                    nama_role: jabatanName
                });
                alert("Data berhasil tersimpan")
            } else {
                alert("NIK sudah pernah terdaftar")
            }
        } else {
//        alert(action);
            firebase.database().ref('dosen').child(dosenNik).update({
                nik: dosenNik,
                name: dosenNama,
                email: dosenEmail,
                id_role: jabatanId,
                nama_role: jabatanName
            });
            alert("Data berhasil terbaharui");
        }
    } else {
        alert("Data belum lengkap");
    }
    document.getElementById("formDosen").reset();
    $('#dosenModal').modal('hide');
});

function deleteDosen(nik) {
    var dosenDataRef = firebase.database().ref().child('dosen/').child(nik);
    if (!confirm('Apakah anda yakin akan menghapus ?')) {
        return false;
    }
    dosenDataRef.remove();
    alert("Data berhasil terhapus");
}
function updateDosen(nik) {
    $('#dosenModal').modal('show');
    document.getElementById("tambah").innerHTML = "Ubah ";
    document.getElementById("update").innerHTML = "Ubah ";
    var dosenDataRef = firebase.database().ref('dosen').child(nik);

    dosenDataRef.on('value', function (snap) {
        if (snap.exists()) {
            var obj = snap.val();
            var gNik = nik;
            var gName = obj.name;
            var gEmail = obj.email;
            var gJabatan = obj.id_role;
        }
        document.getElementById("txtDosenNIK").readOnly = true;

        $('#txtDosenNIK').val(gNik);
        $('#txtDosenNama').val(gName);
        $('#txtDosenEmail').val(gEmail);
        $('#comboJabatan').val(gJabatan);
        $("#btnSaveDosen").prop('value', 'Ubah');
    });

    return false;

}

var jabatanRef = firebase.database().ref().child('jabatan');
jabatanRef.on('value', function (snap) {
    if (snap.exists()) {
        obj = [];
        snap.forEach(function (childSnap) {
            var c2 = childSnap.val();
//                console.log(c2);
            obj2 = {'id_role': c2.id_role, 'nama_role': c2.nama_role};
            obj.push(obj2);
        });
//            addTable(obj);
        addComboJabatan(obj);
    }
});

function addComboJabatan(data) {
    $('#comboJabatan').empty();
    $.each(data, function (key, value) {
        $('#comboJabatan')
                .append($("<option></option>")
                        .attr("value", value.id_role)
                        .text(value.nama_role));
    });
}  