<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="../images/Lambang-Marnat.png" type="image/x-icon"/>

        <title>Sistem Pengelolaan Tugas Akhir</title>

        <!-- Bootstrap Core CSS -->
        <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <!-- MetisMenu CSS -->
        <link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet">

        <!-- DataTables CSS -->
        <link href="../vendor/datatables-plugins/dataTables.bootstrap.css" rel="stylesheet">

        <!-- DataTables Responsive CSS -->
        <link href="../vendor/datatables-responsive/dataTables.responsive.css" rel="stylesheet">

        <!-- Custom CSS -->
        <link href="../dist/css/sb-admin-2.css" rel="stylesheet">

        <!-- Custom Fonts -->
        <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">


        <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase-auth.js"></script>
    </head>

    <body>

        <div style="background-color:#f89728; width:100%;height:100px;border:1px; display: block;">
            <br/>
            <img src="../images/logo.png" hspace="15"/>
            <br/>
        </div>
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <a class="navbar-brand" href="../pages/index.php">Sistem Pengelolaan Tugas Akhir</a> 
            </div>
            <!-- /.navbar-header -->

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
        </nav>
        <div id="wrapper">
            <!-- Navigation -->
            <div class="container">
                <div class="row">
                    <div class=" col-lg-offset-3 col-lg-6">
                        <div class="panel panel-default">
                            <div class="panel-body">
<!--                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="row">
                                            <div class="col-sm-offset-3 col-sm-6 col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6">
                                                <img src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Sunglasses&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Tanned'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>-->
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="row">
                                            <div class="centered-text col-sm-offset-3 col-sm-6 col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6">
                                                <div itemscope="" itemtype="http://schema.org/Person">
                                                    <h2> <span id="nameProfile"></span></h2>
                                                    <p> <span id="nikProfile"></span></p>
                                                    <p> <span id="nameProfile"></span></p>
                                                    <p> <span id="jabatanProfile"></span></p>
                                                    <p itemprop="email"> <i class="fa fa-envelope"> </i> <span id="email"></span> </p>
                                                    <a class="btn" id="btnUbahPassword">                                                <span class="glyphicon glyphicon-wrench"></span> Ubah Password Melalui Email
                                                    </a> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /#page-wrapper -->

        </div>
        <!-- /#wrapper -->

        <!-- jQuery -->
        <script src="../vendor/jquery/jquery.min.js"></script>

        <!-- Bootstrap Core JavaScript -->
        <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>

        <!-- Metis Menu Plugin JavaScript -->
        <script src="../vendor/metisMenu/metisMenu.min.js"></script>

        <!-- Custom Theme JavaScript -->
        <script src="../dist/js/sb-admin-2.js"></script>
        <script src="../js/app_profile.js"></script>
        <script src="../js/fireBase.js"></script>


    </body>

</html>
