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
    </head>

    <body>

        <div id="wrapper">
            <!-- Navigation -->
            <?php include_once './header.php'; ?>

            <div id="page-wrapper">

                <div id="halaman_nilai">
                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header">Nilai</h1>
                        </div>
                    </div>
                    <!-- /.row -->
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    Nilai
                                </div>
                                <!-- /.panel-heading -->
                                <div class="panel-body">
                                    <h4>Pilih Tahun Ajaran</h4>
                                    <div class="form-group">
                                        <select class="form-control" id="filterTahun_Ajaran" name="filterTahun_Ajaran">
                                            <option></option>
                                        </select>
                                    </div>
                                    <table width="100%" class="table table-striped table-bordered table-hover" id="nilaiAkhirTable">
                                        <thead>
                                            <tr>
                                                <th>NRP</th>
                                                <th>Nama</th>
                                                <th>Sidang 1</th>
                                                <th>Sidang 2</th>
                                                <th>Sidang Akhir</th>
                                                <th>Nilai TA</th>
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


                <div id="halaman_detail_nilai">
                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header">Detail Nilai Sidang</h1>
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
                                        <!--<li id="nilai_sidang_1" class="active"><a href="#sidang_1_tab">Sidang 1</a></li>-->
                                        <?php
                                        $nama = 'Lydia';
                                        if ($nama == 'Lydia') {
                                            ?>
                                            <li id="nilai_sidang_1"><a href="#sidang_1_tab" data-toggle="tab">Sidang 1</a></li>
                                            <?php
                                        }
                                        ?>
                                        <li id="nilai_sidang_2"><a href="#sidang_2_tab" data-toggle="tab">Sidang 2</a></li>
                                        <li id="nilai_sidang_3"><a href="#sidang_3_tab" data-toggle="tab">Sidang 3</a></li>
                                        <li id="nilai_proses_1"><a href="#nilai_proses_sidang_1_tab" data-toggle="tab">Nilai Proses Sidang 1</a></li>
                                        <li id="nilai_proses_2"><a href="#nilai_proses_sidang_2_tab" data-toggle="tab">Nilai Proses Sidang 2</a></li>
                                        <li id="nilai_proses_3"><a href="#nilai_proses_sidang_3_tab" data-toggle="tab">Nilai Proses Sidang 3</a></li>
                                        <li id="nilai_produk"><a href="#produk_tugas_akhir_tab">Produk Tugas Akhir</a></li>
                                    </ul>

                                    <div class="tab-content">
                                        <div id="sidang_1_tab" class="tab-pane fade in active">
                                            <?php include_once './input_nilai_sidang1_detail.php'; ?>
                                        </div>
                                        <div id="sidang_2_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_sidang2.php'; ?>
                                        </div>
                                        <div id="sidang_3_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_sidang3.php'; ?>
                                        </div> <div id="nilai_proses_sidang_1_tab" class="tab-pane fade">
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
        <script src="../js/nilai_admin.js"></script>

        <script type='text/javascript'>
                                        $(document).ready(function () {
                                            var table = $('#nilaiAkhirTable').DataTable({
                                                columns: [
                                                    {data: 'mahasiswa.nrp'},
                                                    {data: 'mahasiswa.name'},
                                                    {
                                                        data: 'null',
                                                        render: function (data, type, row) {
                                                            if (typeof row.nilaiSidang1 !== 'undefined') {
                                                                return row.nilaiSidang1;
                                                            } else {
                                                                return '<span class="noPerwalian"> - </span>';
                                                            }
                                                        }
                                                    },
                                                    {
                                                        data: 'null',
                                                        render: function (data, type, row) {
                                                            if (typeof row.nilaiSidang2 !== 'undefined') {
                                                                return row.nilaiSidang2;
                                                            } else {
                                                                return '<span class="noPerwalian"> - </span>';
                                                            }
                                                        }
                                                    },
                                                    {
                                                        data: 'null',
                                                        render: function (data, type, row) {
                                                            if (typeof row.nilaiSidang3 !== 'undefined') {
                                                                return row.nilaiSidang3;
                                                            } else {
                                                                return '<span class="noPerwalian"> - </span>';
                                                            }
                                                        }
                                                    },
                                                    {
                                                        data: 'null',
                                                        render: function (data, type, row) {
                                                            if (typeof row.hasilNilaiAkhirTAMahasiswa !== 'undefined') {
                                                                return row.hasilNilaiAkhirTAMahasiswa;
                                                            } else {
                                                                return '<span class="noPerwalian"> - </span>';
                                                            }
                                                        }
                                                    },
                                                    {
                                                        data: 'null',
                                                        render: function (data, type, row) {
                                                            return '<button class="btn btn-info" onClick="lihatDetailNilai(\'' + row.id_topik + '\',\'' + row.mahasiswa.nrp + '\',\'' + row.sidangName + '\',\'' + row.sidangId + '\')"><span class="glyphicon glyphicon-info-sign"></span > Detail</button>'
                                                        }
                                                    }
                                                ]
                                            });

//                
                                        });
        </script>
    </body>
</html>
