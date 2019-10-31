
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

    if (p_id == "-") {
        $('#nilaiTablePemb1').DataTable().clear().draw();
        $('#nilaiTablePemb2').DataTable().clear().draw();
        $('#nilaiTablePeng1').DataTable().clear().draw();
        $('#nilaiTablePeng2').DataTable().clear().draw();
    } else {
        var dosenDataRef = firebase.database().ref('dosen/');
        dosenDataRef.on('value', function (snap) {});
        var topikDataRef = firebase.database().ref('topik/' + tahun_ajaranGlobal + '/');
        var assignSidangDataRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal);
        assignSidangDataRef.on("value", function (snap) {
            if (snap.exists()) {
                obj = [];
                obj1 = [];
                obj2 = [];
                obj3 = [];
                snap.forEach(function (childSnap) {
                    var c21 = childSnap.val();
                    topikDataRef.on('value', function (snap) {
                        snap.forEach(function (data) {
                            var c2T = data.val();

                            obj2A = {
                                'id_topik': c2T.id,
                                'judul2_topik': c2T.judul_topik,
                                'mahasiswa': c2T.mahasiswa,
                                'dosen_pembimbing1': c2T.dosen_pembimbing1,
                                'dosen_pembimbing2': c2T.dosen_pembimbing2,

                                'idTopik': c21.idTopik,
                                'sidangId': c21.sidangId,
                                'sidangName': c21.sidangName,
                                'tanggal': c21.tanggal,
                                'jam_mulai': c21.jam_mulai,
                                'ruangan': c21.ruangan,
                                'catatan': c21.catatan,
                                'dosen_penguji1': c21.dosen_penguji1,
                                'dosen_penguji2': c21.dosen_penguji2,

                                "nilai_proses_sidang1_pemb1": c21.nilai_proses_sidang1_pemb1,
                                "nilai_proses_sidang1_pemb2": c21.nilai_proses_sidang1_pemb2,

                                "nilai_sidang1_pemb1": c21.nilai_sidang1_pemb1,
                                "nilai_sidang1_peng1": c21.nilai_sidang1_peng1,
                                "nilai_sidang1_peng2": c21.nilai_sidang1_peng2,

                                "nilai_proses_sidang2_pemb1": c21.nilai_proses_sidang2_pemb1,
                                "nilai_proses_sidang2_pemb2": c21.nilai_proses_sidang2_pemb2,

                                "nilai_sidang2_pemb1": c21.nilai_sidang2_pemb1,
                                "nilai_sidang2_peng1": c21.nilai_sidang2_peng1,
                                "nilai_sidang2_peng2": c21.nilai_sidang2_peng2,

                                "nilai_proses_sidang3_pemb1": c21.nilai_proses_sidang3_pemb1,
                                "nilai_proses_sidang3_pemb2": c21.nilai_proses_sidang3_pemb2,

                                "nilai_sidang3_pemb1": c21.nilai_sidang3_pemb1,
                                "nilai_sidang3_peng1": c21.nilai_sidang3_peng1,
                                "nilai_sidang3_peng2": c21.nilai_sidang3_peng2,

                                "nilai_produk_pemb1": c21.nilai_produk_pemb1,
                                "nilai_produk_pemb2": c21.nilai_produk_pemb2,
                                "nilai_produk_peng1": c21.nilai_produk_peng1,
                                "nilai_produk_peng2": c21.nilai_produk_peng2,

                                'totalProsesSidang1': c21.totalProsesSidang1,
                                'totalSidang1': c21.totalSidang1,
                                'hasilNilaiAkhirSidang1': c21.hasilNilaiAkhirSidang1,

                                'totalProsesSidang2': c21.totalProsesSidang2,
                                'totalSidang2': c21.totalSidang2,
                                'hasilNilaiAkhirSidang12': c21.hasilNilaiAkhirSidang2,

                                'totalProsesSidang3': c21.totalProsesSidang3,
                                'totalSidang3': c21.totalSidang3,
                                'hasilNilaiAkhirSidang3': c21.hasilNilaiAkhirSidang3,
                                
                                'hasilNilaiAkhirTAMahasiswa': c21.hasilNilaiAkhirTAMahasiswa,
                            };
                            
                            var dosenDataRef = firebase.database().ref('dosen/');
                            dosenDataRef.on('value', function (snap) {
                                if (snap.exists()) {
                                    snap.forEach(function (childSnap) {
                                        var c2d = childSnap.val();
                                        if (c2T.dosen_pembimbing1.nik === c2d.nik) {
                                            email_dosen = c2d.email;
                                            if (c21.idTopik === c2T.id) {
                                                var user = firebase.auth().currentUser;
                                                if (user != null) {
                                                    user.providerData.forEach(function (profile) {
                                                        if (profile.email === email_dosen) {
                                                            obj.push(obj2A);
                                                        }
                                                    });
                                                }
                                            }
                                            addViewNilaiPemb1(obj);
                                        } else if (c2T.dosen_pembimbing2.nik === c2d.nik) {
                                            email_dosen = c2d.email;
                                            if (c21.idTopik === c2T.id) {
                                                var user = firebase.auth().currentUser;
                                                if (user != null) {
                                                    user.providerData.forEach(function (profile) {
                                                        if (profile.email === email_dosen) {
                                                            obj1.push(obj2A);
                                                        }
                                                    });
                                                }
                                            }
                                            addViewNilaiPemb2(obj1);
                                        } else if (c21.dosen_penguji1.nik === c2d.nik) {
                                            email_dosen = c2d.email;
                                            if (c21.idTopik === c2T.id) {
                                                var user = firebase.auth().currentUser;
                                                if (user != null) {
                                                    user.providerData.forEach(function (profile) {
                                                        if (profile.email === email_dosen) {
                                                            obj2.push(obj2A);
                                                        }
                                                    });
                                                }
                                            }
                                            addViewNilaiPeng1(obj2);
                                        } else if (c21.dosen_penguji2.nik === c2d.nik) {
                                            email_dosen = c2d.email;
                                            if (c21.idTopik === c2T.id) {
                                                var user = firebase.auth().currentUser;
                                                if (user != null) {
                                                    user.providerData.forEach(function (profile) {
                                                        if (profile.email === email_dosen) {
                                                            obj3.push(obj2A);
                                                        }
                                                    });
                                                }
                                            }
                                            addViewNilaiPeng2(obj3);
                                        }
                                    });
                                }
                            });
                        });
                    });
                });
            }
        });
    }

    function addViewNilaiPemb1(data) {
        $('#nilaiTablePemb1').DataTable().clear().draw();
        $('#nilaiTablePemb1').DataTable().rows.add(data).draw();
    }
    function addViewNilaiPemb2(data) {
        $('#nilaiTablePemb2').DataTable().clear().draw();
        $('#nilaiTablePemb2').DataTable().rows.add(data).draw();
    }
    function addViewNilaiPeng1(data) {
        $('#nilaiTablePeng1').DataTable().clear().draw();
        $('#nilaiTablePeng1').DataTable().rows.add(data).draw();
    }
    function addViewNilaiPeng2(data) {
        $('#nilaiTablePeng2').DataTable().clear().draw();
        $('#nilaiTablePeng2').DataTable().rows.add(data).draw();
    }
}

