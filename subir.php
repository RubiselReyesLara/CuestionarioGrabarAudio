<?php

if(isset($_POST)){
    if(($id_usuario = $_POST['usuario'])=='usuario'){
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