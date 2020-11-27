<?php

$numrow = 1;
if (isset($_POST["submit_file"]) && $_FILES["file"]["tmp_name"] != null) {
    $file = $_FILES["file"]["tmp_name"];
    $file_open = fopen($file, "r");
    $data = array();
    while (($csv = fgetcsv($file_open, 1500, ",")) !== false) {
        if ($numrow > 2) {
            $object = (object) [
                        'nrp' => $csv[0],
                        'jenisSidang' => $csv[1],
                        'nilaiAkhir' => $csv[2]
            ];
//            var_dump($object);
            array_push($data, $object);
        }
        $numrow++;
    }
    echo json_encode($data);
}
header('location:../sidang_admin.php?data=' . json_encode($data));
?>