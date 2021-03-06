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
    if (!confirm('Apakah anda yakin akan menghapus seluruh data mahasiswa ini dan tidak dapat dikembalikan lagi?')) {
        return false;
    } else {
        var nilaiSidang1;
        var nilaiSidang2;
        var nilaiSidang3;
        var idTopikHapus;
        var tahunajarantopikhapus;
        var idSidangHapus;

        var topikDataRef = firebase.database().ref('topik/');
        topikDataRef.on("value", function (snap) {
            obj = [];
            var names;
            if (snap.exists()) {
                obj = [];
                snap.forEach(function (childSnap) {
                    childSnap.forEach(function (childSnap2) {
                        var c3 = childSnap2.val();

                        //cari kalau belum punya topik tetep bisa dihapus
                        obj2 = {'nrpFull': c3.mahasiswa.nrp};
                        obj.push(obj2);
                        names = obj.map(el => el.nrpFull);
                    });
                });
            }

            console.log(names)
            console.log(nrp)
            console.log(names.includes(nrp))

            if (names.includes(nrp) === false) {
                var mahasiswaDataRef = firebase.database().ref().child('mahasiswa').child(nrp);
                mahasiswaDataRef.remove();
                alert("Data mahasiswa berhasil dihapus");
                location.reload();
            } else {
                var topikDataRef = firebase.database().ref('topik/');
                topikDataRef.on("value", function (snap) {
                    obj = [];
                    var names;
                    if (snap.exists()) {
                        obj = [];
                        snap.forEach(function (childSnap) {
                            childSnap.forEach(function (childSnap2) {
                                var c3 = childSnap2.val();
                                if (nrp == c3.mahasiswa.nrp) {
                                    nilaiSidang1 = c3.nilaiSidang1;
                                    nilaiSidang2 = c3.nilaiSidang2;
                                    nilaiSidang3 = c3.nilaiSidang3;
                                    idTopikHapus = c3.id;
                                    tahunajarantopikhapus = c3.tahun_ajaran.id;

                                    var lihatSidangRef = firebase.database().ref('assign_sidang/' + tahunajarantopikhapus);
                                    lihatSidangRef.on("value", function (snapSidang) {
                                        if (snapSidang.exists()) {
                                            snapSidang.forEach(function (childSnapSidang) {
                                                var c3Sidang = childSnapSidang.val();

                                                if (idTopikHapus == c3Sidang.idTopik) {
                                                    idSidangHapus = c3Sidang.sidangId;

                                                    if (nilaiSidang1 === "-") {
                                                        var sidangHapusDataRef = firebase.database().ref().child('assign_sidang').child(tahunajarantopikhapus).child(idSidangHapus);
                                                        sidangHapusDataRef.remove();
                                                        var mahasiswaDataRef = firebase.database().ref().child('mahasiswa').child(nrp);
                                                        mahasiswaDataRef.remove();
                                                        var topikHapusDataRef = firebase.database().ref().child('topik').child(tahunajarantopikhapus).child(idTopikHapus);
                                                        topikHapusDataRef.remove();
//                                                        alert("Data mahasiswa, topik, sidang berhasil dihapus");

                                                    }
                                                }
                                            });
                                            if (nilaiSidang1 === "-") {
                                                var mahasiswaDataRef = firebase.database().ref().child('mahasiswa').child(nrp);
                                                mahasiswaDataRef.remove();
                                                var topikHapusDataRef = firebase.database().ref().child('topik').child(tahunajarantopikhapus).child(idTopikHapus);
                                                topikHapusDataRef.remove();

                                            } else {
                                                alert("Tidak dapat dihapus karena sudah ada nilai tersimpan");
                                                location.reload();
                                            }

                                        }
                                    });


                                }
                            });
                        });
                    }
                });
            }
        });
    }


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