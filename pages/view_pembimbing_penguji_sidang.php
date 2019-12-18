<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="../images/Icon IT.png" type="image/x-icon"/>

        <title>Sistem Pengelolaan Tugas Akhir</title>

        <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase-auth.js"></script>


        <style type="text/css">

            select {
                overflow-y: scroll;
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
                        <h1 class="page-header">View Dosen Pembimbing & Dosen Penguji</h1>
                    </div>
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                View Dosen Pembimbing & Dosen Penguji
                            </div>

                            <!-- /.panel-heading -->
                            <div class="panel-body">
                                <h4>Pilih Tahun Ajaran</h4>
                                <div class="form-group">
                                    <select class="form-control" id="filterTahun_Ajaran" name="filterTahun_Ajaran">
                                        <option></option>
                                    </select>
                                </div>


                                <h4>Pilih Dosen</h4>
                                <div class="form-group">
                                    <select class="form-control" id="filterDosen" name="filterDosen">
                                        <option></option>
                                    </select>
                                </div>


                                <h5><b> Sebagai Pembimbing </b> </h5> 
                                <table width="100%" class="table table-striped table-bordered table-hover" id="sidangSebagaiPembimbing">
                                    <thead>
                                        <tr>
                                            <th>NRP</th>
                                            <th>Nama</th>
                                            <th>Judul</th>
                                            <th>Jenis Sidang</th>
                                            <th>Pembimbing 1</th>
                                            <th>Pembimbing 2</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>

                                <h5><b> Sebagai Penguji </b> </h5> 
                                <table width="100%" class="table table-striped table-bordered table-hover" id="sidangSebagaiPenguji">
                                    <thead>
                                        <tr>
                                            <th>NRP</th>
                                            <th>Nama</th>
                                            <th>Judul</th>
                                            <th>Jenis Sidang</th>
                                            <th>Penguji 1</th>
                                            <th>Penguji 2</th>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>

                            </div>
                            <!-- /.panel-body -->
                        </div>
                        <!--./panel-body-->
                    </div>
                    <!-- /.panel -->
                </div>
                <!--./col-lg-12-->
            </div>
            <!--./row-->
        </div>
        <!--./page-wrapper-->
    </div>
    <!--./wrapper-->

    <script src="../js/fireBase.js"></script>
    <script src="../js/view_pemimbing_penguji_sidang.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {

            var table = $('#sidangSebagaiPembimbing').DataTable({
                "sScrollX": "100%",
                "sScrollXInner": "100%",
                "bScrollCollapse": true,
                responsive: true,
                "fixedColumns": {
                    "leftColumns": 1
                }, columns: [
                    {data: 'mahasiswa2.nrp'},
                    {data: 'mahasiswa2.name'},
                    {data: 'judul2_topik'},
                    {data: 'sidangName'},
                    {data: 'dosen_pembimbing1'},
                    {data: 'dosen_pembimbing2'}
                ]
            });

        });
    </script>

    <script type="text/javascript">
        $(document).ready(function () {

            var table2 = $('#sidangSebagaiPenguji').DataTable({
                "sScrollX": "100%",
                "sScrollXInner": "100%",
                "bScrollCollapse": true,
                responsive: true,
                "fixedColumns": {
                    "leftColumns": 1
                }, columns: [
                    {data: 'mahasiswa2.nrp'},
                    {data: 'mahasiswa2.name'},
                    {data: 'judul2_topik'},
                    {data: 'sidangName'},
                    {data: 'dosen_penguji1'},
                    {data: 'dosen_penguji2'}
                ]
            });
        });
    </script>
</body>
</html>
