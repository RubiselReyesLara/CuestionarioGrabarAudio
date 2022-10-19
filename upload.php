<?php

if (isset($_POST['h'])){
    try {
        $madre = $_POST['h'];
        $myfile = fopen($_SERVER['DOCUMENT_ROOT'] . "/upload_responses/teimpala.wav","wb");
        fwrite($myfile, $madre);
        fclose($myfile);

        echo json_encode('good!');
    } catch(Exception $ex){
        echo json_decode('Error terrible, no se guardo, y no se podrá guardar nunca, lo siento...');
    }
}



?>