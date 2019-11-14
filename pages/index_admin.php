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
                        <h1 class="page-header">Dashboard Admin</h1>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="form-group"> *pilih tahun ajaran terlebih dahulu 
                        <select class="form-control" id="filterTahun_Ajaran" name="filterTahun_Ajaran">
                            <option></option>
                        </select>
                    </div>

                    
                    <h4 style="color: red"><b> Daftar Seluruh Sidang yang Belum Dinilai </b> </h4>
                    <h5> Jumlah semua sidang belum dinilai : <label id="jmlBelumNilaiSemuaSidang"></label> </h5>
                    <br/><table width="100%" class="table table-striped table-bordered table-hover" id="belumNilaiSemuaTable">
                        <thead>
                            <tr>
                                <th>NRP</th>
                                <th>Nama</th>
                                <th>Sidang</th>
                                <th>Dosen</th>
                                <th>Sebagai</th>
                                <th>Batas</th>
                                <th  style="color: red">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    <hr style="width: 100%; border: 1px solid black;"/>
                    <br/>
                    <h4 style="color: red"><b> Daftar Sidang yang Belum Dinilai Berdasarkan Dosen Yang Dipilih </b> </h4>
                    <div class="form-group"> *pilih dosen terlebih dahulu 
                        <select  class="form-control" name="filterDosen" id="filterDosen" required>
                            <option></option>
                        </select>
                    </div>

<!--                    <table>
                        <tr>
                            <td style="width: 40%"><h5> Sebagai Pembimbing 1 &emsp;&nbsp;</h5></td>
                            <td style="width: 10%"> <h5> : </h5></td>
                            <td style="width: 50%"><h5> <label id="jmlPemb1">-</label> sidang</h5></td>
                        </tr>
                        <tr>
                            <td style="width: 40%"><h5> Sebagai Pembimbing 2 &emsp;&nbsp;</h5></td>
                            <td style="width: 10%"><h5> : </h5></td>
                            <td style="width: 50%"><h5> <label id="jmlPemb2">-</label> sidang</h5></td>
                        </tr>
                        <tr>
                            <td style="width: 40%"><h5> Sebagai Penguji 1 &emsp;&nbsp;</h5></td>
                            <td style="width: 10%"><h5> : </h5></td>
                            <td style="width: 50%"><h5> <label id="jmlPeng1">-</label> sidang</h5></td>
                        </tr>
                        <tr>
                            <td style="width: 40%"><h5> Sebagai Penguji 2 &emsp;&nbsp;</h5></td>
                            <td style="width: 10%"><h5> : </h5></td>
                            <td style="width: 50%"><h5> <label id="jmlPeng2">-</label> sidang</h5></td>
                        </tr>
                    </table>-->

                    <!--<br/>-->
                    <h5> Jumlah Mahasiswa Yang Belum Dinilai : <label id="jmlBelumNilai"></label> </h5>


                    <br/>
                    <table width="100%" class="table table-striped table-bordered table-hover" id="belumNilaiTable">
                        <thead>
                            <tr>
                                <th>NRP</th>
                                <th>Nama</th>
                                <th>Sidang</th>
                                <th>Dosen</th>
                                <th>Sebagai</th>
                                <th>Batas</th>
                                <th  style="color: red">Keterangan</th>
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


            <script src="../js/index_admin.js"></script>
            <script src="../js/fireBase.js"></script>
            <script type="text/javascript">
                $(document).ready(function () {
                    var table1 = $('#belumNilaiSemuaTable').DataTable({
                        columns: [
                            {data: 'mahasiswa.nrp'},
                            {data: 'mahasiswa.name'},
                            {data: 'sidangName'},
                            {data: 'dosen'},
                            {data: 'sebagai'},
                            {data: 'tanggal'},
                            {data: 'keterangan'}
                        ]
                    });

                });
            </script>
            <script type="text/javascript">
                $(document).ready(function () {
                    var table = $('#belumNilaiTable').DataTable({
                        columns: [
                            {data: 'mahasiswa.nrp'},
                            {data: 'mahasiswa.name'},
                            {data: 'sidangName'},
                            {data: 'dosen'},
                            {data: 'sebagai'},
                            {data: 'tanggal'},
                            {data: 'keterangan'}
                        ]
                    });

                });
            </script>


        </div>
    </div>


</body>

</html>
