var tahun_ajaranGlobal;
var nikLogin;
var email;

var filterDosenGlobal;
var nikFilterDosen;
var nameFilterDosen;

var jmlBelumNilai;
var jmlBelumNilaiSemuaSidang;

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
    tahun_ajaranGlobal = $('#filterTahun_Ajaran option:selected').val();

    var DosenDataRef = firebase.database().ref().child('dosen');
    DosenDataRef.on('value', function (snap) {
        if (snap.exists()) {
            obj = [];
            snap.forEach(function (childSnap) {
                var c2 = childSnap.val();
//                console.log(c2);
                obj2 = {'nik': c2.nik, 'name': c2.name, 'email': c2.email, 'id_role': c2.id_role, 'nama_role': c2.nama_role};
                obj.push(obj2);
            });
            addComboDosen(obj);
        }
    });
});
function addComboTahun_Ajaran(data) {
    $('#filterTahun_Ajaran').empty();
    $('#filterTahun_Ajaran')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("Pilih Semua Tahun Ajaran"));
    $.each(data, function (key, value) {
        $('#filterTahun_Ajaran')
                .append($("<option></option>")
                        .attr("value", value.idx)
                        .text(value.name));
    });
    viewTopik()
    showPieNilai();
    showJumlahTopik();
    initializeGrafikJumlah();
    showGrafikJumlahTopik();

    $("#filterTahun_Ajaran").change(function () {
        viewTopik()
        showPieNilai();
        showJumlahTopik();
        $("#filterDosen").val('-');
        initializeGrafikJumlah();
        showGrafikJumlahTopik();

    });
    $("#filterDosen").change(function () {
        hitungJumlahSidang();
    });
}
function initializeGrafikJumlah() {
    var chart = new CanvasJS.Chart("chartContainerJumlahBimbingan", {
        animationEnabled: true,
        title: {
            text: "Grafik Jumlah Mahasiswa Yang Dibimbing dan Diuji Dalam 1 Semester",
            fontSize: 15
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


function addComboDosen(data) {
    $('#filterDosen').empty();
    $('#filterDosen')
            .append($("<option></option>")
                    .attr("value", "-")
                    .text("--Pilih Dosen--"));
    $.each(data, function (key, value) {
        $('#filterDosen')
                .append($("<option></option>")
                        .attr("value", value.nik)
                        .text(value.nik + ' - ' + value.name));
    });
}

function viewTopik() {
    $('#tabelNilaiMutu').DataTable().clear().draw();
    var p_id = $('#filterTahun_Ajaran option:selected').val();
    $('#tabelNilaiMutu').DataTable().clear().draw();
    tahun_ajaranGlobal = p_id;

    if (p_id == "-") {
        var topikDataRef = firebase.database().ref('topik/');
        topikDataRef.on('value', function (snap) {
            objAll = [];
            if (snap.exists()) {
                obj = [];
                snap.forEach(function (childSnap) {
                    childSnap.forEach(function (childSnap2) {
                        var c2 = childSnap2.val();
                        obj2 = {'id': c2.id,
                            'judul_topik': c2.judul_topik,
                            'mahasiswa': c2.mahasiswa,
                            'dosen_pembimbing1': c2.dosen_pembimbing1,
                            'dosen_pembimbing2': c2.dosen_pembimbing2,
                            'nilaiMutu': c2.nilaiMutu,
                            'tahun_ajaran': c2.tahun_ajaran
                        };
                        objAll.push(obj2);
                        addTabelNilaiMutu(objAll);
                    });
                });
            }
        });
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
                        'nilaiMutu': c2.nilaiMutu,
                        'tahun_ajaran': c2.tahun_ajaran
                    };

                    obj.push(obj2);
                    addTabelNilaiMutu(obj);
                });
            }
        });
    }
}
function addTabelNilaiMutu(data) {
    $('#tabelNilaiMutu').DataTable().clear().draw();
    $('#tabelNilaiMutu').DataTable().rows.add(data).draw();
}

var nilaiA = 0;
var nilaiBplus = 0;
var nilaiB = 0;
var nilaiCplus = 0;
var nilaiC = 0;
var nilaiD = 0;
var nilaiE = 0;
function showPieNilai() {
    if (tahun_ajaranGlobal == "-") {
        nilaiA = 0;
        nilaiBplus = 0;
        nilaiB = 0;
        nilaiCplus = 0;
        nilaiC = 0;
        nilaiD = 0;
        nilaiE = 0;
        var topikDataRef = firebase.database().ref('topik/');
        topikDataRef.on('value', function (snap) {
            obj = [];
            if (snap.exists()) {
                obj = [];
                snap.forEach(function (childSnap) {
                    childSnap.forEach(function (childSnap3) {

                        var c2 = childSnap3.val();
                        obj2 = {'id': c2.id,
                            'judul_topik': c2.judul_topik,
                            'mahasiswa': c2.mahasiswa,
                            'nilaiMutu': c2.nilaiMutu,
                            'tahun_ajaran': c2.tahun_ajaran
                        };
                        if (c2.nilaiMutu == "A") {
                            nilaiA++;
                        }
                        if (c2.nilaiMutu == "B+") {
                            nilaiBplus++;
                        }
                        if (c2.nilaiMutu == "B") {
                            nilaiB++;
                        }
                        if (c2.nilaiMutu == "C+") {
                            nilaiCplus++;
                        }
                        if (c2.nilaiMutu == "C") {
                            nilaiC++;
                        }
                        if (c2.nilaiMutu == "D") {
                            nilaiD++;
                        }
                        if (c2.nilaiMutu == "E") {
                            nilaiE++;
                        }
                    });
                });
                var chart = new CanvasJS.Chart("myChartNilai", {
                    animationEnabled: true,
                    title: {
                        text: "Grafik Nilai Dalam 1 Semester",
                        fontSize: 15
                    },
                    data: [{
                            type: "pie",
                            startAngle: 240,
                            indexLabel: "{label} {y}",
                            dataPoints: [
                                {y: nilaiA, label: "A"},
                                {y: nilaiBplus, label: "B+"},
                                {y: nilaiB, label: "B"},
                                {y: nilaiCplus, label: "C+"},
                                {y: nilaiC, label: "C"},
                                {y: nilaiD, label: "D"},
                                {y: nilaiE, label: "E"}
                            ]
                        }]
                });
                chart.render();
            }
        });
    } else {
        nilaiA = 0;
        nilaiBplus = 0;
        nilaiB = 0;
        nilaiCplus = 0;
        nilaiC = 0;
        nilaiD = 0;
        nilaiE = 0;
        var topikDataRef = firebase.database().ref('topik/').child(tahun_ajaranGlobal);
        topikDataRef.on('value', function (snap) {
            obj = [];
            if (snap.exists()) {
                obj = [];
                snap.forEach(function (childSnap) {
                    var c2 = childSnap.val();
                    obj2 = {'id': c2.id,
                        'judul_topik': c2.judul_topik,
                        'mahasiswa': c2.mahasiswa,
                        'nilaiMutu': c2.nilaiMutu,
                        'tahun_ajaran': c2.tahun_ajaran
                    };
                    if (c2.nilaiMutu == "A") {
                        nilaiA++;
                    }
                    if (c2.nilaiMutu == "B+") {
                        nilaiBplus++;
                    }
                    if (c2.nilaiMutu == "B") {
                        nilaiB++;
                    }
                    if (c2.nilaiMutu == "C+") {
                        nilaiCplus++;
                    }
                    if (c2.nilaiMutu == "C") {
                        nilaiC++;
                    }
                    if (c2.nilaiMutu == "D") {
                        nilaiD++;
                    }
                    if (c2.nilaiMutu == "E") {
                        nilaiE++;
                    }
                });
                var chart = new CanvasJS.Chart("myChartNilai", {
                    animationEnabled: true,
                    title: {
                        text: "Grafik Nilai Dalam 1 Semester",
                        fontSize: 15
                    },

                    data: [{
                            type: "pie",
                            startAngle: 240,
                            indexLabel: "{label} {y}",
                            dataPoints: [
                                {y: nilaiA, label: "A"},
                                {y: nilaiBplus, label: "B+"},
                                {y: nilaiB, label: "B"},
                                {y: nilaiCplus, label: "C+"},
                                {y: nilaiC, label: "C"},
                                {y: nilaiD, label: "D"},
                                {y: nilaiE, label: "E"}
                            ]
                        }]
                });
                chart.render();
            } else {
                var chart = new CanvasJS.Chart("myChartNilai", {
                    animationEnabled: true,
                    title: {
                        text: "Grafik Nilai Dalam 1 Semester",
                        fontSize: 15
                    },
                    data: [{
                            type: "pie",
                            startAngle: 240,
                            indexLabel: "{label} {y}",
                            dataPoints: [
                                {y: 0, label: "A"},
                                {y: 0, label: "B+"},
                                {y: 0, label: "B"},
                                {y: 0, label: "C+"},
                                {y: 0, label: "C"},
                                {y: 0, label: "D"},
                                {y: 0, label: "E"}
                            ]
                        }]
                });
                chart.render();
            }
        });
    }
}
var jmlTopik = 0;
var jmlTopikSudahDinilai = 0;
function showJumlahTopik() {
    jmlTopik = 0;
    jmlTopikSudahDinilai = 0;
    if (tahun_ajaranGlobal !== "-") {
        var topikDataRef = firebase.database().ref('topik/').child(tahun_ajaranGlobal);
        topikDataRef.on('value', function (snap) {
            obj = [];
            if (snap.exists()) {
                obj = [];
                snap.forEach(function (childSnap) {
                    var c2 = childSnap.val();
                    obj2 = {'id': c2.id,
                        'judul_topik': c2.judul_topik,
                        'mahasiswa': c2.mahasiswa,
                        'nilaiMutu': c2.nilaiMutu,
                        'tahun_ajaran': c2.tahun_ajaran
                    };
                    jmlTopik++;
                    if (typeof c2.nilaiMutu !== 'undefined') {
                        jmlTopikSudahDinilai++;
                    }
                });
            }
            document.getElementById('jmlTopik').innerHTML = jmlTopik;
            document.getElementById('jmlTopikSudahDinilai').innerHTML = jmlTopikSudahDinilai;
        });
    } else {
        var topikDataRef = firebase.database().ref('topik/');
        topikDataRef.on('value', function (snap) {
            obj = [];
            if (snap.exists()) {
                obj = [];
                snap.forEach(function (childSnap) {
                    childSnap.forEach(function (childSnap2) {
                        var c2 = childSnap2.val();
                        jmlTopik++;
                        if (typeof c2.nilaiMutu !== 'undefined') {
                            jmlTopikSudahDinilai++;
                        }
                    });
                });
                document.getElementById('jmlTopik').innerHTML = jmlTopik;
                document.getElementById('jmlTopikSudahDinilai').innerHTML = jmlTopikSudahDinilai;
            }

        });
    }

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

    var dosenTerpilih = $('#filterDosen option:selected').val();

    tahun_ajaranGlobal = $('#filterTahun_Ajaran option:selected').val();

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

                        if (c2T.dosen_pembimbing1.nik === dosenTerpilih) {
                            if (c21.idTopik === c2T.id) {
                                if (gSidangName == "Sidang 1") {
                                    jmlPemb1Sidang1++;
                                } else if (gSidangName == "Sidang 2") {
                                    jmlPemb1Sidang2++;
                                } else if (gSidangName == "Sidang 3") {
                                    jmlPemb1Sidang3++;
                                }
                            }
                        }
                        if (c2T.dosen_pembimbing2.nik === dosenTerpilih) {
                            if (c21.idTopik === c2T.id) {
                                if (gSidangName == "Sidang 1") {
                                    jmlPemb2Sidang1++;
                                } else if (gSidangName == "Sidang 2") {
                                    jmlPemb2Sidang2++;
                                } else if (gSidangName == "Sidang 3") {
                                    jmlPemb2Sidang3++;
                                }
                            }
                        }
                        if (c21.dosen_penguji1.nik === dosenTerpilih) {
                            if (c21.idTopik === c2T.id) {
                                if (gSidangName == "Sidang 1") {
                                    jmlPeng1Sidang1++;
                                } else if (gSidangName == "Sidang 2") {
                                    jmlPeng1Sidang2++;
                                } else if (gSidangName == "Sidang 3") {
                                    jmlPeng1Sidang3++;
                                }
                            }
                        }
                        if (c21.dosen_penguji2.nik === dosenTerpilih) {
                            if (c21.idTopik === c2T.id) {
                                if (gSidangName == "Sidang 1") {
                                    jmlPeng2Sidang1++;
                                } else if (gSidangName == "Sidang 2") {
                                    jmlPeng2Sidang2++;
                                } else if (gSidangName == "Sidang 3") {
                                    jmlPeng2Sidang3++;
                                }
                            }
                        }
                        var chart = new CanvasJS.Chart("chartContainerJumlahBimbingan", {
                            animationEnabled: true,
                            title: {
                                text: "Grafik Jumlah Mahasiswa Yang Dibimbing dan Diuji Dalam 1 Semester",
                                fontSize: 15
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

                    });
                });
            });
        } else {
            var chart = new CanvasJS.Chart("chartContainerJumlahBimbingan", {
                animationEnabled: true,
                title: {
                    text: "Grafik Jumlah Mahasiswa Yang Dibimbing dan Diuji Dalam 1 Semester",
                    fontSize: 15
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

function showGrafikJumlahTopik() {
    var arr_tahun = [];
    var tahun_AjaranDataRef = firebase.database().ref('tahun_ajaran/');
    tahun_AjaranDataRef.on('value', function (snap) {
        if (snap.exists()) {
            obj = [];
            snap.forEach(function (childSnap) {
                var c2 = childSnap.val();
                arr_tahun.push(c2.name);

            });
            console.log(arr_tahun)
        }
    });
    let arr_jumlah = [];
    var topikDataRef = firebase.database().ref('topik/');
    topikDataRef.on('value', function (snap) {
        objAll = [];
        if (snap.exists()) {
            obj = [];
            snap.forEach(function (childSnap) {
                childSnap.forEach(function (childSnap2) {
                    var c2Topik = childSnap2.val();
                    if (arr_jumlah[c2Topik.tahun_ajaran.name] === undefined)
                        arr_jumlah[c2Topik.tahun_ajaran.name] = 1;
                    else
                        arr_jumlah[c2Topik.tahun_ajaran.name]++;
                });
            });
            var hasil = "";
            var cData = [];
            arr_tahun.forEach(function (nama) {
                obj = {
                    'y': arr_jumlah[nama],
                    'label': nama
                }
                cData.push(obj);
            })
//            console.log("hasil : ", hasil);
//            console.log("hasil2 : ", cData);

            var chart = new CanvasJS.Chart("myChartJumlahTopik", {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "Grafik Jumlah Topik Setiap Tahun Ajaran"
                },
                axisY: {
                    includeZero: false,
                    title: "Jumlah Topik",
                    titleFontColor: "#594a4e",
                    lineColor: "#594a4e",
                    labelFontColor: "#594a4e",
                    tickColor: "#594a4e"
                },
                data: [{
                        type: "column",
                        dataPoints: cData
                    }]
            });
            chart.render();
        }
    });
}