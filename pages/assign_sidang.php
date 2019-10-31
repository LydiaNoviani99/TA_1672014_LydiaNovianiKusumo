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
        </style>
    </head>

    <body>
        <div id="wrapper">
            <!-- Navigation -->
            <?php include_once './header.php'; ?>

            <div id="page-wrapper">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Assign Sidang</h1>
                    </div>
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                Assign Sidang
                            </div>

                            <br/>
                            <!-- Trigger the modal with a button -->
                            <div class="form-group" padding-top: 10px;">

                                 <div class="col-sm-12" style="text-align: right;">
                                    <div class="modal modal-primary fade" id="modal-import" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                        <div class="container"><!-- container class is used to centered  the body of the browser with some decent width-->
                                            <div class="row"><!-- row class is used for grid system in Bootstrap-->
                                                <div class="col-md-4 col-md-offset-4"><!--col-md-4 is used to create the no of colums in the grid also use for medimum and large devices-->
                                                    <div class="login-panel panel panel-success">
                                                        <div class="panel-heading">
                                                            <h3 class="panel-title">Import Data Dari CSV</h3>
                                                        </div>
                                                        <div class="panel-body">
                                                            <form method="post" action="import/import_mahasiswa.php" enctype="multipart/form-data">
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


                            <!-- /.panel-heading -->
                            <div class="panel-body">
                                <h4>Pilih Tahun Ajaran</h4>
                                <div class="form-group">
                                    <select class="form-control" id="filterTahun_Ajaran" name="filterTahun_Ajaran">
                                        <option></option>
                                    </select>
                                </div>

                                <table  style="width:100%" class="table table-striped table-bordered table-hover responsive nowrap" id="assign_sidangTable">
                                    <thead>
                                        <tr>
                                            <th>Detail</th>
                                            <th>NRP</th>
                                            <th>Nama</th>
                                            <th>Topik</th>
                                            <th colspan="3">Sidang</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>

                                <!-- add modal -->
                                <div class="modal fade" tabindex="-1" role="dialog" id="lihatDetailSidang"  data-keyboard="false" data-backdrop="static">
                                    <div class="modal-dialog" style="width: 50%" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                <h4 class="modal-title">
                                                    <span class="glyphicon glyphicon-info-sign"></span> 
                                                    Detail Sidang</h4>
                                            </div>

                                            <form class="form-horizontal" method="POST" id="formDetailSidang">

                                                <div class="modal-body">
                                                    <div class="messages"></div>

                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label class="col-sm-4 control-label">NRP : </label>
                                                        <div class="col-sm-8"> 
                                                            <label id='lihatNrp'></label>
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label class="col-sm-4 control-label">Nama : </label>
                                                        <div class="col-sm-8"> 
                                                            <b id='lihatNama'></b>
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label class="col-sm-4 control-label">Judul Topik : </label>
                                                        <div class="col-sm-8"> 
                                                            <b id='lihatJudulTopik'></b>
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label class="col-sm-4 control-label">Dosen Pembimbing 1 : </label>
                                                        <div class="col-sm-8"> 
                                                            <b id='lihatDosenPembimbing1'></b>
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label class="col-sm-4 control-label">Dosen Pembimbing 2 : </label>
                                                        <div class="col-sm-8"> 
                                                            <b id='lihatDosenPembimbing2'></b>
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>

                                                    <ul class="nav nav-tabs" style="font-size: 13px">
                                                        <li class="active"><a href="#detailSidang1">Sidang 1</a></li>
                                                        <li><a href="#detailSidang2">Sidang 2</a></li>
                                                        <li><a href="#detailSidang3">Sidang 3</a></li>
                                                    </ul>

                                                    <br/>
                                                    <div class="tab-content">
                                                        <div id="detailSidang1" class="tab-pane fade in active">
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Dosen Penguji 1 : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihatDosenPenguji1'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Dosen Penguji 2 : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihatDosenPenguji2'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Tanggal : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihatTanggalSidang'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Jam : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihatJamSidang'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Ruangan : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihatRuanganSidang'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Catatan : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihatCatatanSidang'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="detailSidang2" class="tab-pane">
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Dosen Penguji 1 : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihat2DosenPenguji1'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Dosen Penguji 2 : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihat2DosenPenguji2'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Tanggal : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihat2TanggalSidang'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Jam : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihat2JamSidang'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Ruangan : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihat2RuanganSidang'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Catatan : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihat2CatatanSidang'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="detailSidang3" class="tab-pane">
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Dosen Penguji 1 : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihat3DosenPenguji1'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Dosen Penguji 2 : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihat3DosenPenguji2'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Tanggal : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihat3TanggalSidang'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Jam : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihat3JamSidang'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Ruangan : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihat3RuanganSidang'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                            <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                                <label class="col-sm-4 control-label">Catatan : </label>
                                                                <div class="col-sm-8"> 
                                                                    <b id='lihat3CatatanSidang'></b>
                                                                    <!-- here the text will apper -->
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <script>
                                                        $(document).ready(function () {
                                                            $(".nav-tabs a").click(function () {
                                                                $(this).tab('show');
                                                            });
                                                        });
                                                    </script>



                                                    <div class="modal-footer">

                                                    </div>
                                                </div><!-- /.modal-content -->
                                            </form> 
                                        </div><!-- /.modal-dialog -->
                                    </div><!-- /.modal -->
                                </div> <!-- /add modal -->

                                <!-- MODAL SIDANG 1 -->
                                <!-- add modal -->
                                <div class="modal fade" tabindex="-1" role="dialog" id="sidang1Modal">
                                    <div class="modal-dialog" style="width: 50%" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                <h4 class="modal-title">
                                                    <span class="glyphicon glyphicon-plus-sign"></span>  
                                                    <label id="tambah">Tambah</label> Sidang</h4>
                                            </div>

                                            <form class="form-horizontal" = method="POST" id="formSidang">
                                                <div class="modal-body">
                                                    <div class="messages"></div>

                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtSidang1Jenis" class="col-sm-4 control-label">Jenis Sidang</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="txtSidang1Jenis" name="txtSidang1Jenis" placeholder="Sidang 1/2/3">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>

                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtSidang1Mahasiswa" class="col-sm-4 control-label">Mahasiswa</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="txtSidang1Mahasiswa" name="txtSidang1Mahasiswa" placeholder="NRP-Mahasiswa">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtSidang1Topik" class="col-sm-4 control-label">Topik</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="txtSidang1Topik" name="txtSidang1Topik" placeholder="Topik">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="comboSidangDosenPemb1" class="col-sm-4 control-label">Dosen Pembimbing 1</label>
                                                        <div class="col-sm-8"> 
                                                            <select  style="width: 100%" placeholder="Dosen Pembimbing 1" name="comboSidangDosenPemb1" id="comboSidangDosenPemb1" required>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="comboSidangDosenPemb2" class="col-sm-4 control-label">Dosen Pembimbing 2</label>
                                                        <div class="col-sm-8"> 
                                                            <select  style="width: 100%" placeholder="Dosen Pembimbing 2" name="comboSidangDosenPemb2" id="comboSidangDosenPemb2" required>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtSidang1DosenPeng1" class="col-sm-4 control-label">Dosen Penguji 1</label>
                                                        <div class="col-sm-8"> 
                                                            <select  style="width: 100%" placeholder="Dosen Penguji 1" name="comboSidangDosenPeng1" id="comboSidangDosenPeng1" required>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtSidang1DosenPeng2" class="col-sm-4 control-label">Dosen Penguji 2</label>
                                                        <div class="col-sm-8"> 
                                                            <select  style="width: 100%" placeholder="Dosen Penguji 2" name="comboSidangDosenPeng2" id="comboSidangDosenPeng2" required>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtSidang1Tanggal" class="col-sm-4 control-label">Tanggal</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="date" class="form-control" id="txtSidang1Tanggal" name="txtSidang1Tanggal" >
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtSidang1Jam" class="col-sm-4 control-label">Jam</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="time" class="form-control" id="txtSidang1Jam" name="txtSidang1Jam" placeholder="Jam Mulai">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtSidang1Ruangan" class="col-sm-4 control-label">Ruangan</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="txtSidang1Ruangan" name="txtSidang1Ruangan" placeholder="Ruangan">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>

                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtSidang1Catatan" class="col-sm-4 control-label">Catatan untuk Sidang</label>
                                                        <div class="col-sm-8"> 
                                                            <textarea style="width: 100%"  name="txtSidang1Catatan" id="txtSidang1Catatan" cols="30" rows="5"  required></textarea>
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                        <button type="submit" id="btnSaveSidang1" name="btnSaveSidang1" class="btn btn-primary"><label id="update">Simpan</label> Sidang</button>
                                                    </div>
                                            </form> 
                                        </div><!-- /.modal-content -->
                                    </div><!-- /.modal-dialog -->
                                </div><!-- /.modal -->
                                <!-- /add modal -->

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
    <script src="../js/assign_sidang.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            var table = $('#assign_sidangTable').DataTable({
                columns: [
                    {
                        data: 'null',
                        render: function (data, type, row) {
                            return '<button class="btn btn-info" onClick="lihatDetailSidang(\'' + row.id_topik + '\')"><span class="glyphicon glyphicon-info-sign"></span > Detail</button>'
                        }
                    },
                    {data: 'mahasiswa.nrp'},
                    {data: 'mahasiswa.name'},
                    {data: 'judul_topik'},
                    {
                        data: 'null',
                        render: function (data, type, row) {
//                            if(substr(row.sidang1.id,-4) == 'sdg1'){
//                                return '<button id="btn_assignSidang1" class="btn btn-success btn-circle" style="background-color:red" onClick="assignSidang1(\'' + row.id_topik + '\',\'' + row.mahasiswa.nrp + '\')"><b>1</b></button>'
//                            } else {
                                return '<button id="btn_assignSidang1" class="btn btn-success btn-circle" onClick="assignSidang1(\'' + row.id_topik + '\',\'' + row.mahasiswa.nrp + '\',\'' + row.sidangId + '\')"><b>1</b></button>'
//                            }
                        }
                    },
                    {
                        data: 'null',
                        render: function (data, type, row) {
                            return '<button class="btn btn-success btn-circle" onClick="assignSidang2(\'' + row.id_topik + '\',\'' + row.mahasiswa.nrp + '\',\'' + row.sidangId + '\')"><b>2</b></button>'
                        }
                    },
                    {
                        data: 'null',
                        render: function (data, type, row) {
                            return '<button class="btn btn-success btn-circle" onClick="assignSidang3(\'' + row.id_topik + '\',\'' + row.nrp + '\',\'' + row.sidangId + '\')"><b>3</b></button>'
                        }
                    }
                ]
            });
        });                                                                     
    </script>

</body>
</html>
