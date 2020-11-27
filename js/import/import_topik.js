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
//        $("#filterTanggalSidang").change(function () {
////            alert("masuk");
//            ImportPengajuan(tahun_ajaranGlobal);
//        });
    }
});


function ImportPengajuan(tahun_ajaranGlobal, tahun_ajaranGlobal_name) {
//    alert(tahun_ajaranGlobal_name)
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
//            var nama_dosenPemb1;
            var nama_dosenPemb1 = myobj[key].nama_dosenPemb1;
            var nik_dosenPemb2 = myobj[key].nik_dosenPemb2;
//            var nama_dosenPemb2;
            var nama_dosenPemb2 = myobj[key].nama_dosenPemb2;
            var tahun_ajaran_id = $('#filterTahun_Ajaran option:selected').val();
            var tahun_ajaran_name = $('#filterTahun_Ajaran option:selected').text();

//            alert(v_nrp)
//            alert(v_nama)
//            alert(judul_topik)
//            alert(tahun_ajaran_id)
//            alert(tahun_ajaran_name)

            var DosenDataRef = firebase.database().ref().child('dosen');
            DosenDataRef.on('value', function (snap) {
                if (snap.exists()) {
                    obj = [];
                    snap.forEach(function (childSnap) {
                        var c2 = childSnap.val();
                        obj2 = {'nik': c2.nik, 'name': c2.name, 'email': c2.email, 'id_role': c2.id_role, 'nama_role': c2.nama_role};

                        if (nik_dosenPemb1 == c2.nik) {
                            nama_dosenPemb1 = c2.name;
                        }
                        if (nik_dosenPemb2 == c2.nik) {
                            nama_dosenPemb2 = c2.name;
                        }
                    });
                    if (nama_dosenPemb1 == "-") {
                        nik_dosenPemb1 == "-"
                    }
                    if (nama_dosenPemb2 == "-") {
                        nik_dosenPemb2 == "-"
                    }


//                    alert(nik_dosenPemb1)
//                    alert(nama_dosenPemb1)
//                    alert(nik_dosenPemb2)
//                    alert(nama_dosenPemb2)
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
                        },
                        tahun_ajaran: {
                            id: tahun_ajaranGlobal,
                            name: tahun_ajaranGlobal_name
                        },
                        nilaiSidang1: "-",
                        nilaiSidang2: "-",
                        nilaiSidang3: "-"
                    });

                }
            });



        });
        alert("Import topik berhasil");
    }
}