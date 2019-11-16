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

        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9">
        </script><script src="sweetalert2.all.min.js"></script>
        <script src="sweetalert2.min.js"></script>
        <link rel="stylesheet" href="sweetalert2.min.css">
    </head>

    <body>
        <div id="wrapper">
            <!-- Navigation -->
            <?php include_once './header.php'; ?>

            <div id="page-wrapper">

                <div id="halaman_nilai_dosen">
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

                                    <h4><b> Data Seluruh Nilai </b> </h4> 

                                    <h6><b> Sidang 1 </b> </h6>
                                    <table width="100%" class="table table-striped table-bordered table-hover" id="viewNilaiMahasiswa_sidang1">
                                        <thead>
                                            <tr>
                                                <th>NRP</th>
                                                <th>Nama</th>
                                                <th>Jenis Sidang</th>
                                                <th>Sebagai</th>
                                                <th>Nilai Sidang</th>
                                                <th>Nilai Proses</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>

                                    <h6><b> Sidang 2 </b> </h6>
                                    <table width="100%" class="table table-striped table-bordered table-hover" id="viewNilaiMahasiswa_sidang2">
                                        <thead>
                                            <tr>
                                                <th>NRP</th>
                                                <th>Nama</th>
                                                <th>Jenis Sidang</th>
                                                <th>Sebagai</th>
                                                <th>Nilai Sidang</th>
                                                <th>Nilai Proses</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>

                                    <h6><b> Sidang 3 dan Produk Tugas Akhir</b> </h6>
                                    <table width="100%" class="table table-striped table-bordered table-hover" id="viewNilaiMahasiswa_sidang3_produk">
                                        <thead>
                                            <tr>
                                                <th>NRP</th>
                                                <th>Nama</th>
                                                <th>Jenis Sidang</th>
                                                <th>Sebagai</th>
                                                <th>Nilai Sidang</th>
                                                <th>Nilai Proses</th>
                                                <th>Nilai Produk</th>
                                                <th>Action</th>
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
            <!-- add modal -->
            <div class="modal fade" tabindex="-1" role="dialog" id="lihatDetailNilaiModal"  data-keyboard="false" data-backdrop="static">
                <div class="modal-dialog" style="width: 50%" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title"><span class="glyphicon glyphicon-zoom-in"></span>  Lihat detail nilai</h4>
                        </div>

                        <form class="form-horizontal" method="POST" id="formPerwalian">

                            <div class="modal-body">
                                <div class="messages"></div>

                                <div class="form-group"> 
                                    <div class="col-sm-12" style="text-align: left;">
                                        <table style="line-height: 2em"> 
                                            <tr>
                                                <td>NRP &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiMahasiswaNrp"></label></td>
                                            </tr>
                                            <tr>
                                                <td>Name &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiMahasiswaName"></label></td>
                                            </tr>
                                            <tr>
                                                <td>Topik &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiJudulTopik"></label></td>
                                            </tr>
                                            <tr>
                                                <td>Jenis Sidang &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiSidangName"></label></td>
                                            </tr>
                                        </table>

                                        <br/>

                                        <!--SIDANG 1 pemb1,peng1,peng2-->
                                        <div class="col-sm-12" id="nilaiSidang1Pemb1">
                                            <h4>Nilai Sidang 1 Pembimbing 1</h4>

                                            <br/>
                                            <table class="table table-striped" id="tblSidang1Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Pemb 1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 1 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Pengumpulan data</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Kesesuaian rencana kerja dan lingkup pembahasan, serta usaha dan kedisiplinan untuk mencapai target pekerjaan.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1RP1_pemb1"></label>
                                                            <!--<input id="nilai1Sidang1_pemb1" type="text" class="form-control calculateSidang1" required=""/>-->
                                                        </td>

                                                    </tr>

                                                    <!--Sidang 1 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td><b>Pengumpulan data</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center"></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Inisiatif untuk mendapatkan segala bentuk informasi dan referensi yang menunjang.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1PD1_pemb1"></label>
                                                            <!--<input id="nilai2aSidang1_pemb1" type="text" class="form-control calculateSidang1"required=""/>-->
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Studi literatur, studi lapangan, studi kebutuhan ruang dan studi image.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1PD2_pemb1"></label>
                                                            <!--<input id="nilai2bSidang1_pemb1" type="text" class="form-control calculateSidang1" required=""/>-->
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 1 C-->
                                                    <tr>
                                                        <td><b>C</b></td>
                                                        <td>
                                                            <b>Analisa Masalah / Perancangan</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center"></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Inisiatif untuk mendapatkan segala bentuk informasi dan referensi yang menunjang.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Pemahaman bidang ilmu yang menjadi dasar topik pembahasan serta ide/gagasan perancangan.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Pemilihan objek perancangan dan pemilihan site (site & building analysis)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM3_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Konsep perancangan, meliputi konsep elemen (bentuk, pola, tekstur, warna, material, pencahayaan, penghawaan, keamanan, dll)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM4_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Penataan ruang, sirkulasi, zoning-blocking  yang sesuai dengan kebutuhan perancangannya + sketsa
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM5_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Sketsa ide(min.2)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM6_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 1 D-->
                                                    <tr>
                                                        <td><b>D</b></td>
                                                        <td>
                                                            <b>Presentasi</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Kreativitas penyampaian, kejelasan dan sistematika presentasi.Sikap dan kejelasan suara pada saat presentasi.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1PR1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Sikap dan kejelasan suara pada saat presentasi.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1PR2_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_sidang1_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-sm-12" id="nilaiSidang1Peng1">
                                            <h4>Nilai Sidang 1 Penguji 1</h4>

                                            <br/>
                                            <table class="table table-striped" id="tblSidang1Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Peng 1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 1 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Pengumpulan data</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Kesesuaian rencana kerja dan lingkup pengahasan, serta usaha dan kedisiplinan untuk mencapai target pekerjaan.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1RP1_peng1"></label>
                                                            <!--<input id="nilai1Sidang1_peng1" type="text" class="form-control calculateSidang1" required=""/>-->
                                                        </td>

                                                    </tr>

                                                    <!--Sidang 1 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td><b>Pengumpulan data</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center"></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Inisiatif untuk mendapatkan segala bentuk informasi dan referensi yang menunjang.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1PD1_peng1"></label>
                                                            <!--<input id="nilai2aSidang1_peng1" type="text" class="form-control calculateSidang1"required=""/>-->
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Studi literatur, studi lapangan, studi kebutuhan ruang dan studi image.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1PD2_peng1"></label>
                                                            <!--<input id="nilai2bSidang1_peng1" type="text" class="form-control calculateSidang1" required=""/>-->
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 1 C-->
                                                    <tr>
                                                        <td><b>C</b></td>
                                                        <td>
                                                            <b>Analisa Masalah / Perancangan</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center"></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Inisiatif untuk mendapatkan segala bentuk informasi dan referensi yang menunjang.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Pemahaman bidang ilmu yang menjadi dasar topik pengahasan serta ide/gagasan perancangan.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM2_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Pemilihan objek perancangan dan pemilihan site (site & building analysis)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM3_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Konsep perancangan, meliputi konsep elemen (bentuk, pola, tekstur, warna, material, pencahayaan, penghawaan, keamanan, dll)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM4_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Penataan ruang, sirkulasi, zoning-blocking  yang sesuai dengan kebutuhan perancangannya + sketsa
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM5_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Sketsa ide(min.2)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM6_peng1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 1 D-->
                                                    <tr>
                                                        <td><b>D</b></td>
                                                        <td>
                                                            <b>Presentasi</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Kreativitas penyampaian, kejelasan dan sistematika presentasi.Sikap dan kejelasan suara pada saat presentasi.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1PR1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Sikap dan kejelasan suara pada saat presentasi.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1PR2_peng1"></label>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_sidang1_peng1"></label>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-sm-12" id="nilaiSidang1Peng2">
                                            <h4>Nilai Sidang 1 Penguji 2</h4>

                                            <br/>
                                            <table class="table table-striped" id="tblSidang1Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Peng 1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 1 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Pengumpulan data</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Kesesuaian rencana kerja dan lingkup pengahasan, serta usaha dan kedisiplinan untuk mencapai target pekerjaan.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1RP1_peng2"></label>
                                                            <!--<input id="nilai1Sidang1_peng2" type="text" class="form-control calculateSidang1" required=""/>-->
                                                        </td>

                                                    </tr>

                                                    <!--Sidang 1 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td><b>Pengumpulan data</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center"></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Inisiatif untuk mendapatkan segala bentuk informasi dan referensi yang menunjang.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1PD1_peng2"></label>
                                                            <!--<input id="nilai2aSidang1_peng2" type="text" class="form-control calculateSidang1"required=""/>-->
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Studi literatur, studi lapangan, studi kebutuhan ruang dan studi image.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1PD2_peng2"></label>
                                                            <!--<input id="nilai2bSidang1_peng2" type="text" class="form-control calculateSidang1" required=""/>-->
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 1 C-->
                                                    <tr>
                                                        <td><b>C</b></td>
                                                        <td>
                                                            <b>Analisa Masalah / Perancangan</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center"></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Inisiatif untuk mendapatkan segala bentuk informasi dan referensi yang menunjang.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Pemahaman bidang ilmu yang menjadi dasar topik pengahasan serta ide/gagasan perancangan.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM2_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Pemilihan objek perancangan dan pemilihan site (site & building analysis)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM3_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Konsep perancangan, meliputi konsep elemen (bentuk, pola, tekstur, warna, material, pencahayaan, penghawaan, keamanan, dll)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM4_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Penataan ruang, sirkulasi, zoning-blocking  yang sesuai dengan kebutuhan perancangannya + sketsa
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM5_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Sketsa ide(min.2)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1AM6_peng2"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 1 D-->
                                                    <tr>
                                                        <td><b>D</b></td>
                                                        <td>
                                                            <b>Presentasi</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Kreativitas penyampaian, kejelasan dan sistematika presentasi.Sikap dan kejelasan suara pada saat presentasi.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1PR1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Sikap dan kejelasan suara pada saat presentasi.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD1PR2_peng2"></label>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_sidang1_peng2"></label>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>

                                        <!--PROSES 1 pemb1,pemb2-->
                                        <div class="col-sm-12" id="nilaiProses1Pemb1">
                                            <h4>Nilai Proses Sidang 1 Pembimbing 1</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblProses1Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="10">Pemb 1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Ketekunan mencari data lapangan dan user
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai1ProsesSidang1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            ketekunan mencari Literatur 
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai2ProsesSidang1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Pengetahuan tentang bidang ilmu dan objek desain
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai3ProsesSidang1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Identifikasi dan latar belakang masalah
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai4ProsesSidang1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Konsep perancangan & Sketsa ide
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai5ProsesSidang1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_proses_sidang1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-sm-12" id="nilaiProses1Pemb2">
                                            <h4>Nilai Proses Sidang 1 Pembimbing 2</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblProses1Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="10">Pemb 2</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Ketekunan mencari data lapangan dan user
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai1ProsesSidang1_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            ketekunan mencari Literatur 
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai2ProsesSidang1_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Pengetahuan tentang bidang ilmu dan objek desain
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai3ProsesSidang1_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Identifikasi dan latar belakang masalah
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai4ProsesSidang1_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Konsep perancangan & Sketsa ide
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai5ProsesSidang1_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_proses_sidang1_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!--SIDANG 2 pemb1,peng1,peng2-->
                                        <div class="col-sm-12" id="nilaiSidang2Pemb1">
                                            <h4>Nilai Sidang 2 Pembimbing 1</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblSidang2Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Pemb 1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 2 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Gambar Kerja (BW)</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Site Plan
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GK1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Denah General + Floor Pattern + Ruang
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GK2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Tampak Potongan General 1
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GK3_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan General 2
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GK4_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td><b>Gambar Presentasi (Color) </b></td>
                                                        <td>35%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Denah Khusus + Furniture + Floor Pattern
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Floor Pattern Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Ceiling Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP3_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan Khusus (minimal 4 tampak potongan)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP4_pemb1"></label>
                                                        </td>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Desain Elemen Interior (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP5_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>
                                                            Desain Furniture (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP6_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>
                                                            Perspektif Interior (minimal 5 perspektif)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP7_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>
                                                            Skema Material dan Warna
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP8_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 C-->
                                                    <tr>
                                                        <td><b>C</b></td>
                                                        <td><b>Laporan & Jurnal Tugas Akhir</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Kedalaman penulisan isi/materi pada Bab 1-5 (mencakup Analisa & Konsep)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2LJ1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Draft Buku Konsep
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2LJ2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Jurnal
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2LJ3_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 D-->
                                                    <tr>
                                                        <td><b>D</b></td>
                                                        <td>
                                                            <b>Penyajian Presentasi</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Sistematika dan kedalaman isi/materi presentasi
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PP1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Kejelasan dan kelengkapan slide presentasi serta kreatitifas penyampaian
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PP2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Sikap dan kejelasan suara saat presentasi
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PP3_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 E-->
                                                    <tr>
                                                        <td><b>E</b></td>
                                                        <td>
                                                            <b>Proses Desain</b>
                                                        </td>
                                                        <td>40%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Gubahan ruang (design statement)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Problem solving (kesinambungan masalah, konsep dan desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Pemahaman Konstruksi
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD3_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Pemahaman Ergonomi Ruang
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD4_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Pemahaman Utilitas dan Fisika Bangunan
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD5_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>
                                                            Desain Tata Cahaya
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD6_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>
                                                            Pemahaman (pemilihan) Material dan Warna
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD7_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_sidang2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-sm-12" id="nilaiSidang2Peng1">
                                            <h4>Nilai Sidang 2 Penguji 1</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblSidang2Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Peng 1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 2 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Gambar Kerja (BW)</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Site Plan
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GK1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Denah General + Floor Pattern + Ruang
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GK2_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Tampak Potongan General 1
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GK3_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan General 2
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GK4_peng1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td><b>Gambar Presentasi (Color) </b></td>
                                                        <td>35%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Denah Khusus + Furniture + Floor Pattern
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Floor Pattern Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP2_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Ceiling Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP3_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan Khusus (minimal 4 tampak potongan)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP4_peng1"></label>
                                                        </td>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Desain Elemen Interior (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP5_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>
                                                            Desain Furniture (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP6_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>
                                                            Perspektif Interior (minimal 5 perspektif)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP7_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>
                                                            Skema Material dan Warna
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP8_peng1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 C-->
                                                    <tr>
                                                        <td><b>C</b></td>
                                                        <td><b>Laporan & Jurnal Tugas Akhir</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Kedalaman penulisan isi/materi pada Bab 1-5 (mencakup Analisa & Konsep)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2LJ1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Draft Buku Konsep
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2LJ2_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Jurnal
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2LJ3_peng1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 D-->
                                                    <tr>
                                                        <td><b>D</b></td>
                                                        <td>
                                                            <b>Penyajian Presentasi</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Sistematika dan kedalaman isi/materi presentasi
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PP1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Kejelasan dan kelengkapan slide presentasi serta kreatitifas penyampaian
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PP2_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Sikap dan kejelasan suara saat presentasi
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PP3_peng1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 E-->
                                                    <tr>
                                                        <td><b>E</b></td>
                                                        <td>
                                                            <b>Proses Desain</b>
                                                        </td>
                                                        <td>40%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Gubahan ruang (design statement)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Problem solving (kesinambungan masalah, konsep dan desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD2_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Pemahaman Konstruksi
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD3_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Pemahaman Ergonomi Ruang
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD4_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Pemahaman Utilitas dan Fisika Bangunan
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD5_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>
                                                            Desain Tata Cahaya
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD6_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>
                                                            Pemahaman (pemilihan) Material dan Warna
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD7_peng1"></label>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_sidang2_peng1"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-sm-12" id="nilaiSidang2Peng2">
                                            <h4>Nilai Sidang 2 Penguji 2</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblSidang2Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Peng 2</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 2 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Gambar Kerja (BW)</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Site Plan
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GK1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Denah General + Floor Pattern + Ruang
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GK2_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Tampak Potongan General 1
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GK3_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan General 2
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GK4_peng2"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td><b>Gambar Presentasi (Color) </b></td>
                                                        <td>35%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Denah Khusus + Furniture + Floor Pattern
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Floor Pattern Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP2_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Ceiling Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP3_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan Khusus (minimal 4 tampak potongan)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP4_peng2"></label>
                                                        </td>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Desain Elemen Interior (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP5_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>
                                                            Desain Furniture (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP6_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>
                                                            Perspektif Interior (minimal 5 perspektif)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP7_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>
                                                            Skema Material dan Warna
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2GP8_peng2"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 C-->
                                                    <tr>
                                                        <td><b>C</b></td>
                                                        <td><b>Laporan & Jurnal Tugas Akhir</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Kedalaman penulisan isi/materi pada Bab 1-5 (mencakup Analisa & Konsep)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2LJ1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Draft Buku Konsep
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2LJ2_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Jurnal
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2LJ3_peng2"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 D-->
                                                    <tr>
                                                        <td><b>D</b></td>
                                                        <td>
                                                            <b>Penyajian Presentasi</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Sistematika dan kedalaman isi/materi presentasi
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PP1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Kejelasan dan kelengkapan slide presentasi serta kreatitifas penyampaian
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PP2_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Sikap dan kejelasan suara saat presentasi
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PP3_peng2"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 E-->
                                                    <tr>
                                                        <td><b>E</b></td>
                                                        <td>
                                                            <b>Proses Desain</b>
                                                        </td>
                                                        <td>40%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Gubahan ruang (design statement)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Problem solving (kesinambungan masalah, konsep dan desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD2_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Pemahaman Konstruksi
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD3_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Pemahaman Ergonomi Ruang
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD4_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Pemahaman Utilitas dan Fisika Bangunan
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD5_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>
                                                            Desain Tata Cahaya
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD6_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>
                                                            Pemahaman (pemilihan) Material dan Warna
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD2PD7_peng2"></label>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_sidang2_peng2"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!--PROSES 2 pemb1,pemb2-->
                                        <div class="col-sm-12" id="nilaiProses2Pemb1">
                                            <h4>Nilai Proses Sidang 2 Pembimbing 1</h4>

                                            <br/>
                                            <table class="table table-striped" id="tblProses2Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="10">Pemb 1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Literatur penunjang tambahan yang relevan
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai1ProsesSidang2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Pengembangan konsep dan aplikasi
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai2ProsesSidang2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Kreatifitas desain, Gubahan ruang
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai3ProsesSidang2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Problem Solving
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai4ProsesSidang2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Pengetahuan teknis utilitas, konstruksi, ergonomi
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai5ProsesSidang2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>
                                                            Relevansi Konsep dengan Desain
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai6ProsesSidang2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>
                                                            Penyusunan, penulisan laporan & jurnal
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai7ProsesSidang2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>
                                                            Ketekunan dan kemandirian
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai8ProsesSidang2_pemb1"></label>
                                                        </td>
                                                    </tr>


                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_proses_sidang2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-sm-12" id="nilaiProses2Pemb2">
                                            <h4>Nilai Proses Sidang 2 Pembimbing 2</h4>
                                            <br/>
                                            <table class="table table-striped" id="tblProses2Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="10">Pemb 2</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Literatur penunjang tambahan yang relevan
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai1ProsesSidang2_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Pengembangan konsep dan aplikasi
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai2ProsesSidang2_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Kreatifitas desain, Gubahan ruang
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai3ProsesSidang2_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Problem Solving
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai4ProsesSidang2_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Pengetahuan teknis utilitas, konstruksi, ergonomi
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai5ProsesSidang2_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>
                                                            Relevansi Konsep dengan Desain
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai6ProsesSidang2_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>
                                                            Penyusunan, penulisan laporan & jurnal
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai7ProsesSidang2_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>
                                                            Ketekunan dan kemandirian
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai8ProsesSidang2_pemb2"></label>
                                                        </td>
                                                    </tr>


                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_proses_sidang2_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!--SIDANG 3 pemb1,peng1,peng2-->
                                        <div class="col-sm-12" id="nilaiSidang3Pemb1">
                                            <h4>Nilai Sidang 3 Pembimbing 1</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblSidang3Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Pemb 1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 3 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Menilai kemampuan mahasiswa dalam membuat Project materi Tugas Akhir, menyusun secara sistematis dan mempresentasikannya.</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Kreativitas penyampaian, Kejelasan dan sistematika presentasi.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MP1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Sikap dan kejelasan suara pada saat presentasi.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MP2_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td>
                                                            <b>Menilai kemampuan mahasiswa dalam memberikan jawab dan argumentasi yang logis atas pertanyaan-pertanyaan yang diujikan meliputi materi Tugas Akhirnya serta pengetahuan umum yang bersifat mendasar sesuai bidang studinya.</b></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Pengembangan ide/gagasan dan korelasi konsep dengan desainnnya.
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Gubahan ruang (elemen desain dan elemen interior).
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Kemampuan pemahaman ergonomi, konstruksi, utilitas, fisika bangunan dan tata cahaya.
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ3_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Maket dan kelengkapan serta komunikatif  gambar keseluruhan.
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ4_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Kemampuan mendeskripsikan desain perancangan pada pembahasan laporan TA (dengan teknik penulisan yang baik).
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ5_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_sidang3_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-sm-12" id="nilaiSidang3Peng1">
                                            <h4>Nilai Sidang 3 Penguji 1</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblSidang3Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Peng 1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 3 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Menilai kemampuan mahasiswa dalam membuat Project materi Tugas Akhir, menyusun secara sistematis dan mempresentasikannya.</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Kreativitas penyampaian, Kejelasan dan sistematika presentasi.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MP1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Sikap dan kejelasan suara pada saat presentasi.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MP2_peng1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td>
                                                            <b>Menilai kemampuan mahasiswa dalam memberikan jawab dan argumentasi yang logis atas pertanyaan-pertanyaan yang diujikan meliputi materi Tugas Akhirnya serta pengetahuan umum yang bersifat mendasar sesuai bidang studinya.</b></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Pengembangan ide/gagasan dan korelasi konsep dengan desainnnya.
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Gubahan ruang (elemen desain dan elemen interior).
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ2_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Kemampuan pemahaman ergonomi, konstruksi, utilitas, fisika bangunan dan tata cahaya.
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ3_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Maket dan kelengkapan serta komunikatif  gambar keseluruhan.
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ4_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Kemampuan mendeskripsikan desain perancangan pada pembahasan laporan TA (dengan teknik penulisan yang baik).
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ5_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_sidang3_peng1"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-sm-12" id="nilaiSidang3Peng2">
                                            <h4>Nilai Sidang 3 Penguji 2</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblSidang3Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Peng 2</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 3 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Menilai kemampuan mahasiswa dalam membuat Project materi Tugas Akhir, menyusun secara sistematis dan mempresentasikannya.</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Kreativitas penyampaian, Kejelasan dan sistematika presentasi.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MP1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Sikap dan kejelasan suara pada saat presentasi.
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MP2_peng2"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td>
                                                            <b>Menilai kemampuan mahasiswa dalam memberikan jawab dan argumentasi yang logis atas pertanyaan-pertanyaan yang diujikan meliputi materi Tugas Akhirnya serta pengetahuan umum yang bersifat mendasar sesuai bidang studinya.</b></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Pengembangan ide/gagasan dan korelasi konsep dengan desainnnya.
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Gubahan ruang (elemen desain dan elemen interior).
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ2_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Kemampuan pemahaman ergonomi, konstruksi, utilitas, fisika bangunan dan tata cahaya.
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ3_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Maket dan kelengkapan serta komunikatif  gambar keseluruhan.
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ4_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Kemampuan mendeskripsikan desain perancangan pada pembahasan laporan TA (dengan teknik penulisan yang baik).
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td class="text-center">
                                                            <label id="nilai_SD3MJ5_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_sidang3_peng2"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!--PROSES 3 pemb1,pemb2-->
                                        <div class="col-sm-12" id="nilaiProses3Pemb1">
                                            <h4>Nilai Proses Sidang 3 Pembimbing 1</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblProses3Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="10">Pemb 1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Usaha revisi dan penyempurnaan proyek
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai1ProsesSidang3_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Penambahan produk, laporan & jurnal 
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai2ProsesSidang3_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Kemandirian penyelesaian tugas akhir
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai3ProsesSidang3_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_proses_sidang3_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-sm-12" id="nilaiProses3Pemb2"> 
                                            <h4>Nilai Proses Sidang 3 Pembimbing 2</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblProses3Detail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="10">Pemb 2</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Usaha revisi dan penyempurnaan proyek
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai1ProsesSidang3_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Penambahan produk, laporan & jurnal 
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai2ProsesSidang3_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Kemandirian penyelesaian tugas akhir
                                                        </td>
                                                        <td class="text-center">
                                                            <label id="nilai3ProsesSidang3_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_proses_sidang3_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!--PRODUK pemb1,pemb2,peng1,peng2-->
                                        <div class="col-sm-12" id="nilaiProdukPemb1">
                                            <h4>Nilai Produk Tugas Akhir Pembimbing 1</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblProdukDetail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Pemb 1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 2 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Gambar Kerja (BW)</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Site Plan
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Denah General + Floor Pattern + Ruang
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Tampak Potongan General 1
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK3_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan General 2
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK4_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td><b>Gambar Presentasi (Color) </b></td>
                                                        <td>50%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Denah Khusus + Furniture + Floor Pattern
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Floor Pattern Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Ceiling Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP3_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan Khusus (minimal 4 tampak potongan)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP4_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Desain Elemen Interior (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP5_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>
                                                            Desain Elemen Interior (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP6_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>
                                                            Perspektif Interior (minimal 5 perspektif)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP7_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>
                                                            Skema Material dan Warna
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP8_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 C-->
                                                    <tr>
                                                        <td><b>C</b></td>
                                                        <td><b>Laporan & Jurnal Tugas Akhir</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Laporan Bab 1 s/d 5  (10%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTALJ1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Jurnal (5%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTALJ2_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 D-->
                                                    <tr>
                                                        <td><b>D</b></td>
                                                        <td>
                                                            <b>Material Board, Maket, dan Display Pameran</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Material Board (5%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAMB1_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Maket (10%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAMB2_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Display Pameran (10%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAMB3_pemb1"></label>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_produk_pemb1"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-sm-12" id="nilaiProdukPemb2">
                                            <h4>Nilai Produk Tugas Akhir Pembimbing 2</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblProdukDetail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Pemb 2</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 2 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Gambar Kerja (BW)</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Site Plan
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK1_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Denah General + Floor Pattern + Ruang
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK2_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Tampak Potongan General 1
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK3_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan General 2
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK4_pemb2"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td><b>Gambar Presentasi (Color) </b></td>
                                                        <td>50%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Denah Khusus + Furniture + Floor Pattern
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP1_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Floor Pattern Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP2_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Ceiling Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP3_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan Khusus (minimal 4 tampak potongan)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP4_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Desain Elemen Interior (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP5_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>
                                                            Desain Elemen Interior (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP6_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>
                                                            Perspektif Interior (minimal 5 perspektif)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP7_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>
                                                            Skema Material dan Warna
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP8_pemb2"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 C-->
                                                    <tr>
                                                        <td><b>C</b></td>
                                                        <td><b>Laporan & Jurnal Tugas Akhir</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Laporan Bab 1 s/d 5  (10%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTALJ1_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Jurnal (5%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTALJ2_pemb2"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 D-->
                                                    <tr>
                                                        <td><b>D</b></td>
                                                        <td>
                                                            <b>Material Board, Maket, dan Display Pameran</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Material Board (5%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAMB1_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Maket (10%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAMB2_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Display Pameran (10%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAMB3_pemb2"></label>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_produk_pemb2"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-sm-12" id="nilaiProdukPeng1">
                                            <h4>Nilai Produk Tugas Akhir Penguji 1</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblProdukDetail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Peng 1</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 2 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Gambar Kerja (BW)</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Site Plan
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Denah General + Floor Pattern + Ruang
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK2_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Tampak Potongan General 1
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK3_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan General 2
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK4_peng1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td><b>Gambar Presentasi (Color) </b></td>
                                                        <td>50%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Denah Khusus + Furniture + Floor Pattern
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Floor Pattern Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP2_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Ceiling Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP3_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan Khusus (minimal 4 tampak potongan)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP4_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Desain Elemen Interior (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP5_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>
                                                            Desain Elemen Interior (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP6_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>
                                                            Perspektif Interior (minimal 5 perspektif)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP7_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>
                                                            Skema Material dan Warna
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP8_peng1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 C-->
                                                    <tr>
                                                        <td><b>C</b></td>
                                                        <td><b>Laporan & Jurnal Tugas Akhir</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Laporan Bab 1 s/d 5  (10%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTALJ1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Jurnal (5%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTALJ2_peng1"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 D-->
                                                    <tr>
                                                        <td><b>D</b></td>
                                                        <td>
                                                            <b>Material Board, Maket, dan Display Pameran</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Material Board (5%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAMB1_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Maket (10%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAMB2_peng1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Display Pameran (10%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAMB3_peng1"></label>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_produk_peng1"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-sm-12" id="nilaiProdukPeng2">
                                            <h4>Nilai Produk Tugas Akhir Penguji 2</h4>

                                            <br/>

                                            <table class="table table-striped" id="tblProdukDetail">
                                                <thead id="tblHead">
                                                    <tr>
                                                        <th width="5">No</th>
                                                        <th width="50">Indikator Pencapaian Tujuan</th>
                                                        <th width="5">Bobot</th>
                                                        <th width="10">Peng 2</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--Sidang 2 A-->
                                                    <tr>
                                                        <td><b>A</b></td>
                                                        <td><b>Gambar Kerja (BW)</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Site Plan
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Denah General + Floor Pattern + Ruang
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK2_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Tampak Potongan General 1
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK3_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan General 2
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGK4_peng2"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 B-->
                                                    <tr>
                                                        <td><b>B</b></td>
                                                        <td><b>Gambar Presentasi (Color) </b></td>
                                                        <td>50%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Denah Khusus + Furniture + Floor Pattern
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Floor Pattern Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP2_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Ceiling Denah Khusus
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP3_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>
                                                            Tampak Potongan Khusus (minimal 4 tampak potongan)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP4_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>
                                                            Desain Elemen Interior (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP5_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>
                                                            Desain Elemen Interior (minimal 6 desain)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP6_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>
                                                            Perspektif Interior (minimal 5 perspektif)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP7_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>
                                                            Skema Material dan Warna
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAGP8_peng2"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 C-->
                                                    <tr>
                                                        <td><b>C</b></td>
                                                        <td><b>Laporan & Jurnal Tugas Akhir</b></td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Laporan Bab 1 s/d 5  (10%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTALJ1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Jurnal (5%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTALJ2_peng2"></label>
                                                        </td>
                                                    </tr>

                                                    <!--Sidang 2 D-->
                                                    <tr>
                                                        <td><b>D</b></td>
                                                        <td>
                                                            <b>Material Board, Maket, dan Display Pameran</b>
                                                        </td>
                                                        <td class="text-center">10%</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            Material Board (5%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAMB1_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>
                                                            Maket (10%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAMB2_peng2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            Display Pameran (10%)
                                                        </td>
                                                        <td></td>
                                                        <td class="text-center">
                                                            <label id="nilai_PTAMB3_peng2"></label>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td></td>
                                                        <td colspan="2">
                                                            <b>  TOTAL NILAI</b> </td>
                                                        <td class="text-center">
                                                            <label id="nilai_produk_peng2"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>



                                <div class="modal-footer">

                                </div>
                        </form> 
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
            <!-- /add modal -->
        </div>
        <!-- /#wrapper -->

        <script src="../js/fireBase.js"></script>
        <script src="../js/nilai.js"></script>

        <script type='text/javascript'>
            $(document).ready(function () {
                var tableSidang1 = $('#viewNilaiMahasiswa_sidang1').DataTable({
                    columns: [
                        {data: 'mahasiswa.nrp'},
                        {data: 'mahasiswa.name'},
                        {data: 'sidangName'},
                        {data: 'sebagai'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.totalNilaiSidang !== 'undefined') {
                                    return row.totalNilaiSidang;

                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.totalNilaiProses !== 'undefined') {
                                    return row.totalNilaiProses;

                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                return '<button class="btn btn-info" onClick="lihatDetailNilai(\'' + row.id + '\',\'' + row.mahasiswa.nrp + '\',\'' + row.sidangName + '\')"><span class="glyphicon glyphicon-info-sign"></span > Detail </button>'
                            }
                        }
                    ]
                });

                var tableSidang2 = $('#viewNilaiMahasiswa_sidang2').DataTable({
                    columns: [
                        {data: 'mahasiswa.nrp'},
                        {data: 'mahasiswa.name'},
                        {data: 'sidangName'},
                        {data: 'sebagai'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.totalNilaiSidang !== 'undefined') {
                                    return row.totalNilaiSidang;

                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.totalNilaiProses !== 'undefined') {
                                    return row.totalNilaiProses;

                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                return '<button class="btn btn-info" onClick="lihatDetailNilai(\'' + row.id + '\',\'' + row.mahasiswa.nrp + '\',\'' + row.sidangName + '\')"><span class="glyphicon glyphicon-info-sign"></span > Detail </button>'
                            }
                        }
                    ]
                });
                var tableSidang3 = $('#viewNilaiMahasiswa_sidang3_produk').DataTable({
                    columns: [
                        {data: 'mahasiswa.nrp'},
                        {data: 'mahasiswa.name'},
                        {data: 'sidangName'},
                        {data: 'sebagai'},
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.totalNilaiSidang !== 'undefined') {
                                    return row.totalNilaiSidang;

                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.totalNilaiProses !== 'undefined') {
                                    return row.totalNilaiProses;

                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                if (typeof row.totalNilaiProduk !== 'undefined') {
                                    return row.totalNilaiProduk;
                                } else {
                                    return '<span class="noPerwalian"> - </span>';
                                }
                            }
                        },
                        {
                            data: 'null',
                            render: function (data, type, row) {
                                return '<button class="btn btn-info" onClick="lihatDetailNilai(\'' + row.id + '\',\'' + row.mahasiswa.nrp + '\',\'' + row.sidangName + '\')"><span class="glyphicon glyphicon-info-sign"></span > Detail </button>'
                            }
                        }
                    ]
                });
            });
        </script>
    </body>
</html>
