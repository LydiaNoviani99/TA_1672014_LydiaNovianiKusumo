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


                                <h6><b> Sebagai Pembimbing 1 </b> </h6> 
                                <table width="100%" class="table table-striped table-bordered table-hover" id="nilaiTablePemb1">
                                    <thead>
                                        <tr>
                                            <th>NRP</th>
                                            <th>Nama</th>
                                            <th>Sidang 1</th>
                                            <th>Sidang 2</th>
                                            <th>Sidang Akhir</th>
                                            <th>Nilai TA</th>
                                            <th colspan="3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                                <h6><b> Sebagai Pembimbing 2 </b> </h6> 
                                <table width="100%" class="table table-striped table-bordered table-hover" id="nilaiTablePemb2">
                                    <thead>
                                        <tr>
                                            <th>NRP</th>
                                            <th>Nama</th>
                                            <th>Sidang 1</th>
                                            <th>Sidang 2</th>
                                            <th>Sidang Akhir</th>
                                            <th>Nilai TA</th>
                                            <th colspan="3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>

                                <h6><b> Sebagai Penguji 1 </b> </h6> 
                                <table width="100%" class="table table-striped table-bordered table-hover" id="nilaiTablePeng1">
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


                                <h6><b> Sebagai Penguji 2 </b> </h6> 
                                <table width="100%" class="table table-striped table-bordered table-hover" id="nilaiTablePeng2">
                                    <thead>
                                        <tr>
                                            <th>NRP</th>
                                            <th>Nama</th>
                                            <th>Sidang 1</th>
                                            <th>Sidang 2</th>
                                            <th>Sidang Akhir</th>
                                            <!--<th>Nilai TA</th>-->
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>



                                <!-- add modal -->
                                <div class="modal fade" tabindex="-1" role="dialog" id="nilaiModal">
                                    <div class="modal-dialog" style="width: 50%" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                <h4 class="modal-title">
                                                    <span class="glyphicon glyphicon-plus-sign"></span>  
                                                    <label id="tambah">Tambah</label> Nilai</h4>
                                            </div>

                                            <form class="form-horizontal" = method="POST" id="formNilai">

                                                <div class="modal-body">
                                                    <div class="messages"></div>

                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtNilaiNRP" class="col-sm-4 control-label">NRP</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="txtNilaiNRP" name="txtNilaiNRP" placeholder="NRP">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtNilaiNama" class="col-sm-4 control-label">Nama</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="txtNilaiNama" name="txtNilaiNama" placeholder="Nama">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtNilaiJudul" class="col-sm-4 control-label">Nilai</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="txtNilaiJudul" name="txtNilaiJudul" placeholder="Nilai">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtNilaiDosenPemb1" class="col-sm-4 control-label">Dosen Pembimbing 1</label>
                                                        <div class="col-sm-8"> 
                                                            <select  style="width: 100%" placeholder="Dosen Pembimbing 1" name="comboNilaiDosenPemb1" id="comboNilaiDosenPemb1" required>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtNilaiDosenPemb2" class="col-sm-4 control-label">Dosen Pembimbing 2</label>
                                                        <div class="col-sm-8"> 
                                                            <select  style="width: 100%" placeholder="Dosen Pembimbing 2" name="comboNilaiDosenPemb2" id="comboNilaiDosenPemb2" required>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                        <button type="submit" id="btnSaveNilai" name="btnSaveNilai" class="btn btn-primary"><label id="update">Simpan</label> Nilai</button>
                                                    </div>
                                            </form> 
                                        </div><!-- /.modal-content -->
                                    </div><!-- /.modal-dialog -->
                                </div><!-- /.modal -->
                                <!-- /add modal -->

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
        <script src="../js/nilai.js"></script>

        <script type='text/javascript'>
            $(document).ready(function () {
//                fetchNilaiData(putNilaiDataToTable(), 'nilaiTable')
                var table = $('#nilaiTablePemb1').DataTable({
                    columns: [
                        {data: 'mahasiswa.nrp'},
                        {data: 'mahasiswa.name'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirSidang1 !== "undefined") {
                                    return row.hasilNilaiAkhirSidang1;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirSidang2 !== "undefined") {
                                    return row.hasilNilaiAkhirSidang2;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirSidang3 !== "undefined") {
                                    return row.hasilNilaiAkhirSidang3;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirTAMahasiswa !== "undefined") {
                                    return row.hasilNilaiAkhirTAMahasiswa;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        }
                    ]
                });

                var table1 = $('#nilaiTablePemb2').DataTable({
                    columns: [
                        {data: 'mahasiswa.nrp'},
                        {data: 'mahasiswa.name'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirSidang1 !== "undefined") {
                                    return row.hasilNilaiAkhirSidang1;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirSidang2 !== "undefined") {
                                    return row.hasilNilaiAkhirSidang2;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirSidang3 !== "undefined") {
                                    return row.hasilNilaiAkhirSidang3;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirTAMahasiswa !== "undefined") {
                                    return row.hasilNilaiAkhirTAMahasiswa;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        }
                    ]
                });

                var table2 = $('#nilaiTablePeng1').DataTable({
                    columns: [
                        {data: 'mahasiswa.nrp'},
                        {data: 'mahasiswa.name'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirSidang1 !== "undefined") {
                                    return row.hasilNilaiAkhirSidang1;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirSidang2 !== "undefined") {
                                    return row.hasilNilaiAkhirSidang2;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirSidang3 !== "undefined") {
                                    return row.hasilNilaiAkhirSidang3;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirTAMahasiswa !== "undefined") {
                                    return row.hasilNilaiAkhirTAMahasiswa;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        }
                        
                        
                        
                    ]
                });

                var table3 = $('#nilaiTablePeng2').DataTable({
                    columns: [
                        {data: 'mahasiswa.nrp'},
                        {data: 'mahasiswa.name'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirSidang1 !== "undefined") {
                                    return row.hasilNilaiAkhirSidang1;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirSidang2 !== "undefined") {
                                    return row.hasilNilaiAkhirSidang2;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirSidang3 !== "undefined") {
                                    return row.hasilNilaiAkhirSidang3;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.hasilNilaiAkhirTAMahasiswa !== "undefined") {
                                    return row.hasilNilaiAkhirTAMahasiswa;
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
