var tahun_ajaranGlobal;
var nikLogin;
var email;
var jmlBelumNilai = 0;
$(document).ready(function () {

    var jmlPemb1Sidang1 = 0;
    var jmlPemb2Sidang1 = 0;
    var jmlPeng1Sidang1 = 0;
    var jmlPeng2Sidang1 = 0;
    var jmlPemb1Sidang2 = 0;
    var jmlPemb2Sidang2 = 0;
    var jmlPeng1Sidang2 = 0;
    var jmlPeng2Sidang2 = 0;
    var jmlPemb1Sidang3 = 0;
    var jmlPemb2Sidang3 = 0;
    var jmlPeng1Sidang3 = 0;
    var jmlPeng2Sidang3 = 0;

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
    tahun_ajaranGlobal = $('#filterTahun_Ajaran option:selected').val();
});
function addComboTahun_Ajaran(data) {
    $('#filterTahun_Ajaran').empty();
    $('#filterTahun_Ajaran')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Tahun Ajaran--"));
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
    hitungJumlahSidang();
    viewDataSidangSebagai();
    $("#filterTahun_Ajaran").change(function () {
        hitungJumlahSidang();
        viewDataSidangSebagai();
    });
}
function hitungJumlahSidang() {
    jmlPemb1Sidang1 = 0;
    jmlPemb2Sidang1 = 0;
    jmlPeng1Sidang1 = 0;
    jmlPeng2Sidang1 = 0;
    jmlPemb1Sidang2 = 0;
    jmlPemb2Sidang2 = 0;
    jmlPeng1Sidang2 = 0;
    jmlPeng2Sidang2 = 0;
    jmlPemb1Sidang3 = 0;
    jmlPemb2Sidang3 = 0;
    jmlPeng1Sidang3 = 0;
    jmlPeng2Sidang3 = 0;

    tahun_ajaranGlobal = $('#filterTahun_Ajaran option:selected').val();
    var dosenDataRef = firebase.database().ref('dosen/');
    dosenDataRef.on('value', function (snap) {});
    var assignSidangDataRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal);
    assignSidangDataRef.on("value", function (snap) {
        if (snap.exists()) {
            objTanggal = [];
            snap.forEach(function (childSnap) {
                var c21 = childSnap.val();
                var topikDataRef = firebase.database().ref('topik/' + tahun_ajaranGlobal);
                topikDataRef.on('value', function (snap) {
                    snap.forEach(function (data) {
                        var c2T = data.val();
                        gSidangName = c21.sidangName;
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
                                                        if (gSidangName == "Sidang 1") {
                                                            jmlPemb1Sidang1++;
                                                        } else if (gSidangName == "Sidang 2") {
                                                            jmlPemb1Sidang2++;
                                                        } else if (gSidangName == "Sidang 3") {
                                                            jmlPemb1Sidang3++;
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                    if (c2T.dosen_pembimbing2.nik === c2d.nik) {
                                        email_dosen = c2d.email;
                                        if (c21.idTopik === c2T.id) {
                                            var user = firebase.auth().currentUser;
                                            if (user != null) {
                                                user.providerData.forEach(function (profile) {
                                                    if (profile.email === email_dosen) {
                                                        if (gSidangName == "Sidang 1") {
                                                            jmlPemb2Sidang1++;
                                                        } else if (gSidangName == "Sidang 2") {
                                                            jmlPemb2Sidang2++;
                                                        } else if (gSidangName == "Sidang 3") {
                                                            jmlPemb2Sidang3++;
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                    if (c21.dosen_penguji1.nik === c2d.nik) {
                                        email_dosen = c2d.email;
                                        if (c21.idTopik === c2T.id) {
                                            var user = firebase.auth().currentUser;
                                            if (user != null) {
                                                user.providerData.forEach(function (profile) {
                                                    if (profile.email === email_dosen) {
                                                        if (gSidangName == "Sidang 1") {
                                                            jmlPeng1Sidang1++;
                                                        } else if (gSidangName == "Sidang 2") {
                                                            jmlPeng1Sidang2++;
                                                        } else if (gSidangName == "Sidang 3") {
                                                            jmlPeng1Sidang3++;
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                    if (c21.dosen_penguji2.nik === c2d.nik) {
                                        email_dosen = c2d.email;
                                        if (c21.idTopik === c2T.id) {
                                            var user = firebase.auth().currentUser;
                                            if (user != null) {
                                                user.providerData.forEach(function (profile) {
                                                    if (profile.email === email_dosen) {
                                                        if (gSidangName == "Sidang 1") {
                                                            jmlPeng2Sidang1++;
                                                        } else if (gSidangName == "Sidang 2") {
                                                            jmlPeng2Sidang2++;
                                                        } else if (gSidangName == "Sidang 3") {
                                                            jmlPeng2Sidang3++;
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                });
                                var chart = new CanvasJS.Chart("chartContainer", {
                                    animationEnabled: true,
                                    title: {
                                        text: "Grafik Jumlah Mahasiswa Yang Dibimbing dan Diuji"
                                    },
                                    axisY: {
                                        title: "Total Sidang",
                                        titleFontColor: "#594a4e",
                                        lineColor: "#594a4e",
                                        labelFontColor: "#594a4e",
                                        tickColor: "#594a4e"
                                    },
                                    toolTip: {
                                        shared: true
                                    },
                                    legend: {
                                        cursor: "pointer",
                                        itemclick: toggleDataSeries
                                    },
                                    data: [
                                        {
                                            type: "column",
                                            name: "Pembimbing 1",
                                            legendText: "Pembimbing 1",
                                            showInLegend: true,
                                            dataPoints: [
                                                {label: "Sidang 1", y: jmlPemb1Sidang1},
                                                {label: "Sidang 2", y: jmlPemb1Sidang2},
                                                {label: "Sidang 3", y: jmlPemb1Sidang3},
                                            ]
                                        },
                                        {
                                            type: "column",
                                            name: "Pembimbing 2",
                                            legendText: "Pembimbing 2",
                                            showInLegend: true,
                                            dataPoints: [
                                                {label: "Sidang 1", y: jmlPemb2Sidang1},
                                                {label: "Sidang 2", y: jmlPemb2Sidang2},
                                                {label: "Sidang 3", y: jmlPemb2Sidang3},
                                            ]
                                        },
                                        {
                                            type: "column",
                                            name: "Penguji 1",
                                            legendText: "Penguji 1",
                                            showInLegend: true,
                                            dataPoints: [
                                                {label: "Sidang 1", y: jmlPeng1Sidang1},
                                                {label: "Sidang 2", y: jmlPeng1Sidang2},
                                                {label: "Sidang 3", y: jmlPeng1Sidang3},
                                            ]
                                        },
                                        {
                                            type: "column",
                                            name: "Penguji 2",
                                            legendText: "Penguji 2",
                                            showInLegend: true,
                                            dataPoints: [
                                                {label: "Sidang 1", y: jmlPeng2Sidang1},
                                                {label: "Sidang 2", y: jmlPeng2Sidang2},
                                                {label: "Sidang 3", y: jmlPeng2Sidang3},
                                            ]
                                        }
                                    ]
                                });
                                chart.render();
                                function toggleDataSeries(e) {
                                    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                                        e.dataSeries.visible = false;
                                    } else {
                                        e.dataSeries.visible = true;
                                    }
                                    chart.render();
                                }
                            }
                        });
                    });
                });
            });
        } else {
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title: {
                    text: "Grafik Jumlah Mahasiswa Yang Dibimbing dan Diuji"
                },
                axisY: {
                    title: "Total Sidang",
                    titleFontColor: "#594a4e",
                    lineColor: "#594a4e",
                    labelFontColor: "#594a4e",
                    tickColor: "#594a4e"
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer",
                    itemclick: toggleDataSeries
                },
                data: [
                    {
                        type: "column",
                        name: "Pembimbing 1",
                        legendText: "Pembimbing 1",
                        showInLegend: true,
                        dataPoints: [
                            {label: "Sidang 1", y: 0},
                            {label: "Sidang 2", y: 0},
                            {label: "Sidang 3", y: 0},
                        ]
                    },
                    {
                        type: "column",
                        name: "Pembimbing 2",
                        legendText: "Pembimbing 2",
                        showInLegend: true,
                        dataPoints: [
                            {label: "Sidang 1", y: 0},
                            {label: "Sidang 2", y: 0},
                            {label: "Sidang 3", y: 0},
                        ]
                    },
                    {
                        type: "column",
                        name: "Penguji 1",
                        legendText: "Penguji 1",
                        showInLegend: true,
                        dataPoints: [
                            {label: "Sidang 1", y: 0},
                            {label: "Sidang 2", y: 0},
                            {label: "Sidang 3", y: 0},
                        ]
                    },
                    {
                        type: "column",
                        name: "Penguji 2",
                        legendText: "Penguji 2",
                        showInLegend: true,
                        dataPoints: [
                            {label: "Sidang 1", y: 0},
                            {label: "Sidang 2", y: 0},
                            {label: "Sidang 3", y: 0},
                        ]
                    }
                ]
            });
            chart.render();
            function toggleDataSeries(e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                chart.render();
            }
        }
    });
}

function viewDataSidangSebagai() {
    $('#sidangSebagaiPembimbing1').DataTable().clear().draw();
    $('#sidangSebagaiPembimbing2').DataTable().clear().draw();
    $('#sidangSebagaiPenguji1').DataTable().clear().draw();
    $('#sidangSebagaiPenguji2').DataTable().clear().draw();

    tahun_ajaranGlobal = $('#filterTahun_Ajaran option:selected').val();
    var assignSidangDataRef = firebase.database().ref('assign_sidang/' + tahun_ajaranGlobal);
    assignSidangDataRef.on("value", function (snap) {
        if (snap.exists()) {
            objB1 = [];
            objB2 = [];
            objP1 = [];
            objP2 = [];
            snap.forEach(function (childSnap) {
                var c21 = childSnap.val();
                var topikDataRef = firebase.database().ref('topik/' + tahun_ajaranGlobal + '/');
                topikDataRef.on('value', function (snap) {
                    snap.forEach(function (data) {
                        var c2T = data.val();
                        obj2B = {
                            'id_topik': c2T.id,
                            'judul_topik': c2T.judul_topik,
                            'mahasiswa': c2T.mahasiswa,
                            'dosen_pembimbing1': c2T.dosen_pembimbing1.nik + " - " + c2T.dosen_pembimbing1.name,
                            'dosen_pembimbing2': c2T.dosen_pembimbing2.nik + " - " + c2T.dosen_pembimbing2.name,
                            'sidangName': c21.sidangName,
                            'dosen_penguji1': c21.dosen_penguji1.nik + " - " + c21.dosen_penguji1.name,
                            'dosen_penguji2': c21.dosen_penguji2.nik + " - " + c21.dosen_penguji2.name};

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
                                                        objB1.push(obj2B);
                                                    }
                                                });
                                            }
                                        }
                                        addSidangSebagaiPembimbing1(objB1);
                                    }
                                    if (c2T.dosen_pembimbing2.nik === c2d.nik) {
                                        email_dosen = c2d.email;
                                        if (c21.idTopik === c2T.id) {
                                            var user = firebase.auth().currentUser;
                                            if (user != null) {
                                                user.providerData.forEach(function (profile) {
                                                    if (profile.email === email_dosen) {
                                                        objB2.push(obj2B);
                                                    }
                                                });
                                            }
                                        }
                                        addSidangSebagaiPembimbing2(objB2);
                                    }
                                    if (c21.dosen_penguji1.nik === c2d.nik) {
                                        email_dosen = c2d.email;
                                        if (c21.idTopik === c2T.id) {
                                            var user = firebase.auth().currentUser;
                                            if (user != null) {
                                                user.providerData.forEach(function (profile) {
                                                    if (profile.email === email_dosen) {
                                                        objP1.push(obj2B);
                                                    }
                                                });
                                            }
                                        }
                                        addSidangSebagaiPenguji1(objP1);
                                    }
                                    if (c21.dosen_penguji2.nik === c2d.nik) {
                                        email_dosen = c2d.email;
                                        if (c21.idTopik === c2T.id) {
                                            var user = firebase.auth().currentUser;
                                            if (user != null) {
                                                user.providerData.forEach(function (profile) {
                                                    if (profile.email === email_dosen) {
                                                        objP2.push(obj2B);
                                                    }
                                                });
                                            }
                                        }
                                        addSidangSebagaiPenguji2(objP2);
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


function addSidangSebagaiPembimbing1(data) {
    $('#sidangSebagaiPembimbing1').DataTable().clear().draw();
    $('#sidangSebagaiPembimbing1').DataTable().rows.add(data).draw();
}

function addSidangSebagaiPembimbing2(data) {
    $('#sidangSebagaiPembimbing2').DataTable().clear().draw();
    $('#sidangSebagaiPembimbing2').DataTable().rows.add(data).draw();
}
function addSidangSebagaiPenguji1(data) {
    $('#sidangSebagaiPenguji1').DataTable().clear().draw();
    $('#sidangSebagaiPenguji1').DataTable().rows.add(data).draw();
}
function addSidangSebagaiPenguji2(data) {
    $('#sidangSebagaiPenguji2').DataTable().clear().draw();
    $('#sidangSebagaiPenguji2').DataTable().rows.add(data).draw();
}