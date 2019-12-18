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
    </head>

    <body>

        <div id="wrapper">
            <!-- Navigation -->
            <?php include_once './header.php'; ?>

            <div id="page-wrapper">

                <div id="halaman_nilai">
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
                                    <button style="float: right" class=" btn btn-success" onclick="window.location = '../pages/nilai_admin_export.php';">

                                        <span class="glyphicon glyphicon-export"></span> Export Nilai ke File Excel, Pdf, Print

                                    </button>
                                    <h4>Pilih Tahun Ajaran</h4>
                                    <div class="form-group">
                                        <select class="form-control" id="filterTahun_Ajaran" name="filterTahun_Ajaran">
                                            <option></option>
                                        </select>
                                    </div>
                                    <table width="100%" class="table table-striped table-bordered table-hover" id="nilaiAkhirTable">
                                        <thead>
                                            <tr>
                                                <th>NRP</th>
                                                <th>Nama</th>
                                                <th>Sidang 1</th>
                                                <th>Sidang 2</th>
                                                <th>Sidang Akhir</th>
                                                <th>Nilai TA</th>
                                                <th>Nilai Mutu</th>
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


                <div id="halaman_detail_nilai">
                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header">Detail Nilai Sidang</h1>
                        </div>
                    </div>
                    <!-- /.row -->
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    Nilai Sidang
                                </div>

                                <br/>
                                <!-- Trigger the modal with a button -->
                                <div class="form-group" padding-top: 10px;">
                                     <button style="float: right" class=" btn btn-success" 
                                        onclick="tablesToExcel(
                                                        ['tblSidang1Detail', 'tblSidang2Detail', 'tblSidang3Detail', 'tblProdukDetail', 'tblProses1Detail', 'tblProses2Detail', 'tblProses3Detail'],
                                                        ['Sidang 1', 'Sidang 2', 'Sidang 3', 'Produk', 'Proses 1', 'Proses 2', 'Proses 3'],
                                                        'TestBook.xls', 'Excel'
                                                        )">
                                        <span class="glyphicon glyphicon-export"></span> Export Nilai Ke File Excel
                                    </button>
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
                                                <td>Dosen Pembimbing 1 &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiDosenPemb1"></label></td>
                                            </tr>
                                            <tr>
                                                <td>Dosen Pembimbing 2 &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiDosenPemb2"></label></td>
                                            </tr>
                                            <tr>
                                                <td>Dosen Penguji 1 &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiDosenPeng1"></label></td>
                                            </tr>
                                            <tr>
                                                <td>Dosen Penguji 2 &nbsp; &nbsp; </td>
                                                <td> : </td>
                                                <td> &nbsp; &nbsp; <label id="nilaiDosenPeng2"></label></td>
                                            </tr>
                                        </table>
                                        <br/>
                                    </div>
                                </div>
                                <!-- /.panel-heading -->
                                <div class="panel-body">
                                    <br/>
                                    <ul class="nav nav-tabs" style="font-size: 13px">
                                        <li id="nilai_sidang_1"><a href="#sidang_1_tab" data-toggle="tab">Sidang 1</a></li>
                                        <li id="nilai_sidang_2"><a href="#sidang_2_tab" data-toggle="tab">Sidang 2</a></li>
                                        <li id="nilai_sidang_3"><a href="#sidang_3_tab" data-toggle="tab">Sidang 3</a></li>   
                                        <li id="nilai_produk"><a href="#produk_tugas_akhir_tab">Produk Tugas Akhir</a></li>
                                        <li id="nilai_proses_1"><a href="#nilai_proses_sidang_1_tab" data-toggle="tab">Nilai Proses Sidang 1</a></li>
                                        <li id="nilai_proses_2"><a href="#nilai_proses_sidang_2_tab" data-toggle="tab">Nilai Proses Sidang 2</a></li>
                                        <li id="nilai_proses_3"><a href="#nilai_proses_sidang_3_tab" data-toggle="tab">Nilai Proses Sidang 3</a></li>
                                    </ul>
                                    <div class="tab-content">
                                        <div id="sidang_1_tab" class="tab-pane fade in active">
                                            <?php include_once './input_nilai_sidang1_detail.php'; ?>
                                        </div>
                                        <div id="sidang_2_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_sidang2_detail.php'; ?>
                                        </div>
                                        <div id="sidang_3_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_sidang3_detail.php'; ?>
                                        </div> 
                                        <div id="produk_tugas_akhir_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_produk_detail.php'; ?>
                                        </div>
                                        <div id="nilai_proses_sidang_1_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_proses_sidang1_detail.php'; ?>
                                        </div>
                                        <div id="nilai_proses_sidang_2_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_proses_sidang2_detail.php'; ?>
                                        </div>
                                        <div id="nilai_proses_sidang_3_tab" class="tab-pane fade">
                                            <?php include_once './input_nilai_proses_sidang3_detail.php'; ?>
                                        </div>
                                    </div>
                                    <script>
                                        $(document).ready(function () {
                                            $(".nav-tabs a").click(function () {
                                                $(this).tab('show');
                                            });
                                        });
                                    </script>
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
        </div>
        <!-- /#wrapper -->
        <script src="../js/fireBase.js"></script>
        <script src="../js/nilai_admin.js"></script>
        <script type='text/javascript'>
                                        var tablesToExcel = (function () {
                                            var uri = 'data:application/vnd.ms-excel;base64,'
                                                    , tmplWorkbookXML = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'
                                                    + '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>'
                                                    + '<Styles>'
                                                    + '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>'
                                                    + '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>'
                                                    + '</Styles>'
                                                    + '{worksheets}</Workbook>'
                                                    , tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>'
                                                    , tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}><Data ss:Type="{nameType}">{data}</Data></Cell>'
                                                    , base64 = function (s) {
                                                        return window.btoa(unescape(encodeURIComponent(s)))
                                                    }
                                            , format = function (s, c) {
                                                return s.replace(/{(\w+)}/g, function (m, p) {
                                                    return c[p];
                                                })
                                            }
                                            return function (tables, wsnames, wbname, appname) {
                                                var ctx = "";
                                                var workbookXML = "";
                                                var worksheetsXML = "";
                                                var rowsXML = "";
                                                for (var i = 0; i < tables.length; i++) {
                                                    if (!tables[i].nodeType)
                                                        tables[i] = document.getElementById(tables[i]);
                                                    for (var j = 0; j < tables[i].rows.length; j++) {
                                                        rowsXML += '<Row>'
                                                        for (var k = 0; k < tables[i].rows[j].cells.length; k++) {
                                                            var dataType = tables[i].rows[j].cells[k].getAttribute("data-type");
                                                            var dataStyle = tables[i].rows[j].cells[k].getAttribute("data-style");
                                                            var dataValue = tables[i].rows[j].cells[k].getAttribute("data-value");
                                                            dataValue = (dataValue) ? dataValue : tables[i].rows[j].cells[k].innerHTML;
                                                            var dataFormula = tables[i].rows[j].cells[k].getAttribute("data-formula");
                                                            dataFormula = (dataFormula) ? dataFormula : (appname == 'Calc' && dataType == 'DateTime') ? dataValue : null;
                                                            ctx = {attributeStyleID: (dataStyle == 'Currency' || dataStyle == 'Date') ? ' ss:StyleID="' + dataStyle + '"' : ''
                                                                , nameType: (dataType == 'Number' || dataType == 'DateTime' || dataType == 'Boolean' || dataType == 'Error') ? dataType : 'String'
                                                                , data: (dataFormula) ? '' : dataValue
                                                                , attributeFormula: (dataFormula) ? ' ss:Formula="' + dataFormula + '"' : ''
                                                            };
                                                            rowsXML += format(tmplCellXML, ctx);
                                                        }
                                                        rowsXML += '</Row>'
                                                    }
                                                    ctx = {rows: rowsXML, nameWS: wsnames[i] || 'Sheet' + i};
                                                    worksheetsXML += format(tmplWorksheetXML, ctx);
                                                    rowsXML = "";
                                                }
                                                ctx = {created: (new Date()).getTime(), worksheets: worksheetsXML};
                                                workbookXML = format(tmplWorkbookXML, ctx);
                                                console.log(workbookXML);
                                                var link = document.createElement("A");
                                                link.href = uri + base64(workbookXML);
                                                link.download = wbname || 'ExportNilai.xls';
                                                link.target = '_blank';
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }
                                        })();
                                        $(document).ready(function () {
                                            var table = $('#nilaiAkhirTable').DataTable({
                                                "sScrollX": "100%",
                                                "sScrollXInner": "100%",
                                                responsive: true,
                                                "bScrollCollapse": true,
                                                "fixedColumns": {
                                                    "leftColumns": 1
                                                },columns: [
                                                    {data: 'mahasiswa.nrp'},
                                                    {data: 'mahasiswa.name'},
                                                    {
                                                        data: 'null',
                                                        render: function (data, type, row) {
                                                            if (typeof row.nilaiSidang1 !== 'undefined') {
                                                                return row.nilaiSidang1;
                                                            } else {
                                                                return '<span class="noPerwalian"> - </span>';
                                                            }
                                                        }
                                                    },
                                                    {
                                                        data: 'null',
                                                        render: function (data, type, row) {
                                                            if (typeof row.nilaiSidang2 !== 'undefined') {
                                                                return row.nilaiSidang2;
                                                            } else {
                                                                return '<span class="noPerwalian"> - </span>';
                                                            }
                                                        }
                                                    },
                                                    {
                                                        data: 'null',
                                                        render: function (data, type, row) {
                                                            if (typeof row.nilaiSidang3 !== 'undefined') {
                                                                return row.nilaiSidang3;
                                                            } else {
                                                                return '<span class="noPerwalian"> - </span>';
                                                            }
                                                        }
                                                    },
                                                    {
                                                        data: 'null',
                                                        render: function (data, type, row) {
                                                            if (typeof row.nilaiTA !== 'undefined') {
                                                                return '<label><b>' + row.nilaiTA + '</b></label>';
                                                            } else {
                                                                return '<span class="noPerwalian"> - </span>';
                                                            }
                                                        }
                                                    },
                                                    {
                                                        data: 'null',
                                                        render: function (data, type, row) {
                                                            if (typeof row.nilaiMutu !== 'undefined') {
                                                                return '<label><b>' + row.nilaiMutu + '</b></label>';
                                                            } else {
                                                                return '<span class="noPerwalian"> - </span>';
                                                            }
                                                        }
                                                    },
                                                    {
                                                        data: 'null',
                                                        render: function (data, type, row) {
                                                            return '<button class="btn btn-info" onClick="lihatDetailNilai(\'' + row.id + '\',\'' + row.mahasiswa.nrp + '\')"><span class="glyphicon glyphicon-info-sign"></span > Detail</button>'
                                                        }
                                                    }
                                                ]
                                            });
                                        });
        </script>
    </body>
</html>