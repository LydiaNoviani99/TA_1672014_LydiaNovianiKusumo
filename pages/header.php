<head>
    <link rel="stylesheet" href="../dist/css/mystyle.css">
</head>

<style>

    .b {
        position: absolute;
        right: 0;
    } 

</style>


<link rel="icon" href="../images/Lambang-Marnat.png" type="image/x-icon"/>
<script type="text/javascript" src="../js/tahun_ajaran.js"></script>

<!--<img src="../images/Logo Maranatha.png" width="140" height="70" hspace="15"/> 
<img src="../images/garis.png" width="" height="50" /> 
<img src="../images/logo IT.png" width="180" height="40" hspace="15"/>-->
<p></p>
<div style="background-color:#f89728; width:100%;height:100px;border:1px; display: block;">
    <br/>
    <img src="../images/logo.png" hspace="15"/>
    <br/>
</div>

<p></p>

<!-- color background #f89728-->

<!--<p style="margin-left: 1.2%; opacity: 0.5; font-size: 12px"> Created by Lydia Noviani Kusumo (1672014) </p>-->


<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="../pages/index.php">Sistem Pengelolaan Tugas Akhir</a> 
    </div>
    <!-- /.navbar-header-->

    <ul class="nav navbar-top-links navbar-right">

        <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <i class="fa fa-user fa-fw"></i> <span id="profileNik"> </span> - <span id="profileName"> </span><i class="fa fa-caret-down"></i>
            </a>
            <ul class="dropdown-menu dropdown-user">
                <li><a href="profile.php"><i class="fa fa-user fa-fw"></i> User Profile</a>
                </li>
<!--                <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
                </li>-->
                <li class="divider"></li>
                <li onclick="mainApp.logOut()"><a href="login.php">  <i class="fa fa-sign-out fa-fw"></i> Logout</a>
                </li>
            </ul>
            <!-- /.dropdown-user -->
        </li>
        <!-- /.dropdown -->
    </ul>
    <!-- /.navbar-top-links -->

    <div class="navbar-default sidebar" role="navigation">
        <div class="sidebar-nav navbar-collapse left">
            <ul class="nav" id="side-menu">
                <li>
                    <a href="index.php" id="index"><i class="fa fa-dashboard fa-fw"></i> Welcome</a>
                </li>
                <li>
                    <a href="index_admin.php" id="page_dashboardAdmin" ><i class="fa fa-dashboard fa-fw"></i> Dashboard Program Studi</a>
                </li>
                <li>
                    <a href="index_dosen.php" id="page_dashboardDosen" ><i class="fa fa-dashboard fa-fw"></i> Dashboard Dosen</a>
                </li>

                <br/>
                <!-- Heading -->
                <div class="sidebar-heading">
                    Dosen
                </div>
                <li>
                    <a href="sidang.php" id="page_sidang"><i class="fa fa-check-circle-o  "></i> Sidang Dosen</a>
                </li>
                <li>
                    <a href="nilai.php" id="page_Nilai"><i class="fa fa-table "></i> Nilai</a>
                </li>
                
                <br/>
                <!-- Heading -->
                <div class="sidebar-heading">
                    Admin
                </div>
                <li>
                    <a href="topik.php" id="page_topik"><i class="fa fa-table "></i> Topik</a>
                </li>
                <li>
                    <a href="assign_sidang.php" id="page_assignSidang"><i class="fa fa-check-circle-o  "></i> Assign Sidang</a>
                </li>
                <li>
                    <a href="sidang_admin.php" id="page_sidangAdmin"><i class="fa fa-check-circle-o  "></i> Sidang Admin</a>
                </li>
                <li>
                    <a href="nilai_admin.php" id="page_sidangAdmin"><i class="fa fa-check-circle-o  "></i> Nilai Admin</a>
                </li>
                <li>
                    <a href="view_pembimbing_penguji_sidang.php" id="page_viewPembPeng"><i class="fa fa-table   "></i> View Pembimbing Penguji</a>
                </li>
                <li>
                    <a href="dosen.php" id="page_dosen"><i class="fa fa-table "></i> Dosen</a>
                </li>
                <li>
                    <a href="mahasiswa.php" id="page_mahasiswa"><i class="fa fa-table "></i> Mahasiswa</a>
                </li>
                <li>
                    <a href="tahun_ajaran.php" id="page_tahunAjaran" ><i class="fa fa-table "></i> Tahun Ajaran</a>
                </li>


            </ul>
        </div>
        <!-- /.sidebar-collapse -->
    </div>
</nav>




<script src="../js/fireBase.js"></script>
<script src="../js/index.js"></script>
<!--<script src="../js/app_profile.js"></script>-->



<!-- Bootstrap Core CSS -->
<link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

<!-- MetisMenu CSS -->
<link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet">

<!-- DataTables CSS -->
<link href="../vendor/datatables-plugins/dataTables.bootstrap.css" rel="stylesheet">
<link href="../vendor/datatables/css/select.dataTables.min.css" rel="stylesheet">
<link href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<link href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">
<link href="https://cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css">



<!-- DataTables Responsive CSS -->
<link href="../vendor/datatables-responsive/dataTables.responsive.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="../dist/css/sb-admin-2.css" rel="stylesheet">

<!-- Custom Fonts -->
<link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

        <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase-auth.js"></script>

<!-- jQuery -->
<script src="../vendor/jquery/jquery.min.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="../vendor/bootstrap/js/bootstrap.min.js"></script>

<!-- Metis Menu Plugin JavaScript -->
<script src="../vendor/metisMenu/metisMenu.min.js"></script>

<!-- DataTables JavaScript -->
<script src="../vendor/datatables/js/jquery.dataTables.min.js"></script>
<script src="../vendor/datatables-plugins/dataTables.bootstrap.min.js"></script>
<script src="../vendor/datatables-responsive/dataTables.responsive.js"></script>
<script src="../vendor/datatables/js/dataTables.select.min.js"></script>


<!-- Custom Theme JavaScript -->
<script src="../dist/js/sb-admin-2.js"></script>






