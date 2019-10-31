var status;
var id;
var idx;
var status;
var bisaHapus = true;
var tempKey;
function fetchTahunAjaranData(callback, element) {
//    alert("masuk");
    // show all tahun_ajaran
    var tahun_AjaranDataRef = firebase.database().ref('tahun_ajaran/');
    tahun_AjaranDataRef.on('value', function (snap) {
        if (snap.exists()) {
            obj = [];
            snap.forEach(function (childSnap) {
                var c2 = childSnap.val();
                obj2 = {'id': c2.id, 'name': c2.name, 'status': c2.status};

                obj.push(obj2);
                id = c2.id;
            });

//            if (id == null) {
//                id = "0000";
//            }
////            addTable(obj, status);
//            idx = "000" + (parseInt(id.substring(1)) + parseInt(1));
//            id = "T" + idx.substr(idx.length - 4);

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

//$(document).ready(function () {

//save tahun_ajaran
    $("#btnSaveTahun_Ajaran").click(function () {
        var action = $("#btnSaveTahun_Ajaran").text();
//    alert(action);
        if (action == "Simpan Tahun Ajaran") {
            document.getElementById("tambah").innerHTML = "Tambah";
            var tahun_AjaranId = firebase.database().ref().child('tahun_ajaran').push().key;
//        var tahun_AjaranId = $('#txtTahun_AjaranId').val();
            var tahun_AjaranName = $('#txtTahun_AjaranName').val();
            var tahun_AjaranStatus = $('input[name=radioStatus]:checked').val();


            firebase.database().ref('tahun_ajaran').child(tahun_AjaranId).set({
                id: tahun_AjaranId,
                name: tahun_AjaranName,
                status: tahun_AjaranStatus
            });
            alert("Data berhasil tersimpan");
        } else {
//        alert(action);
//        var tahun_AjaranId = "";
            var tahun_AjaranName = $('#txtTahun_AjaranName').val();
            var tahun_AjaranStatus = $('input[name=radioStatus]:checked').val();


            firebase.database().ref('tahun_ajaran').child(tempKey).update({
                name: tahun_AjaranName,
                status: tahun_AjaranStatus
            });
            alert("Data berhasil terbaharui");
        }

        document.getElementById("formTahun_Ajaran").reset();
        $('#tahun_AjaranModal').modal('hide');
    });

//});
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
//    alert(tempKey)
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
//            alert(gStatus);
//            alert(gName);
        }

        $('#txtTahun_AjaranId').val(gId);
        $('#txtTahun_AjaranId').attr('readonly', true);
        $('#txtTahun_AjaranName').val(gName);
        $('input[name=radioStatus][value=' + gStatus + ']').attr('checked', true);
        $("#btnSaveTahun_Ajaran").prop('value', 'Ubah');
    });

    return false;

}
