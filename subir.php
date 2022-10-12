<?php

// Checar si el servidor tiene la carpeta de respuestas
$ruta = $_SERVER['DOCUMENT_ROOT'] . "/respuestasSubidas/";
if(!file_exists($ruta)){
    mkdir($_SERVER['DOCUMENT_ROOT'] . "/respuestasSubidas/");
}


if(isset($_POST)){

    // Si el usuario que viene el frontend es uno diferente al actual
    if(($id_usuario = $_POST['usuario'])=='default'){
        $fi = new FilesystemIterator($_SERVER['DOCUMENT_ROOT'] . "/respuestasSubidas/", 
                             FilesystemIterator::SKIP_DOTS);
        $id_usuario = iterator_count($fi);

        $nuevaRuta = $_SERVER['DOCUMENT_ROOT'] . "/respuestasSubidas/".$id_usuario;

        mkdir($nuevaRuta);

        $nombreTemporal = $_FILES['audio_data']['tmp_name'];
        $filename = $nuevaRuta .'/'. $_FILES['audio_data']['name']. '.wav';
        move_uploaded_file($nombreTemporal, $filename);
        
        echo $id_usuario; // Retorno al front end

    } else {
        $nuevaRuta = $_SERVER['DOCUMENT_ROOT'] . "/respuestasSubidas/".$id_usuario;
        $nombreTemporal = $_FILES['audio_data']['tmp_name'];
        $filename = $nuevaRuta .'/'. $_FILES['audio_data']['name']. '.mp3';
        move_uploaded_file($nombreTemporal, $filename);

        echo $id_usuario;
    }
}

?>