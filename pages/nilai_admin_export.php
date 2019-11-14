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

        <link rel="stylesheet" type="text/css" href="../dist/css/jquery.dataTables.min.css">
        <link rel="stylesheet" type="text/css" href="../dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="../dist/css/dataTables.bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="../dist/css/buttons.dataTables.min.css">
        <link rel="stylesheet" type="text/css" href="../dist/css/style.css">
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
                                                <th>Nilai Mutu</th>
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
            </div>
            <!-- /#page-wrapper -->
        </div>
        <!-- /#wrapper -->
        <script src="../js/fireBase.js"></script>
        <script src="../js/nilai_admin.js"></script>



        <script type="text/javascript" src="../dist/js/jquery-2.2.4.min.js"></script>
        <script type="text/javascript" src="../dist/js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="../dist/js/dataTables.buttons.min.js"></script>
        <script type="text/javascript" src="../dist/js/jszip.min.js"></script>
        <script type="text/javascript" src="../dist/js/pdfmake.min.js"></script>
        <script type="text/javascript" src="../dist/js/vfs_fonts.js"></script>
        <script type="text/javascript" src="../dist/js/buttons.html5.min.js"></script>
        <script type="text/javascript" src="../dist/js/buttons.print.min.js"></script> 

        <script type='text/javascript'>
            $(document).ready(function () {
                var table = $('#nilaiAkhirTable').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5'
                        },
                        {
                            extend: 'print'
                        },
                        {
                            extend: 'pdfHtml5',
                            download: 'open'
                        }
                    ],
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
                                if (typeof row.nilaiTA !== 'undefined') {
                                    return '<label><b>' + row.nilaiTA + '</b></label>';
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.nilaiMutu !== 'undefined') {
                                    return '<label><b>' + row.nilaiMutu + '</b></label>';
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        }
                    ]
                });
            });
        </script>
    </body>
</html>