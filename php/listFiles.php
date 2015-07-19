<?php
	
//Testing	
//$dir= "sample/4mh11me";

//Production
$clg = $_POST["clg"];
$code = $_POST["code"];
$year = $_POST["year"];
$branch = $_POST["branch"];
$dir= "sample/".$clg.$code.$year.$branch;



function dirSize($directory) {
    $size = 0;
    foreach(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory)) as $file){
        $size+=$file->getSize();
    }
    return round($size/1024)." kb";
} 




$fi = new FilesystemIterator($dir, FilesystemIterator::SKIP_DOTS);

$arr = array('fileN' => iterator_count($fi), 'size' => dirSize($dir));
echo json_encode($arr);

?>