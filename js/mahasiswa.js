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

    $("#btn-newMahasiswa").click(function () {
        $('#txtMahasiswaNRP').val('');
        $('#txtMahasiswaNama').val('');
    });
}
function putMahasiswaDataToTable(element, data) {
    $('#' + element).DataTable().clear().draw();
    $('#' + element).DataTable().rows.add(data).draw();
}

function putMahasiswaDataToCombo(element, data) {
    $("#" + element).empty();
    $("#" + element)
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("-"));
    $.each(data, function (key, value) {
        $("#" + element)
                .append($("<option></option>")
                        .attr("value", value.id)
                        .text(value.name));
    });
}


//save mahasiswa
$("#btnSaveMahasiswa").click(function () {
    var action = $("#btnSaveMahasiswa").text();
    var mahasiswaNRP = $('#txtMahasiswaNRP').val();
    var mahasiswaNama = $('#txtMahasiswaNama').val();

    if (mahasiswaNRP != '' && mahasiswaNama != '') {
        if (action == "Simpan Mahasiswa") {
            document.getElementById("tambah").innerHTML = "Tambah";

            var duplikat = true;

            var mahasiswaDataRef = firebase.database().ref('mahasiswa/');
            mahasiswaDataRef.on('value', function (snap) {
                if (snap.exists()) {
                    obj = [];
                    snap.forEach(function (childSnap) {
                        var c2 = childSnap.val();
                        obj2 = {'nrp': c2.nrp, 'name': c2.name};
                        if (mahasiswaNRP === c2.nrp) {
                            duplikat = false;
                        }
                    });
                }

            });
            if (duplikat) {
                firebase.database().ref('mahasiswa').child(mahasiswaNRP).set({
                    nrp: mahasiswaNRP,
                    name: mahasiswaNama
                });
                alert("Data berhasil tersimpan");
            } else {
                alert("NRP sudah pernah terdaftar")
            }
        } else {
            firebase.database().ref('mahasiswa').child(mahasiswaNRP).update({
                nrp: mahasiswaNRP,
                name: mahasiswaNama
            });
            alert("Data berhasil terbaharui")
        }
    } else {
        alert("Data belum lengkap");
    }
    document.getElementById("formMahasiswa").reset();
    $('#mahasiswaModal').modal('hide');
});

function deleteMahasiswa(nrp) {
    if (!confirm('Apakah anda yakin?')) {

        return false;
    }
    var mahasiswaDataRef = firebase.database().ref().child('mahasiswa').child(nrp);
    mahasiswaDataRef.remove();
    alert("Data berhasil terhapus");
}

function updateMahasiswa(nrp) {
    $('#mahasiswaModal').modal('show');
    document.getElementById("tambah").innerHTML = "Ubah ";
    document.getElementById("update").innerHTML = "Ubah ";
    var mahasiswaDataRef = firebase.database().ref('mahasiswa').child(nrp);
    mahasiswaDataRef.on('value', function (snap) {
        if (snap.exists()) {
            var obj = snap.val();
            var gNrp = obj.nrp;
            var gName = obj.name;
        }
        document.getElementById("txtMahasiswaNRP").readOnly = true;

        $('#txtMahasiswaNRP').val(gNrp);
        $('#txtMahasiswaNama').val(gName);
        $("#btnSaveMahasiswa").prop('value', 'Ubah');
    });

    return false;

}
























    