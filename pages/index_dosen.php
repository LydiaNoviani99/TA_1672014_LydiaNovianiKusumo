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
                        <h1 class="page-header">Dashboard Dosen</h1>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="form-group"> *pilih tahun ajaran terlebih dahulu 
                        <select class="form-control" id="filterTahun_Ajaran" name="filterTahun_Ajaran">
                            <option></option>
                        </select>
                    </div>




                    <div id="chartContainer" style="height: 300px; width: 100%;"></div>
                    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>

                    <h5 style="color: red"><b> Sebagai Pembimbing 1 </b> </h5> 
                    <table width="100%" class="table table-striped table-bordered table-hover" id="sidangSebagaiPembimbing1">
                        <thead>
                            <tr>
                                <th>NRP</th>
                                <th>Nama</th>
                                <th>Judul</th>
                                <th>Jenis Sidang</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    <h5 style="color: red"><b> Sebagai Pembimbing 2 </b> </h5> 
                    <table width="100%" class="table table-striped table-bordered table-hover" id="sidangSebagaiPembimbing2">
                        <thead>
                            <tr>
                                <th>NRP</th>
                                <th>Nama</th>
                                <th>Judul</th>
                                <th>Jenis Sidang</th>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>


                    <h5 style="color: red"><b> Sebagai Penguji 1</b> </h5> 
                    <table width="100%" class="table table-striped table-bordered table-hover" id="sidangSebagaiPenguji1">
                        <thead>
                            <tr>
                                <th>NRP</th>
                                <th>Nama</th>
                                <th>Judul</th>
                                <th>Jenis Sidang</th>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <h5 style="color: red"><b> Sebagai Penguji 2</b> </h5> 
                    <table width="100%" class="table table-striped table-bordered table-hover" id="sidangSebagaiPenguji2">
                        <thead>
                            <tr>
                                <th>NRP</th>
                                <th>Nama</th>
                                <th>Judul</th>
                                <th>Jenis Sidang</th>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

            </div>
            <!-- /#wrapper -->

            <script src="../js/index_dosen.js"></script>
            <script src="../js/fireBase.js"></script>

            <script type="text/javascript">
                $(document).ready(function () {

                    var table = $('#sidangSebagaiPembimbing1').DataTable({
                        "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                "bScrollCollapse": true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                },columns: [
                            {data: 'mahasiswa.nrp'},
                            {data: 'mahasiswa.name'},
                            {data: 'judul_topik'},
                            {data: 'sidangName'}
                        ]
                    });

                });
            </script>

            <script type="text/javascript">
                $(document).ready(function () {

                    var table = $('#sidangSebagaiPembimbing2').DataTable({
                        "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                "bScrollCollapse": true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                },columns: [
                            {data: 'mahasiswa.nrp'},
                            {data: 'mahasiswa.name'},
                            {data: 'judul_topik'},
                            {data: 'sidangName'}
                        ]
                    });

                });
            </script>

            <script type="text/javascript">
                $(document).ready(function () {

                    var table2 = $('#sidangSebagaiPenguji1').DataTable({
                        "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                "bScrollCollapse": true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                },columns: [
                            {data: 'mahasiswa.nrp'},
                            {data: 'mahasiswa.name'},
                            {data: 'judul_topik'},
                            {data: 'sidangName'}
                        ]
                    });
                });
            </script>
            <script type="text/javascript">
                $(document).ready(function () {

                    var table2 = $('#sidangSebagaiPenguji2').DataTable({
                        "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                "bScrollCollapse": true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                },columns: [
                            {data: 'mahasiswa.nrp'},
                            {data: 'mahasiswa.name'},
                            {data: 'judul_topik'},
                            {data: 'sidangName'}
                        ]
                    });
                });
            </script>


        </div>
    </div>


</body>

</html>
