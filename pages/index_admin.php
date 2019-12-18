<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="../images/Icon IT.png" type="image/x-icon"/>

        <link href="../dist/css/mystyle.css" rel="stylesheet">

        <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase-auth.js"></script>


        <script src="https://momentjs.com/downloads/moment.min.js"></script>
        <script src="https://momentjs.com/downloads/moment-with-locales.js"></script>

        <script src="../js/index.js"></script>
        <script src="../js/fireBase.js"></script>
        <title>Sistem Pengelolaan Tugas Akhir</title>


        <style type="text/css">
            th {
                text-align: center;
            }
            .column {
                float: left;
                width: 50%;
            }

            /* Clear floats after the columns */
            .row:after {
                content: "";
                display: table;
                clear: both;
            }
            /* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
            @media screen and (max-width: 600px) {
                .column {
                    width: 100%;
                }
            } 

            .card {
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.3s;
                width: 90%;
                border-radius: 5px;
                padding: 10px;
            }

            .card:hover {
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            }

            img {
                border-radius: 5px 5px 0 0;
            }

            .container {
                padding: 2px 16px;
            }
            
            
            div.dataTables_scrollBody thead th,
            div.dataTables_scrollBody thead td {
                line-height: 0;
                opacity:0.0;
                width: 0px;
                height:0px;
            }
        </style>

    </head>

    <body>

        <div id="wrapper">
            <!-- Navigation -->
            <?php include_once './header.php'; ?>

            <div id="page-wrapper">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Dashboard Admin</h1>
                    </div>
                </div>
                <div class="panel-body">
                    <div id="myChartJumlahTopik" style="height: 200px;"></div>
                    <br/><br/>
                    <div class="form-group"> *pilih tahun ajaran terlebih dahulu 
                        <select class="form-control" id="filterTahun_Ajaran" name="filterTahun_Ajaran">
                            <option></option>
                        </select>
                    </div>



                    <div class="row">
                        <div class="column">
                            <div class="card">
                                <table>
                                    <tr>
                                        <td width="45%">Jumlah topik </td>
                                        <td width="5%"> : </td>
                                        <td width="50%"> <b><span id="jmlTopik">-</span> </b></td>
                                    </tr>
                                    <tr>
                                        <td>Jumlah topik DONE</td>
                                        <td> : </td>
                                        <td> <b><span id="jmlTopikSudahDinilai">-</span></b> (sudah ada nilai mutu)</td>
                                    </tr>
                                </table>
                                <br/>
                                <div id="myChartNilai" style="height: 250px; width: 100%;"></div>
                            </div>
                        </div>
                        <div class="column">

                            <div class="card">
                                <div class="form-group">  *pilih dosen terlebih dahulu 
                                    <select  class="form-control" name="filterDosen" id="filterDosen" required>
                                        <option></option>
                                    </select>
                                </div>
                                <div id="chartContainerJumlahBimbingan" style="height: 250px; width: 100%;"></div>

                            </div>
                        </div>
                    </div> 


                    <hr style="width: 100%; border: 1px solid black;"/>

                    <h3 style="color: red"><b> Data Nilai </b> </h3> 
                    <table width="100%" class="table table-striped table-bordered table-hover" id="tabelNilaiMutu">
                        <thead>
                            <tr>
                                <th>NRP</th>
                                <th>Nama</th>
                                <th>Judul Topik</th>
                                <th>Tahun Ajaran</th>
                                <th>Nilai Mutu</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
                </div>
            </div>
            <!-- /#wrapper -->


            <script src="../js/index_admin.js"></script>
            <script src="../js/fireBase.js"></script>

            <script type='text/javascript'>
                $(document).ready(function () {

                    var table1 = $('#tabelNilaiMutu').DataTable({
                        "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                "bScrollCollapse": true,
                                                responsive: true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                },columns: [
                            {data: 'mahasiswa.nrp'},
                            {data: 'mahasiswa.name'},
                            {data: 'judul_topik'},
                            {data: 'tahun_ajaran.name'},
                            {
                                data: 'null',
                                render: function (data, type, row) {
                                    if (typeof row.nilaiMutu == 'undefined') {
                                        return '<span>-</span>'
                                    } else {
                                        return '<span >' + row.nilaiMutu + '</span>'
                                    }
                                }
                            }
                        ]
                    });
                });
            </script>
        </div>
    </div>


</body>

</html>
