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
        <script src="https://smtpjs.com/v3/smtp.js"></script>


        <style type="text/css">

            select {
                overflow-y: scroll;
            }
            div.dataTables_scrollBody thead {
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




                            <!-- /.panel-heading -->
                            <div class="panel-body">
                                <h4>Pilih Tahun Ajaran</h4>
                                <div class="form-group">
                                    <select class="form-control" id="filterTahun_Ajaran" name="filterTahun_Ajaran">
                                        <option></option>
                                    </select>
                                </div>
                                <br/>
                                <table width="100%" class="table table-striped table-bordered table-hover" id="assign_sidangTable">
                                    <thead>
                                        <tr>
                                            <th>Detail</th>
                                            <th>NRP</th>
                                            <th>Nama</th>
                                            <th>Topik</th>
                                            <th colspan="4">Sidang</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>

                                <hr style="width: 100%; border: 1px solid black;"/>

                                <table>
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="80%">
                                    <tr>
                                        <td colspan="3"><h5><b>Keterangan Tombol </b></h5> </td>
                                    </tr>
                                    <tr style="margin: 7%">
                                        <td><button id="btn_assignSidang1" class="btn btn-primary btn-circle"><b>1</b></button></td>
                                        <td> : </td>
                                        <td>Sidang Aktif / Dapat memasukkan data sidang / Dapat ditekan </td>
                                    </tr>
                                    <tr style="margin: 7%">
                                        <td><button class="btn btn-success btn-circle"><i class="fa fa-check"></i></button></td>
                                        <td> : </td>
                                        <td>Sidang Selesai / Sudah ada nilainya / Tidak dapat ditekan </td>
                                    </tr>
                                    <tr style="margin: 7%">
                                        <td><button id="btn_assignSidang2" class="btn btn-primary btn-circle" style="background-color:lightgrey"><b>1</b></button></td>
                                        <td> : </td>
                                        <td>Pengisian nilai disidang sebelumnya belum selesai / Ketika ditekan muncul peringatan</td>
                                    </tr>
                                </table>

                                <!-- detail modal -->
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


                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                        <button type="button" id="btnSaveSidang1" name="btnSaveSidang1" class="btn btn-primary"><label id="simpan">Simpan</label> Sidang</button>
                                                    </div>
                                            </form> 
                                        </div><!-- /.modal-content -->
                                    </div><!-- /.modal-dialog -->
                                </div><!-- /.modal -->
                                <!-- /add modal -->

                            </div>
                            <!-- /.panel-body -->

                            <!-- update modal -->
                            <div class="modal fade" tabindex="-1" role="dialog" id="updateSidang"  data-keyboard="false" data-backdrop="static">
                                <div class="modal-dialog" style="width: 50%" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title">
                                                <span class="glyphicon glyphicon-info-sign"></span> 
                                                Ubah Sidang</h4>
                                        </div>

                                        <form class="form-horizontal" method="POST" id="formUpdateSidang">

                                            <div class="modal-body">
                                                <div class="messages"></div>

                                                <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                    <label class="col-sm-4 control-label">NRP : </label>
                                                    <div class="col-sm-8"> 
                                                        <label id='lihatNrpUp'></label>
                                                        <!-- here the text will apper -->
                                                    </div>
                                                </div>
                                                <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                    <label class="col-sm-4 control-label">Nama : </label>
                                                    <div class="col-sm-8"> 
                                                        <b id='lihatNamaUp'></b>
                                                        <!-- here the text will apper -->
                                                    </div>
                                                </div>
                                                <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                    <label class="col-sm-4 control-label">Judul Topik : </label>
                                                    <div class="col-sm-8"> 
                                                        <b id='lihatJudulTopikUp'></b>
                                                        <!-- here the text will apper -->
                                                    </div>
                                                </div>
                                                <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                    <label class="col-sm-4 control-label">Dosen Pembimbing 1 : </label>
                                                    <div class="col-sm-8"> 
                                                        <b id='lihatDosenPembimbing1Up'></b>
                                                        <!-- here the text will apper -->
                                                    </div>
                                                </div>
                                                <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                    <label class="col-sm-4 control-label">Dosen Pembimbing 2 : </label>
                                                    <div class="col-sm-8"> 
                                                        <b id='lihatDosenPembimbing2Up'></b>
                                                        <!-- here the text will apper -->
                                                    </div>
                                                </div>

                                                <ul class="nav nav-tabs" style="font-size: 13px">
                                                    <li id="tab_updateSidang1" class="active"><a href="#updateSidang1">Sidang 1</a></li>
                                                    <li id="tab_updateSidang2"><a href="#updateSidang2">Sidang 2</a></li>
                                                    <li id="tab_updateSidang3"><a href="#updateSidang3">Sidang 3</a></li>
                                                    <li id="kosong"><a href="#kosong_tab"></a></li>

                                                </ul>

                                                <br/>
                                                <div class="tab-content">
                                                    <div id="updateSidang1" class="tab-pane fade in active">
                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang1DosenPeng1Up" class="col-sm-4 control-label">Dosen Penguji 1</label>
                                                            <div class="col-sm-8"> 
                                                                <select  style="width: 100%" placeholder="Dosen Penguji 1" name="comboSidang1DosenPeng1Up" id="comboSidang1DosenPeng1Up" required>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang1DosenPeng2Up" class="col-sm-4 control-label">Dosen Penguji 2</label>
                                                            <div class="col-sm-8"> 
                                                                <select  style="width: 100%" placeholder="Dosen Penguji 2" name="comboSidang1DosenPeng2Up" id="comboSidang1DosenPeng2Up" required>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang1TanggalUp" class="col-sm-4 control-label">Tanggal</label>
                                                            <div class="col-sm-8"> 
                                                                <input type="date" class="form-control" id="txtSidang1TanggalUp" name="txtSidang1TanggalUp" >
                                                                <!-- here the text will apper -->
                                                            </div>
                                                        </div>
                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang1JamUp" class="col-sm-4 control-label">Jam</label>
                                                            <div class="col-sm-8"> 
                                                                <input type="time" class="form-control" id="txtSidang1JamUp" name="txtSidang1JamUp" placeholder="Jam Mulai">
                                                                <!-- here the text will apper -->
                                                            </div>
                                                        </div>
                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang1RuanganUp" class="col-sm-4 control-label">Ruangan</label>
                                                            <div class="col-sm-8"> 
                                                                <input type="text" class="form-control" id="txtSidang1RuanganUp" name="txtSidang1RuanganUp" placeholder="Ruangan">
                                                                <!-- here the text will apper -->
                                                            </div>
                                                        </div>

                                                        <div class="modal-footer">
                                                            <button type="button" id="btnUpdateSidang1" name="btnUpdateSidang1" class="btn btn-primary"><label id="ubah">Ubah</label> Sidang 1</button>
                                                        </div>
                                                    </div>
                                                    <div id="updateSidang2" class="tab-pane">
                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang2DosenPeng1Up" class="col-sm-4 control-label">Dosen Penguji 1</label>
                                                            <div class="col-sm-8"> 
                                                                <select  style="width: 100%" placeholder="Dosen Penguji 1" name="comboSidang2DosenPeng1Up" id="comboSidang2DosenPeng1Up" required>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang2DosenPeng2Up" class="col-sm-4 control-label">Dosen Penguji 2</label>
                                                            <div class="col-sm-8"> 
                                                                <select  style="width: 100%" placeholder="Dosen Penguji 2" name="comboSidang2DosenPeng2Up" id="comboSidang2DosenPeng2Up" required>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang2TanggalUp" class="col-sm-4 control-label">Tanggal</label>
                                                            <div class="col-sm-8"> 
                                                                <input type="date" class="form-control" id="txtSidang2TanggalUp" name="txtSidang2TanggalUp" >
                                                                <!-- here the text will apper -->
                                                            </div>
                                                        </div>
                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang2JamUp" class="col-sm-4 control-label">Jam</label>
                                                            <div class="col-sm-8"> 
                                                                <input type="time" class="form-control" id="txtSidang2JamUp" name="txtSidang2JamUp" placeholder="Jam Mulai">
                                                                <!-- here the text will apper -->
                                                            </div>
                                                        </div>
                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang2RuanganUp" class="col-sm-4 control-label">Ruangan</label>
                                                            <div class="col-sm-8"> 
                                                                <input type="text" class="form-control" id="txtSidang2RuanganUp" name="txtSidang2RuanganUp" placeholder="Ruangan">
                                                                <!-- here the text will apper -->
                                                            </div>
                                                        </div>

                                                        <div class="modal-footer">
                                                            <button type="button" id="btnUpdateSidang2" name="btnUpdateSidang2" class="btn btn-primary"><label id="ubah">Ubah</label> Sidang 2</button>
                                                        </div>
                                                    </div>
                                                    <div id="updateSidang3" class="tab-pane">
                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang3DosenPeng1Up" class="col-sm-4 control-label">Dosen Penguji 1</label>
                                                            <div class="col-sm-8"> 
                                                                <select  style="width: 100%" placeholder="Dosen Penguji 1" name="comboSidang3DosenPeng1Up" id="comboSidang3DosenPeng1Up" required>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang3DosenPeng2Up" class="col-sm-4 control-label">Dosen Penguji 2</label>
                                                            <div class="col-sm-8"> 
                                                                <select  style="width: 100%" placeholder="Dosen Penguji 2" name="comboSidang3DosenPeng2Up" id="comboSidang3DosenPeng2Up" required>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang3TanggalUp" class="col-sm-4 control-label">Tanggal</label>
                                                            <div class="col-sm-8"> 
                                                                <input type="date" class="form-control" id="txtSidang3TanggalUp" name="txtSidang3TanggalUp" >
                                                                <!-- here the text will apper -->
                                                            </div>
                                                        </div>
                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang3JamUp" class="col-sm-4 control-label">Jam</label>
                                                            <div class="col-sm-8"> 
                                                                <input type="time" class="form-control" id="txtSidang3JamUp" name="txtSidang3JamUp" placeholder="Jam Mulai">
                                                                <!-- here the text will apper -->
                                                            </div>
                                                        </div>
                                                        <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                            <label for="txtSidang3RuanganUp" class="col-sm-4 control-label">Ruangan</label>
                                                            <div class="col-sm-8"> 
                                                                <input type="text" class="form-control" id="txtSidang3RuanganUp" name="txtSidang3RuanganUp" placeholder="Ruangan">
                                                                <!-- here the text will apper -->
                                                            </div>
                                                        </div>

                                                        <div class="modal-footer">
                                                            <button type="button" id="btnUpdateSidang3" name="btnUpdateSidang3" class="btn btn-primary"><label id="ubah">Ubah</label> Sidang 3</button>
                                                        </div>
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

                                            </div><!-- /.modal-content -->
                                        </form> 
                                    </div><!-- /.modal-dialog -->
                                </div><!-- /.modal -->
                            </div> <!-- /add modal -->

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
<script src="../js/assign_sidang.js"></script> <!-- jQuery -->

<script type="text/javascript">
                                                    $(document).ready(function () {
                                                        var table = $('#assign_sidangTable').DataTable({
                                                            "sScrollX": "100%",
                                                            "sScrollXInner": "100%",
                                                            "bScrollCollapse": true,
                                                            responsive: true,
                                                            "fixedColumns": {
                                                                "leftColumns": 1
                                                            },
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
                                                                        if (typeof row.nilaiMutu !== 'undefined') {
                                                                            return '<button class="btn btn-success btn-circle"><i class="fa fa-check"></i></button>'
                                                                        } else {
                                                                            if (typeof row.nilaiSidang1 !== "Belum Lengkap" && row.nilaiSidang1 !== "-") {
                                                                                return '<button class="btn btn-success btn-circle"><i class="fa fa-check"></i></button>'
                                                                            } else {
                                                                                return '<button id="btn_assignSidang1" class="btn btn-primary btn-circle" onClick="assignSidang1(\'' + row.id_topik + '\',\'' + row.mahasiswa.nrp + '\',\'' + row.sidangId + '\')"><b>1</b></button>'
                                                                            }
                                                                        }


                                                                    }
                                                                },
                                                                {
                                                                    data: 'null',
                                                                    render: function (data, type, row) {
                                                                        if (row.nilaiSidang1 == "Belum Lengkap" || row.nilaiSidang1 == "-" || isNaN(row.nilaiSidang1)) {
                                                                            return '<button id="btn_assignSidang2" class="btn btn-primary btn-circle" style="background-color:lightgrey"onClick="assignSidang2(\'' + row.id_topik + '\',\'' + row.mahasiswa.nrp + '\',\'' + row.sidangId + '\')"><b>2</b></button>'
                                                                        } else {
                                                                            if (typeof row.nilaiSidang2 !== "Belum Lengkap" && row.nilaiSidang2 !== "-") {
                                                                                return '<button class="btn btn-success btn-circle"><i class="fa fa-check"></i></button>'
                                                                            } else {
                                                                                return '<button id="btn_assignSidang2" class="btn btn-primary btn-circle" onClick="assignSidang2(\'' + row.id_topik + '\',\'' + row.mahasiswa.nrp + '\',\'' + row.sidangId + '\')"><b>2</b></button>'
                                                                            }

                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    data: 'null',
                                                                    render: function (data, type, row) {
                                                                        if (row.nilaiSidang2 == "Belum Lengkap" || row.nilaiSidang2 == "-" || isNaN(row.nilaiSidang1)) {
                                                                            return '<button id="btn_assignSidang3" class="btn btn-primary btn-circle" style="background-color:lightgrey"onClick="assignSidang3(\'' + row.id_topik + '\',\'' + row.mahasiswa.nrp + '\',\'' + row.sidangId + '\')"><b>3</b></button>'
                                                                        } else {
                                                                            if (typeof row.nilaiMutu !== 'undefined') {
                                                                                return '<button class="btn btn-success btn-circle"><i class="fa fa-check"></i></button>'
                                                                            } else {
                                                                                return '<button class="btn btn-primary btn-circle" onClick="assignSidang3(\'' + row.id_topik + '\',\'' + row.mahasiswa.nrp + '\',\'' + row.sidangId + '\')"><b>3</b></button>'
                                                                            }
                                                                            if (typeof row.nilaiSidang3 !== "Belum Lengkap" && row.nilaiSidang3 !== "-") {

                                                                                return '<button class="btn btn-success btn-circle"><i class="fa fa-check"></i></button>'
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    data: 'null',
                                                                    render: function (data, type, row) {
                                                                        return '<button class="btn btn-warning" id="btnUpdateSidang" onClick="updateAssignSidang(\'' + row.id_topik + '\')">Update</button>'
                                                                    }
                                                                }
                                                            ]
                                                        });
                                                        $('a.toggle-vis').on('click', function (e) {
                                                            e.preventDefault();

                                                            // Get the column API object
                                                            var column = table.column($(this).attr('data-column'));

                                                            // Toggle the visibility
                                                            column.visible(!column.visible());
                                                        });
                                                    });
</script>

</body>
</html>
