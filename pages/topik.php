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
                        <h1 class="page-header">Topik</h1>
                    </div>
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                Topik
                            </div>

                            <br/>
                            <!-- Trigger the modal with a button -->
                            <div class="form-group" padding-top: 10px;">

                                 <div class="col-sm-6" style="text-align: left;">
                                    <button type="button" data-toggle="modal" data-target="#topikModal" id="btn-newTopik" value="Simpan" class="btn btn-info">Tambah Topik</button>
                                </div>

                                <div class="col-sm-6" style="text-align: right;">
                                    <div class="modal modal-primary fade" id="modal-import" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                        <div class="container"><!-- container class is used to centered  the body of the browser with some decent width-->
                                            <div class="row"><!-- row class is used for grid system in Bootstrap-->
                                                <div class="col-md-4 col-md-offset-4"><!--col-md-4 is used to create the no of colums in the grid also use for medimum and large devices-->
                                                    <div class="login-panel panel panel-success">
                                                        <div class="panel-heading"> 
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span></button> 
                                                            <h3 class="panel-title">Import Data Dari CSV</h3>

                                                        </div>
                                                        <div class="panel-body">
                                                            <form method="post" action="import/import_topik.php" enctype="multipart/form-data">
                                                                <fieldset>
                                                                    <div class="form-group">
                                                                        <input type="file" name="file"/>
                                                                    </div>
                                                                    <input class="btn btn-success" type="submit" name="submit_file" value="Submit"/>
                                                                </fieldset>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" data-toggle="modal" data-target="#modal-import" id="btn-import" class=" btn btn-success ">
                                        <span class="glyphicon glyphicon-upload"></span> Import Data Dari CSV
                                    </button>
                                </div>
                            </div>

                            <br/>
                            <br/>
                            <!-- /.panel-heading -->
                            <div class="panel-body">
                                <h4>Pilih Tahun Ajaran</h4>
                                <div class="form-group">
                                    <select class="form-control" id="filterTahun_Ajaran" name="filterTahun_Ajaran">
                                        <option></option>
                                    </select>
                                </div>

                                <table width="100%" class="table table-striped table-bordered table-hover" id="topikTable">
                                    <thead>
                                        <tr>
                                            <th>NRP</th>
                                            <th>Nama</th>
                                            <th>Pemb 1</th>
                                            <th>Pemb 2</th>
                                            <th>Topik</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>

                                <!-- add modal -->
                                <div class="modal fade" tabindex="-1" role="dialog" id="topikModal">
                                    <div class="modal-dialog" style="width: 50%" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span></button>
                                                <h4 class="modal-title">
                                                    <span class="glyphicon glyphicon-plus-sign"></span>  
                                                    <label id="tambah">Tambah</label> Topik</h4>
                                            </div>

                                            <form class="form-horizontal" method="POST" id="formTopik">

                                                <div class="modal-body">
                                                    <div class="messages"></div>


                                                    <div class="form-group">
                                                        <label for="txtTahunAjaran" class="col-sm-4 control-label">Tahun Ajaran</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="comboTahun_Ajaran" name="comboTahun_Ajaran" placeholder="Tahun Ajaran">

                                                        </div>
                                                    </div>

                                                    <div class="form-group" id="divTabelPilihMhs"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtPilihMhs" class="col-sm-4 control-label" style="text-align: center">Pilih 1 Mahasiswa</label>

                                                        <div class="col-sm-12"> 
                                                            <br>
                                                            <table width="100%" class="table table-striped table-bordered table-hover" id="mahasiswaTableTopik">
                                                                <thead>
                                                                    <tr>
                                                                        <th>NRP</th>
                                                                        <th>Nama</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody >
                                                                </tbody>
                                                            </table>


                                                        </div>
                                                    </div>

                                                    <div class="form-group" id="divMahasiswa"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtTopikMahasiswaUpdate" class="col-sm-4 control-label">Mahasiswa</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="txtTopikMahasiswaUpdate" name="txtTopikMahasiswaUpdate" placeholder="Mahasiswa">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>


                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtTopikJudul" class="col-sm-4 control-label">Judul Topik</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="txtTopikJudul" name="txtTopikJudul" placeholder="Topik">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtTopikDosenPemb1" class="col-sm-4 control-label">Dosen Pembimbing 1</label>
                                                        <div class="col-sm-8"> 
                                                            <select  style="width: 100%" placeholder="Dosen Pembimbing 1" name="comboTopikDosenPemb1" id="comboTopikDosenPemb1" required>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtTopikDosenPemb2" class="col-sm-4 control-label">Dosen Pembimbing 2</label>
                                                        <div class="col-sm-8"> 
                                                            <select  style="width: 100%" placeholder="Dosen Pembimbing 2" name="comboTopikDosenPemb2" id="comboTopikDosenPemb2" required>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                        <button type="submit" id="btnSaveTopik" name="btnSaveTopik" class="btn btn-primary"><label id="update">Simpan</label> Topik</button>
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
        <script src="../js/topik.js"></script>
        <script src="../js/import/import_topik.js"></script>

        <script type='text/javascript'>
            $(document).ready(function () {
                var table = $('#mahasiswaTableTopik').DataTable({
                    responsive: true,
                    "pagingType": "full",
                    "scrollCollapse": true,
                    "select": true,
                    "lengthMenu": [5, 10, 15, "All"],
                    columns: [
                        {data: "nrp"},
                        {data: "name"}
                    ]
                });

                $('#mahasiswaTableTopik tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                var table1 = $('#topikTable').DataTable({
                    columns: [
                        {data: 'mahasiswa.nrp'},
                        {data: 'mahasiswa.name'},
                        {data: 'dosen_pembimbing1.name'},
                        {data: 'dosen_pembimbing2.name'},
                        {data: 'judul_topik'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                return '<button id="updateTopik" class="btn btn-warning" onClick="updateTopik(\'' + row.id + '\',\'' + row.mahasiswa.nrp + '\')">Update</button>'
                            }
                        }
                    ]
                });
            });
        </script>
    </body>
</html>
