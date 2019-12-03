<!DOCTYPE html>
<html lang="en">

    <head>

        <link rel="stylesheet" href="../css/style.css">
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

        <!-- TODO: Add SDKs for Firebase products that you want to use
             https://firebase.google.com/docs/web/setup#available-libraries -->

        <script src="../js/index.js"></script>
        <script src="../js/fireBase.js"></script>
        <title>Sistem Pengelolaan Tugas Akhir</title>

        <style type="text/css">
            th {
                text-align: center;
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
                        <h1 class="page-header">Daftar Sidang Belum Dinilai (Dosen)</h1>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="form-group"> *pilih tahun ajaran terlebih dahulu 
                        <select class="form-control" id="filterTahun_Ajaran" name="filterTahun_Ajaran">
                            <option></option>
                        </select>
                    </div>

                    <h5> Jumlah Sidang Yang Belum Dinilai : <label id="jmlBelumNilai"></label> </h5>
                    <div class="col-lg-12">
                        <hr></hr>
                    </div>
                    <h4 style="color: red"><b> Daftar Sidang yang Belum Dinilai </b> </h4>
                    <h6 style="color: red"> (Jika telah melewati batas, silahkan hubungi Koordinator Tugas Akhir) </h6>
                    <table width="100%" class="table table-striped table-bordered table-hover" id="belumNilaiTable">
                        <thead>
                            <tr>
                                <th>NRP</th>
                                <th>Nama</th>
                                <th>Sidang</th>
                                <th>Sebagai</th>
                                <th>Batas</th>
                                <th  style="color: red">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>


                    <div class="col-lg-12">
                        <hr>
                    </div>



                </div>


            </div>
            <!-- /#wrapper -->

            <script src="../js/listBelumDinilai.js"></script>
            <script src="../js/fireBase.js"></script>

            <script type="text/javascript">
                $(document).ready(function () {

                    var table = $('#belumNilaiTable').DataTable({
                       "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                "bScrollCollapse": true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                }, columns: [
                            {data: 'mahasiswa2.nrp'},
                            {data: 'mahasiswa2.name'},
                            {data: 'sidangName'},
                            {data: 'sebagai'},
                            {data: 'tanggal'},
                            {data: 'keterangan'}
                        ]
                    });
                });
            </script>


        </div>
    </div>


</body>

</html>
