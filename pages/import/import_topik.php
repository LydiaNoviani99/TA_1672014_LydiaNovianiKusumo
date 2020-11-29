<?php

$numrow = 1;
if (isset($_POST["submit_file"]) && $_FILES["file"]["tmp_name"] != null) {
    $file = $_FILES["file"]["tmp_name"];
    $file_open = fopen($file, "r");
    $data = array();
    while (($csv = fgetcsv($file_open, 1000, ",")) !== false) {
        if ($numrow > 2) {
            $object = (object) [
                        'nrp' => $csv[0],
                        'nama' => "-",
                        'judul_topik' => $csv[1],
                        'nik_dosenPemb1' => $csv[2],
                        'nama_dosenPemb1' => "-",
                        'nik_dosenPemb2' => $csv[3],
                        'nama_dosenPemb2' => "-"
            ];
            var_dump($object);
            array_push($data, $object);
        }
        $numrow++;
    }
    echo json_encode($data);
}
header('location:../topik.php?data=' . json_encode($data));