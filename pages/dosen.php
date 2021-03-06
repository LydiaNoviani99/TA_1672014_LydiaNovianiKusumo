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
            div.dataTables_scrollBody thead th,
            div.dataTables_scrollBody thead td {
                line-height: 0;
                opacity:0.0;
                width: 0px;
                height:0px;
            }
        </style>

        <script src="https://smtpjs.com/v3/smtp.js"></script>
        <script>

            function sendEmail(emailTujuan) {
                Email.send({
                    Host: "smtp.gmail.com",
                    Username: "sis2019.admtainterior@gmail.com",
                    Password: "ukm12345*",
                    To: emailTujuan,
                    From: "sis2019.admtainterior@gmail.com",
                    Subject: "Reminder Sidang",
                    Body: "<html><h2>Reminder Sidang</h2><strong>Pada hari Senin 16 Desember pukul 13.00</strong><br></br><em>Sidang USTA : Lydia Noviani Kusumo</em><br></br>di Lab Adv 2</html>"
                }).then(
                        message => alert("Email berhasil terkirim")
                );
            }
        </script>
    </head>

    <body>

        <div id="wrapper">
            <!-- Navigation -->
            <?php include_once './header.php'; ?>

            <div id="page-wrapper">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Dosen</h1>
                    </div>
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                Dosen
                            </div>

                            <br/>
                            <!-- Trigger the modal with a button -->
                            <div class="form-group" padding-top: 10px;">

                                 <div class="col-sm-6" style="text-align: left;">
                                    <button type="button" data-toggle="modal" data-target="#dosenModal" id="btn-newDosen" value="Simpan" class="btn btn-info">Tambah Dosen</button>
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
                                                            <form method="post" action="import/import_dosen.php" enctype="multipart/form-data">
                                                                <fieldset>
                                                                    <div class="form-group">
                                                                        <a href="../template_import/form_input_dosen.csv" download>
                                                                            - Download Template Disini -
                                                                        </a>
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
                                    <br/>
                                </div>
                            </div>
                            <br/>
                            <!-- /.panel-heading -->
                            <div class="panel-body">
                                <table width="100%" class="table table-striped table-bordered table-hover" id="dosenTable">
                                    <thead>
                                        <tr>
                                            <th>NIK</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Jabatan</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>


                                <!-- add modal -->
                                <div class="modal fade" tabindex="-1" role="dialog" id="dosenModal">
                                    <div class="modal-dialog" style="width: 50%" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                <h4 class="modal-title">
                                                    <span class="glyphicon glyphicon-plus-sign"></span>  
                                                    <label id="tambah">Tambah</label> Dosen
                                                </h4>
                                            </div>

                                            <form class="form-horizontal" = method="POST" id="formDosen">

                                                <div class="modal-body">
                                                    <div class="messages"></div>

                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label class="col-sm-4 control-label">NIK</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="txtDosenNIK" name="txtDosenNIK" placeholder="NIK" >
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label class="col-sm-4 control-label">Nama Lengkap </label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="txtDosenNama" name="txtDosenNama" placeholder="Nama Lengkap ">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label class="col-sm-4 control-label">Email</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="email"  class="form-control" id="txtDosenEmail" name="txtDosenEmail" placeholder="Email">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label class="col-sm-4 control-label">Jabatan</label>
                                                        <div class="col-sm-8"> 
                                                            <select  style="width: 100%" placeholder="Jabatan" name="comboJabatan" id="comboJabatan" >
                                                                <option></option>
                                                            </select>
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" id="btnSaveDosen" name="btnSaveDosen" class="btn btn-info"><label id="update">Simpan</label> Dosen</button>
                                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
        <script src="../js/dosen.js"></script>
        <script src="../js/import/import_dosen.js"></script>

        <script type='text/javascript'>
                                $(document).ready(function () {
                                    fetchDosenData(putDosenDataToTable, 'dosenTable');

                                    var table = $('#dosenTable').DataTable({
                                        "sScrollX": "100%",
                                        "sScrollXInner": "100%",
                                        "bScrollCollapse": true,
                                        "fixedColumns": {
                                            "leftColumns": 1
                                        },
                                        responsive: true,
                                        columns: [
                                            {data: 'nik'},
                                            {data: 'name'},
                                            {data: 'email'},
                                            {data: 'nama_role'},
                                            {
                                                data: 'null',
                                                render: function (data, type, row) {
                                                    return '<button type="button"  class="btn btn-warning" onClick="updateDosen(\'' + row.nik + '\')">Update</button>'
                                                }
                                            }
                                        ]
                                    });
                                });
        </script>
    </body>
</html>
