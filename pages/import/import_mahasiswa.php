<?php

if (isset($_POST["submit_file"]) && $_FILES["file"]["tmp_name"]!= null) {
    $file = $_FILES["file"]["tmp_name"];
    $file_open = fopen($file, "r");
    $data = array();
    while (($csv = fgetcsv($file_open, 1000, ",")) !== false) {
        $object = (object)[
            'nrp' => $csv[0],
            'name' => $csv[1]
        ];
        var_dump($object);
        array_push($data, $object);
    }
        echo json_encode($data);
}
header('location:../mahasiswa.php?data=' . json_encode($data));
