<?php

$clg = $_POST["clg"];
$code = $_POST["code"];
$year = $_POST["year"];
$branch = $_POST["branch"];

$dir=$clg.$code.$year.$branch;


$fi = new FilesystemIterator("sample/".$dir, FilesystemIterator::SKIP_DOTS);
echo iterator_count($fi);

?>