var db = firebase.database();
var tahun_ajaranGlobal;
var tahun_ajaranGlobal_name;
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
                        .text("--Pilih Semua Tahun Ajaran--"));
        $.each(data, function (key, value) {
            if (value.status === "Aktif") {
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
        tahun_ajaranGlobal_name = $('#filterTahun_Ajaran option:selected').text();

        ImportPengajuan(tahun_ajaranGlobal, tahun_ajaranGlobal_name);
    }
});


function ImportPengajuan(tahun_ajaranGlobal, tahun_ajaranGlobal_name) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var data = url.searchParams.get("data");
    if (data !== null) {
        var myobj = JSON.parse(data);
        $.each(myobj, function (key) {
            var v_nrp = myobj[key].nrp;
            var jenis_sidang = myobj[key].jenisSidang;
            var nilaiAkhir = myobj[key].nilaiAkhir;

            var idKetemu;

            var tahun_ajaran_id = $('#filterTahun_Ajaran option:selected').val();
            var tahun_ajaran_name = $('#filterTahun_Ajaran option:selected').text();

            var topikDataRef = firebase.database().ref('topik/').child(tahun_ajaran_id);
            topikDataRef.on('value', function (snap) {
                objAll = [];
                if (snap.exists()) {
                    obj = [];
                    snap.forEach(function (childSnap) {
                        var c2 = childSnap.val();
                        obj2 = {'id': c2.id,
                            'judul_topik': c2.judul_topik,
                            'mahasiswa': c2.mahasiswa,
                            'dosen_pembimbing1': c2.dosen_pembimbing1,
                            'dosen_pembimbing2': c2.dosen_pembimbing2,
                            'nilaiMutu': c2.nilaiMutu,
                            'tahun_ajaran': c2.tahun_ajaran
                        };
                        if (v_nrp == c2.mahasiswa.nrp) {
                            if (jenis_sidang == "1") {
                                idKetemu = c2.id;
                                db.ref('topik/').child(tahun_ajaran_id).child(idKetemu).update({
                                    nilaiSidang1: nilaiAkhir
                                });
                            }
                            if (jenis_sidang == "2") {
                                idKetemu = c2.id;
                                db.ref('topik/').child(tahun_ajaran_id).child(idKetemu).update({
                                    nilaiSidang2: nilaiAkhir,
                                });
                            }
                            if (jenis_sidang == "3") {
                                idKetemu = c2.id;
                                db.ref('topik/').child(tahun_ajaran_id).child(idKetemu).update({
                                    nilaiSidang3: nilaiAkhir
                                });
                            }

                            var lihatSidangRef = firebase.database().ref('assign_sidang/' + tahun_ajaran_id);
                            lihatSidangRef.on("value", function (snapSidang) {
                                if (snapSidang.exists()) {
                                    snapSidang.forEach(function (childSnapSidang) {
                                        var c3Sidang = childSnapSidang.val();
                                        if (idKetemu == c3Sidang.idTopik) {
                                            idSidangKetemu = c3Sidang.sidangId;
                                            if (jenis_sidang == "1") {
                                                db.ref('assign_sidang/').child(tahun_ajaran_id).child(idSidangKetemu).update({
                                                    totalSidang1: nilaiAkhir,
                                                    totalProsesSidang1: nilaiAkhir
                                                });
                                            }
                                            if (jenis_sidang == "2") {
                                                db.ref('assign_sidang/').child(tahun_ajaran_id).child(idSidangKetemu).update({
                                                    totalSidang2: nilaiAkhir,
                                                    totalProsesSidang2: nilaiAkhir
                                                });
                                            }
                                            if (jenis_sidang == "3") {
                                                db.ref('assign_sidang/').child(tahun_ajaran_id).child(idSidangKetemu).update({
                                                    totalSidang3: nilaiAkhir,
                                                    totalProsesSidang3: nilaiAkhir,
                                                    totalProduk: nilaiAkhir
                                                });
                                            }
                                        }
                                    });
                                }
                            });

                        }
                    });
                }
            });
        });
        alert("Import nilai akhir berhasil");
    }
}