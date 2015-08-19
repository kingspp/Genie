<?php
	
// Production
	$clg = $_POST["clg"];
	$code = $_POST["code"];
	$year = $_POST["year"];
	$branch = $_POST["branch"];
	$num = $_POST["num"];
	$endUSN = $_POST["endUSN"];
	$genie = $_POST["JS"];
    $saveType = $_POST["saveType"];
    $testing = $_POST["testing"];

//Testing
/*
	$clg = "mh";
	$code = 4;
	$year = 11;
	$branch = "ec";
	$num = 1;
	$endUSN = 11;
	$genie = "genie.js";
    $saveType = ".pdf";
    $testing = "false";
*/	
	execInBackground("casperjs $genie $clg $code $year $branch $num $endUSN $saveType");
	echo "done";
	
	function execInBackground($cmd) { 
    if (substr(php_uname(), 0, 7) == "Windows"){ 
        if( $GLOBALS["testing"] == "false")
            pclose(popen("start /B ". $cmd, "r"));  
        else
            pclose(popen("start ". $cmd, "r")); 
    } 
    else { 
        exec($cmd . " > /dev/null &");   
    } 
} 
	
?>