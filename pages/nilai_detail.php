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



        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        
        
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
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Nilai Detail</h1>
                    </div>
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                Nilai Detail
                            </div>

                            <br/>
                            <!-- Trigger the modal with a button -->
                            <div class="form-group" padding-top: 10px;">


                                 <div class="col-sm-12" style="text-align: left;">
                                    <table style="line-height: 2em"> 
                                        <tr>
                                            <td>NRP</td>
                                            <td>:</td>
                                            <td><label id=""></label></td>
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                            <td>:</td>
                                            <td><label id=""></label></td>
                                        </tr>
                                        <tr>
                                            <td>Pembimbing / Ev 1</td>
                                            <td> :</td>
                                            <td><label id=""></label></td>
                                        </tr>
                                        <tr>
                                            <td>Pembimbing 2</td>
                                            <td>:</td>
                                            <td><label id=""></label></td>
                                        </tr>
                                        <tr>
                                            <td>Penguji / Ev 1</td>
                                            <td>:</td>
                                            <td><label id=""></label></td>
                                        </tr>
                                        <tr>
                                            <td>Penguji 2</td>
                                            <td>:</td>
                                            <td><label id=""></label></td>
                                        </tr>
                                        <tr>
                                            <td>Topik</td>
                                            <td>:</td>
                                            <td><label id=""></label></td>
                                        </tr>
                                    </table>
                                </div>

                            </div>

                            <br/>
                            <br/>
                            <!-- /.panel-heading -->
                            <div class="panel-body">
                                <br/>
                                <ul class="nav nav-tabs" style="font-size: 13px">
                                    <li><a href="#nilai_proses_sidang_1_tab">Nilai Proses Sidang 1</a></li>
                                    <li class="active"><a href="#sidang_1_tab">Sidang 1</a></li>
                                    <li><a href="#nilai_proses_sidang_2_tab">Nilai Proses Sidang 2</a></li>
                                    <li><a href="#sidang_2_tab">Sidang 2</a></li>
                                    <li><a href="#nilai_proses_sidang_3_tab">Nilai Proses Sidang 3</a></li>
                                    <li><a href="#sidang_tugas_akhir_tab">Sidang 3</a></li>
                                    <li><a href="#produk_tugas_akhir_tab">Produk Tugas Akhir</a></li>
                                </ul>

                                <div class="tab-content">
                                    <div id="nilai_proses_sidang_1_tab" class="tab-pane fade in active">
                                        <?php include_once './detail_nilai_proses_sidang1.php'; ?>
                                    </div>
                                    <div id="sidang_1_tab" class="tab-pane fade in active">
                                        <?php include_once './detail_nilai_sidang1.php'; ?>
                                    </div>
                                    <div id="nilai_proses_sidang_2_tab" class="tab-pane fade in active">
                                        <?php include_once './detail_nilai_proses_sidang2.php'; ?>
                                    </div>
                                    <div id="sidang_2_tab" class="tab-pane fade">
                                        <?php include_once './detail_nilai_sidang2.php'; ?>
                                    </div>
                                    <div id="nilai_proses_sidang_3_tab" class="tab-pane fade in active">
                                        <?php include_once './detail_nilai_proses_sidang3.php'; ?>
                                    </div>
                                    <div id="sidang_tugas_akhir_tab" class="tab-pane fade">
                                        <?php include_once './detail_nilai_sidang3.php'; ?>
                                    </div>
                                    <div id="produk_tugas_akhir_tab" class="tab-pane fade">
                                        <?php include_once './detail_nilai_produk.php'; ?>
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
            <!-- /#page-wrapper -->

        </div>
        <!-- /#wrapper -->

        <script src="../js/fireBase.js"></script>
        <script src="../js/nilai_detail.js"></script>

        <script type='text/javascript'>
                                    $(document).ready(function () {
//                fetchNilaiData(putNilaiDataToTable(), 'nilaiTable')
                                        var table = $('#nilaiTable').DataTable({
                                           "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                "bScrollCollapse": true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                }, columns: [
                                                {data: 'mahasiswa.nrp'},
                                                {data: 'mahasiswa.name'},
                                                {data: 'sidang_1.nilai'},
                                                {data: 'sidang_2.nilai'},
                                                {data: 'sidang_akhir.nilai'},
                                                {data: 'nilai_ta.nilai'},
                                                {
                                                    data: 'null',
                                                    render: function (data, type, row) {
                                                        return '<button type="button"  class="btn btn-warning" onClick="detailNilai(\'' + row.nrp + '\')">Detail</button>'
                                                    }
                                                },
                                                {
                                                    data: 'null',
                                                    render: function (data, type, row) {
                                                        return '<button type="button"  class="btn btn-warning" onClick="updateNilai(\'' + row.nrp + '\')">Update</button>'
                                                    }
                                                },
                                                {
                                                    data: 'null',
                                                    render: function (data, type, row) {
                                                        return '<button type="button"  class="btn btn-danger" onClick="deleteNilai(\'' + row.nrp + '\')">Delete</button>'
                                                    }
                                                }
                                            ]
                                        });
                                    });
        </script>
    </body>
</html>
