
var tahun_ajaranGlobal;
var email_dosen;
var tempKeyTopik;
$(document).ready(function () {

    $('#halaman_detail_nilai').hide();
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
    $('#nilaiAkhirTable').DataTable().clear().draw();
    var p_id = $('#filterTahun_Ajaran option:selected').val();
    tahun_ajaranGlobal = p_id;
    if (p_id == "-") {
        $('#nilaiAkhirTable').DataTable().clear().draw();
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
                        'nilaiSidang1': c2.nilaiSidang1,
                        'nilaiSidang2': c2.nilaiSidang2,
                        'nilaiSidang3': c2.nilaiSidang3}

                    obj.push(obj2);
                    addViewNilaiAkhir(obj);
                });
            }
        });
    }
}

function addViewNilaiAkhir(data) {
    $('#nilaiAkhirTable').DataTable().clear().draw();
    $('#nilaiAkhirTable').DataTable().rows.add(data).draw();
}


function lihatDetailNilai(id, nrp, jenisSidang, idSidang) {
    $('#halaman_nilai').hide();
    $('#halaman_detail_nilai').show();
    tempKeyTopik = id;
    var topikDataRef = firebase.database().ref('topik/').child(tahun_ajaranGlobal).child(tempKeyTopik);
    topikDataRef.on('value', function (snap) {
        objTopik = [];
        if (snap.exists()) {
            var objTopik = snap.val();
            var gTopikId = objTopik.id;
            var gTopikMahasiswaNrp = objTopik.mahasiswa.nrp;
            var gTopikMahasiswaName = objTopik.mahasiswa.name;
            var gTopikJudulTopik = objTopik.judul_topik;
            var gTopikDosenPemb1Nik = objTopik.dosen_pembimbing1.nik;
            var gTopikDosenPemb1Name = objTopik.dosen_pembimbing1.name;
            var gTopikDosenPemb2Nik = objTopik.dosen_pembimbing2.nik;
            var gTopikDosenPemb2Name = objTopik.dosen_pembimbing2.name;
        }
        var sidangDataRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal);
        var ketemu = 0;
        sidangDataRef.on("value", function (snaps) {
            objSidang = [];
            if (snaps.exists()) {
                snaps.forEach(function (childSnaps) {
                    var c2Sidang = childSnaps.val();
                    obj2Sidang = {
                        'idTopik': c2Sidang.idTopik,
                        'sidangId': c2Sidang.sidangId,
                        'sidangName': c2Sidang.sidangName,
                        'tanggal': new Date(c2Sidang.tanggal).toDateString(),
                        'jam_mulai': c2Sidang.jam_mulai,
                        'ruangan': c2Sidang.ruangan,
                        'catatan': c2Sidang.catatan,
                        'dosen_penguji1': c2Sidang.dosen_penguji1,
                        'dosen_penguji2': c2Sidang.dosen_penguji2
                    };
                    if (c2Sidang.idTopik === gTopikId && ketemu == 0) {
                        ketemu = 1;
                        $('.nav-tabs li:eq(0) a').tab('show');
                        document.getElementById('nilaiMahasiswaNrp').innerHTML = gTopikMahasiswaNrp;
                        document.getElementById('nilaiMahasiswaName').innerHTML = gTopikMahasiswaName;
                        document.getElementById('nilaiJudulTopik').innerHTML = gTopikJudulTopik;
                    }
                });
            }
        });
    });
}
