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

        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9">
        </script><script src="sweetalert2.all.min.js"></script>
        <script src="sweetalert2.min.js"></script>
        <link rel="stylesheet" href="sweetalert2.min.css">
        
        <style type="text/css">
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

                <div id="halaman_sidang">
                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header">Sidang</h1>
                        </div>
                    </div>
                    <!-- /.row -->
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    Sidang
                                </div>

                                <!-- /.panel-heading -->
                                <div class="panel-body">
                                    <h4>Pilih Tahun Ajaran</h4>
                                    <div class="form-group">
                                        <select class="form-control" id="filterTahun_Ajaran" name="filterTahun_Ajaran">
                                            <option></option>
                                        </select>
                                    </div>
                                    <h5>
                                        <b> Filter Tanggal </b> : 
                                        <input type="date" id="filterTanggalSidang" name="filterTanggalSidang" value="<?php echo date("Y-m-d"); ?>" >
                                    </h5> 


                                    <table width="100%" class="table table-striped table-bordered table-hover" id="viewSidangTableFilterTanggal">
                                        <thead>
                                            <tr>
                                                <th>NRP</th>
                                                <th>Nama</th>
                                                <th>Jenis Sidang</th>
                                                <th>Jadwal</th>
                                                <th>Jam</th>
                                                <th>Ruangan</th>
<!--                                                <th>pemb 1</th>
                                                <th>pemb 2</th>
                                                <th>peng 1</th>
                                                <th>peng 2</th>-->
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                    <br/>


                                    <h4><b> Data Seluruh Sidang </b> </h4> 

                                    <h6 style="color: red"><b> Sebagai Pembimbing 1 </b> </h6> 
                                    <table width="100%" class="table table-striped table-bordered table-hover" id="viewSidangTablePemb1">
                                        <thead>
                                            <tr>
                                                <th>NRP</th>
                                                <th>Nama</th>
                                                <th>Jenis Sidang</th>
                                                <th>Jadwal</th>
                                                <th>Jam</th>
                                                <th>Ruangan</th>
<!--                                                <th>pemb 1</th>
                                                <th>pemb 2</th>
                                                <th>peng 1</th>
                                                <th>peng 2</th>-->
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>

                                    <h6 style="color: red"><b> Sebagai Pembimbing 2 </b> </h6> 
                                    <table width="100%" class="table table-striped table-bordered table-hover" id="viewSidangTablePemb2">
                                        <thead>
                                            <tr>
                                                <th>NRP</th>
                                                <th>Nama</th>
                                                <th>Jenis Sidang</th>
                                                <th>Jadwal</th>
                                                <th>Jam</th>
                                                <th>Ruangan</th>
<!--                                                <th>pemb 1</th>
                                                <th>pemb 2</th>
                                                <th>peng 1</th>
                                                <th>peng 2</th>-->
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>

                                    <h6 style="color: red"><b> Sebagai Penguji 1 </b> </h6> 
                                    <table width="100%" class="table table-striped table-bordered table-hover" id="viewSidangTablePeng1">
                                        <thead>
                                            <tr>
                                                <th>NRP</th>
                                                <th>Nama</th>
                                                <th>Jenis Sidang</th>
                                                <th>Jadwal</th>
                                                <th>Jam</th>
                                                <th>Ruangan</th>
<!--                                                <th>pemb 1</th>
                                                <th>pemb 2</th>
                                                <th>peng 1</th>
                                                <th>peng 2</th>-->
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>


                                    <h6 style="color: red"><b> Sebagai Penguji 2 </b> </h6> 
                                    <table width="100%" class="table table-striped table-bordered table-hover" id="viewSidangTablePeng2">
                                        <thead>
                                            <tr>
                                                <th>NRP</th>
                                                <th>Nama</th>
                                                <th>Jenis Sidang</th>
                                                <th>Jadwal</th>
                                                <th>Jam</th>
                                                <th>Ruangan</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>

                                </div>
                                <!-- /.panel-body -->
                            </div>
                            <!-- /.panel -->
                        </div>
                        <!-- /.col-lg-12 -->
                    </div>
                </div>

                <div id="halaman_nilai">
                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header">Nilai Sidang</h1>
                        </div>
                    </div>
                    <!-- /.row -->
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    Nilai Sidang
                                </div>

                                <br/>
                                <!-- Trigger the modal with a button -->
                                <div class="form-group" padding-top: 10px;">


                                     <div class="col-sm-12" style="text-align: left;">
                                        <table style="line-height: 2em"> 
                                            <tr>
                                                <td>Sidang  &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiSidangName"></label></td>
                                            </tr>
                                            <tr>
                                                <td>Dosen  &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiBiodataDosen"></label></td>
                                            </tr>
                                            <tr>
                                                <td>Sebagai  &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiSebagaiDosen"></label></td>
                                            </tr>
                                            <tr>
                                                <td>NRP &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiMahasiswaNrp"></label></td>
                                            </tr>
                                            <tr>
                                                <td>Name &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiMahasiswaName"></label></td>
                                            </tr>
                                            <tr>
                                                <td>Topik &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiJudulTopik"></label></td>
                                            </tr>
                                        </table>

                                        <br/>
                                    </div>

                                </div>

                                <!-- /.panel-heading -->
                                <div class="panel-body">
                                    <br/>
                                    <ul class="nav nav-tabs" style="font-size: 13px">
                                        <li id="nilai_sidang_1"><a href="#sidang_1_tab" data-toggle="tab">Sidang 1</a></li>
                                        <li id="nilai_sidang_2"><a href="#sidang_2_tab" data-toggle="tab">Sidang 2</a></li>
                                        <li id="nilai_sidang_3"><a href="#sidang_3_tab" data-toggle="tab">Sidang 3</a></li>
                                        <li id="nilai_proses_1"><a href="#nilai_proses_sidang_1_tab" data-toggle="tab">Nilai Proses Sidang 1</a></li>
                                        <li id="nilai_proses_2"><a href="#nilai_proses_sidang_2_tab" data-toggle="tab">Nilai Proses Sidang 2</a></li>
                                        <li id="nilai_proses_3"><a href="#nilai_proses_sidang_3_tab" data-toggle="tab">Nilai Proses Sidang 3</a></li>
                                        <li id="nilai_produk"><a href="#produk_tugas_akhir_tab">Produk Tugas Akhir</a></li>
                                        <li id="kosong"><a href="#kosong_tab"></a></li>
                                    </ul>

                                    <div class="tab-content">
                                        <div id="sidang_1_tab" class="tab-pane fade in active">
                                            <?php include_once './input_nilai_sidang1.php'; ?>
                                        </div>
                                        <div id="sidang_2_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_sidang2.php'; ?>
                                        </div>
                                        <div id="sidang_3_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_sidang3.php'; ?>
                                        </div> 
                                        <div id="nilai_proses_sidang_1_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_proses_sidang1.php'; ?>
                                        </div>
                                        <div id="nilai_proses_sidang_2_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_proses_sidang2.php'; ?>
                                        </div>
                                        <div id="nilai_proses_sidang_3_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_proses_sidang3.php'; ?>
                                        </div>
                                        <div id="produk_tugas_akhir_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_produk.php'; ?>
                                        </div>
                                        <div id="kosong_tab" class="tab-pane fade">
                                            <?php include_once './kosong.php'; ?>
                                        </div>
                                    </div>

                                    <script>
            $(document).ready(function () {
                $(".nav-tabs a").click(function () {
                    $(this).tab('show');
                });
            });
                                    </script>

                                </div>
                                <!-- /.panel-body -->
                            </div>
                            <!-- /.panel -->
                        </div>
                        <!-- /.col-lg-12 -->
                    </div>
                </div>

            </div>
            <!-- /#page-wrapper -->

        </div>
        <!-- /#wrapper -->

        <script src="../js/fireBase.js"></script>
        <script src="../js/sidang.js"></script>
        <script src="../js/nilai_detail.js"></script>

        <script type='text/javascript'>
            $(document).ready(function () {
                var tableTanggal = $('#viewSidangTableFilterTanggal').DataTable({
                   "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                "bScrollCollapse": true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                }, columns: [
                        {data: 'mahasiswa2.nrp'},
                        {data: 'mahasiswa2.name'},
                        {data: 'sidangName'},
                        {data: 'tanggal'},
                        {data: 'jam_mulai'},
                        {data: 'ruangan'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                return '<button type="button"  id="btnBeriNilai" class="btn btn-warning" onClick="beriNilaiSidang(\'' + row.id_topik + '\',\'' + row.mahasiswa2.nrp + '\',\'' + row.sidangName + '\',\'' + row.sidangId + '\',\'' + row.tanggal + '\',\'' + row.dosen_penguji1.nik + '\',\'' + row.dosen_penguji2.nik + '\')">Beri Nilai</button>'
                            }
                        }
                    ]
                });


                var table = $('#viewSidangTablePemb1').DataTable({
                    "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                "bScrollCollapse": true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                },columns: [
                        {data: 'mahasiswa2.nrp'},
                        {data: 'mahasiswa2.name'},
                        {data: 'sidangName'},
                        {data: 'tanggal'},
                        {data: 'jam_mulai'},
                        {data: 'ruangan'},
//                            {data: 'pemb1'},
//                            {data: 'pemb2'},
//                            {data: 'peng1'},
//                            {data: 'peng2'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                return '<button type="button"  class="btn btn-warning" onClick="beriNilaiSidang(\'' + row.id_topik + '\',\'' + row.mahasiswa2.nrp + '\',\'' + row.sidangName + '\',\'' + row.sidangId + '\',\'' + row.tanggal + '\',\'' + row.dosen_penguji1.nik + '\',\'' + row.dosen_penguji2.nik + '\')">Beri Nilai</button>'
                            }
                        }
                    ]
                });
                var table1 = $('#viewSidangTablePemb2').DataTable({
                    "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                "bScrollCollapse": true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                },columns: [
                        {data: 'mahasiswa2.nrp'},
                        {data: 'mahasiswa2.name'},
                        {data: 'sidangName'},
                        {data: 'tanggal'},
                        {data: 'jam_mulai'},
                        {data: 'ruangan'},
//                            {data: 'pemb1'},
//                            {data: 'pemb2'},
//                            {data: 'peng1'},
//                            {data: 'peng2'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                return '<button type="button"  class="btn btn-warning" onClick="beriNilaiSidang(\'' + row.id_topik + '\',\'' + row.mahasiswa2.nrp + '\',\'' + row.sidangName + '\',\'' + row.sidangId + '\',\'' + row.tanggal + '\',\'' + row.dosen_penguji1.nik + '\',\'' + row.dosen_penguji2.nik + '\')">Beri Nilai</button>'
                            }
                        }
                    ]
                });
                var table2 = $('#viewSidangTablePeng1').DataTable({
                    "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                "bScrollCollapse": true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                },columns: [
                        {data: 'mahasiswa2.nrp'},
                        {data: 'mahasiswa2.name'},
                        {data: 'sidangName'},
                        {data: 'tanggal'},
                        {data: 'jam_mulai'},
                        {data: 'ruangan'},
//                            {data: 'pemb1'},
//                            {data: 'pemb2'},
//                            {data: 'peng1'},
//                            {data: 'peng2'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                return '<button type="button"  class="btn btn-warning" onClick="beriNilaiSidang(\'' + row.id_topik + '\',\'' + row.mahasiswa2.nrp + '\',\'' + row.sidangName + '\',\'' + row.sidangId + '\',\'' + row.tanggal + '\',\'' + row.dosen_penguji1.nik + '\',\'' + row.dosen_penguji2.nik + '\')">Beri Nilai</button>'
                            }
                        }
                    ]
                });
                var table3 = $('#viewSidangTablePeng2').DataTable({
                    "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                "bScrollCollapse": true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                },columns: [
                        {data: 'mahasiswa2.nrp'},
                        {data: 'mahasiswa2.name'},
                        {data: 'sidangName'},
                        {data: 'tanggal'},
                        {data: 'jam_mulai'},
                        {data: 'ruangan'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                return '<button type="button"  class="btn btn-warning" onClick="beriNilaiSidang(\'' + row.id_topik + '\',\'' + row.mahasiswa2.nrp + '\',\'' + row.sidangName + '\',\'' + row.sidangId + '\',\'' + row.tanggal + '\',\'' + row.dosen_penguji1.nik + '\',\'' + row.dosen_penguji2.nik + '\')">Beri Nilai</button>'
                            }
                        }
                    ]
                });
            });
        </script>
    </body>
</html>
