var db = firebase.database();
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
        tahun_ajaranGlobal = $('#filterTahun_Ajaran option:selected').val();
        ImportPengajuan(tahun_ajaranGlobal);
    }
});


function ImportPengajuan(tahun_ajaranGlobal) {
//    alert("as")
    var url_string = window.location.href;
    var url = new URL(url_string);
    var data = url.searchParams.get("data");
    if (data !== null) {
        var myobj = JSON.parse(data);
        $.each(myobj, function (key) {
            var v_nrp = myobj[key].nrp;
            var v_nama = myobj[key].nama;
            var judul_topik = myobj[key].judul_topik;
            var nik_dosenPemb1 = myobj[key].nik_dosenPemb1;
            var nama_dosenPemb1 = myobj[key].nama_dosenPemb1;
            var nik_dosenPemb2 = myobj[key].nik_dosenPemb2;
            var nama_dosenPemb2 = myobj[key].nama_dosenPemb2;
//            alert(v_nrp)
//            alert(v_nama)
//            alert(judul_topik)
//            alert(nama_dosenPemb1)
            var idTopik = firebase.database().ref().child('topik').push().key;
//            alert(idTopik)
            db.ref('topik/').child(tahun_ajaranGlobal).child(idTopik).set({
                id: idTopik,
                judul_topik: judul_topik,
                mahasiswa: {
                    name: v_nama,
                    nrp: v_nrp
                },
                dosen_pembimbing1: {
                    name: nama_dosenPemb1,
                    nik: nik_dosenPemb1
                },
                dosen_pembimbing2: {
                    name: nama_dosenPemb2,
                    nik: nik_dosenPemb2
                }
            });
            alert("masuk")
        });
    }
}