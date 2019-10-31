<?php

if (isset($_POST["submit_file"]) && $_FILES["file"]["tmp_name"]!= null) {
    $file = $_FILES["file"]["tmp_name"];
    $file_open = fopen($file, "r");
    $data = array();
    while (($csv = fgetcsv($file_open, 1000, ",")) !== false) {
        $object = (object)[
            'NIK' => $csv[0],
            'Nama' => $csv[1],
            'Email' => $csv[2],
            'IdJabatan' => $csv[3],
            'NamaJabatan' => $csv[4]
        ];
        var_dump($object);
        array_push($data, $object);
    }
        echo json_encode($data);
}
header('location:../dosen.php?data=' . json_encode($data));
