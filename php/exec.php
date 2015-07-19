<?php
	
	$clg = $_POST["clg"];
	$code = $_POST["code"];
	$year = $_POST["year"];
	$branch = $_POST["branch"];
	$num = $_POST["num"];
	$endUSN = $_POST["endUSN"];
	$genie = $_POST["JS"];
	
	execInBackground("casperjs $genie $clg $code $year $branch $num $endUSN");
	echo "done";
	
	function execInBackground($cmd) { 
    if (substr(php_uname(), 0, 7) == "Windows"){ 
        pclose(popen("start /B ". $cmd, "r"));  
    } 
    else { 
        exec($cmd . " > /dev/null &");   
    } 
} 
	
?>