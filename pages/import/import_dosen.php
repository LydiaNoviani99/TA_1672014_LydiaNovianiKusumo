<?php

$numrow = 1;
if (isset($_POST["submit_file"]) && $_FILES["file"]["tmp_name"] != null) {
    $file = $_FILES["file"]["tmp_name"];
    $file_open = fopen($file, "r");
    $data = array();
    while (($csv = fgetcsv($file_open, 1000, ",")) !== false) {
        if ($numrow > 1) {
            $object = (object) [
                        'NIK' => $csv[0],
                        'Nama' => $csv[1],
                        'Email' => "-",
                        'IdJabatan' => "-",
                        'NamaJabatan' => "-"
            ];
            var_dump($object);
            array_push($data, $object);
        }
        $numrow++;
    }
    echo json_encode($data);
    // Close the file
    fclose($h);
}
header('location:../dosen.php?data=' . json_encode($data));
