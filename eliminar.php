<?php
$filepath = $_SERVER['DOCUMENT_ROOT'] . "/upload_responses/" . $_REQUEST["name"] . '.wav';

if (is_file($filepath))
{
  unlink($filepath);
}


?>