<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="../images/Icon IT.png" type="image/x-icon"/>

        <link href="../dist/css/mystyle.css" rel="stylesheet">

        <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase-auth.js"></script>


        <script src="https://momentjs.com/downloads/moment.min.js"></script>
        <script src="https://momentjs.com/downloads/moment-with-locales.js"></script>

        <!-- TODO: Add SDKs for Firebase products that you want to use
             https://firebase.google.com/docs/web/setup#available-libraries -->

        <!-- Custom Theme JavaScript -->
        <script src="../dist/js/sb-admin-2.js"></script>
        <script src="../js/index.js"></script>
        <script src="../js/fireBase.js"></script>
        <title>Sistem Pengelolaan Tugas Akhir</title>

        <style type="text/css">
            th {
                text-align: center;
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
                        <h1 class="page-header">Dashboard Dosen</h1>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="form-group"> *pilih tahun ajaran terlebih dahulu 
                        <select class="form-control" id="filterTahun_Ajaran" name="filterTahun_Ajaran">
                            <option></option>
                        </select>
                    </div>

                    <h5> Sebagai Pembimbing 1 : <label id="jmlPemb1">-</label> sidang</h5>
                    <h5> Sebagai Pembimbing 2 : <label id="jmlPemb2">-</label> sidang </h5>
                    <h5> Sebagai Penguji 1 : <label id="jmlPeng1">-</label> sidang </h5>
                    <h5> Sebagai Penguji 2 : <label id="jmlPeng2">-</label> sidang </h5>
                    <br/>
                    <h5> Jumlah Mahasiswa Yang Belum Dinilai : <label id="jmlSudahPerwalian"></label> </h5>
                    <div class="col-lg-12">
                        <hr></hr>
                    </div>
                    <h4 style="color: red"><b> Daftar Sidang yang Belum Dinilai </b> </h4>
                    <table width="100%" class="table table-striped table-bordered table-hover" id="belumNilaiTable">
                        <thead>
                            <tr>
                                <th>NRP</th>
                                <th>Nama</th>
                                <th>Sidang</th>
                                <th>Batas</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>


                    <div class="col-lg-12">
                        <hr>
                    </div>



                </div>


            </div>
            <!-- /#wrapper -->

            <!-- jQuery -->
            <script src="../vendor/jquery/jquery.min.js"></script>

            <!-- Bootstrap Core JavaScript -->
            <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>

            <!-- Metis Menu Plugin JavaScript -->
            <script src="../vendor/metisMenu/metisMenu.min.js"></script>

            <!-- Morris Charts JavaScript -->
            <script src="../vendor/raphael/raphael.min.js"></script>
            <script src="../vendor/morrisjs/morris.min.js"></script>
            <script src="../data/morris-data.js"></script>

            <!-- DataTables JavaScript -->
            <script src="../vendor/datatables/js/jquery.dataTables.min.js"></script>
            <script src="../vendor/datatables-plugins/dataTables.bootstrap.min.js"></script>
            <script src="../vendor/datatables-responsive/dataTables.responsive.js"></script>

            <!-- Custom Theme JavaScript -->
            <script src="../dist/js/sb-admin-2.js"></script>
            <script src="../js/index_dosen.js"></script>
            <script src="../js/fireBase.js"></script>

            <script type="text/javascript">
                $(document).ready(function () {

                    var table = $('#belumNilaiTable').DataTable({
                        columns: [
                            {data: 'mahasiswa2.nrp'},
                            {data: 'mahasiswa2.name'},
                            {data: 'sidangName'},
                            {data: 'tanggal'}
                        ]
                    });

                });
            </script>


        </div>
    </div>


</body>

</html>
