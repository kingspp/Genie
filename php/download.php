<?php
sleep(1);
 // https://perishablepress.com/press/2010/11/17/http-headers-file-downloads/
//http://localhost/php/download.php?Fname=4mh11ec
// set example variables
$filename =$_GET['Fname'].".zip";
// http headers for zip downloads
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Cache-Control: public");
header("Content-Description: File Transfer");
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"".$filename."\"");
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".filesize($filename));
ob_end_flush();
@readfile($filename);
?>