<!DOCTYPE html>
<html lang="en">
    <head>

        <link rel="stylesheet" href="../css/style.css">
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
            <?php include_once './header.php'; ?>

            <div id="page-wrapper">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Tahun Ajaran</h1>
                    </div>
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                Tahun Ajaran
                            </div>
                            <!-- Trigger the modal with a button -->
                            <div class="form-group" style="padding-left: 10px; padding-top: 10px;">
                                <button type="button" data-toggle="modal" data-target="#tahun_AjaranModal" id="btn-newTahun_Ajaran" value="Simpan" class="btn btn-info">Tambah Tahun Ajaran</button>
                            </div>
                            <!-- /.panel-heading -->
                            <div class="panel-body">
                                <table width="100%" class="table table-striped table-bordered table-hover" id="tahun_AjaranTable">
                                    <thead>
                                        <tr>
                                            <!--<th>ID</th>-->
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th colspan="2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>


                                <!-- add modal -->
                                <div class="modal fade" tabindex="-1" role="dialog" id="tahun_AjaranModal">
                                    <div class="modal-dialog" style="width: 50%" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                <h4 class="modal-title">
                                                    <span class="glyphicon glyphicon-plus-sign"></span>  
                                                    <label id="tambah">Tambah</label> Tahun Ajaran
                                                </h4>
                                            </div>

                                            <form class="form-horizontal" method="POST" id="formTahun_Ajaran">

                                                <div class="modal-body">
                                                    <div class="messages"></div>

<!--                                                    <div class="form-group"> 
                                                        <label for="txtTahun_AjaranId" class="col-sm-4 control-label">Id</label>
                                                        <div class="col-sm-8">
                                                            <input type="text" class="form-control" id="txtTahun_AjaranId" name="txtTahun_AjaranId" placeholder="Id" readonly="">

                                                        </div>
                                                    </div>-->
                                                    <div class="form-group"> <!--/here teh addclass has-error will appear -->
                                                        <label for="txtTahun_AjaranName" class="col-sm-4 control-label">Name</label>
                                                        <div class="col-sm-8"> 
                                                            <input type="text" class="form-control" id="txtTahun_AjaranName" name="txtTahun_AjaranName" placeholder="Name">
                                                            <!-- here the text will apper -->
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="txtTahun_AjaranStatus" class="col-sm-4 control-label">Status</label>
                                                        <div class="col-sm-8">
                                                            <div class="col-sm-8">
                                                                <label>
                                                                    <input type="radio" id="radioStatusId" name="radioStatus" value="true"> Aktif
                                                                </label>&nbsp;
                                                                <label>
                                                                    <input type="radio" id="radioStatusId" name="radioStatus" value="false" checked> Tidak Aktif
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" id="btnSaveTahun_Ajaran" name="btnSaveTahun_Ajaran" class="btn btn-primary"><label id="update">Simpan</label> Tahun Ajaran</button>
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


       
        <!--<script src="../js/index.js"></script>-->
        <script src="../js/fireBase.js"></script>

        <script src="../js/tahun_ajaran.js"></script>
        <!-- Page-Level Demo Scripts - Tables - Use for reference -->

        <script>
            $(document).ready(function () {
                fetchTahunAjaranData(putTahunAjaranDataToTable, 'tahun_AjaranTable')

                var table = $('#tahun_AjaranTable').DataTable({
                    columns: [
                        {data: 'name'},
                        {data: 'status'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                return '<button type="button"  class="btn btn-warning" onClick="updateTahun_Ajaran(\'' + row.id + '\')">Update</button>'
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                return '<button type="button" class="btn btn-danger" id="btnDelete" onClick="deleteTahun_Ajaran(\'' + row.id + '\')">Delete</button>'
                            }
                        }
                    ]


                });
            });
        </script>

    </body>

</html>
