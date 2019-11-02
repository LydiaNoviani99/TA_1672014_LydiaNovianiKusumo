
var tahun_ajaranGlobal;
var email_dosen;

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


    view_nilai_table();

    $("#filterTahun_Ajaran").change(function () {
        view_nilai_table();
    });

}

function view_nilai_table() {
    $('#nilaiTablePemb1').DataTable().clear().draw();
    $('#nilaiTablePemb2').DataTable().clear().draw();
    $('#nilaiTablePeng1').DataTable().clear().draw();
    $('#nilaiTablePeng2').DataTable().clear().draw();
    var p_id = $('#filterTahun_Ajaran option:selected').val();
    tahun_ajaranGlobal = p_id;
}

