<?php
require_once 'phpword/src/PhpWord/Autoloader.php';
\PhpOffice\PhpWord\Autoloader::register();

$lineSpace = 1;
$id=0;
$handle = fopen("FCD.txt", "r");
if ($handle) {
    while (($line = fgets($handle)) !== false) {
        // process the line read.
		$read[$id++]=$line;
    }

    fclose($handle);
} else {
    // error opening the file.
} 

$total = $read[0]+$read[1]+$read[2]+$read[3];
$pp = ($total-$read[3]) / $total;
$pp = $pp*100;

	include "libchart/libchart/classes/libchart.php";

	$chart = new VerticalBarChart(700,500);

	$dataSet = new XYDataSet();
	$dataSet->addPoint(new Point("FCD", $read[0]));
	$dataSet->addPoint(new Point("First Class", $read[1]));
	$dataSet->addPoint(new Point("Second Class", $read[2]));
	$dataSet->addPoint(new Point("Fail", $read[3]));	
	$chart->setDataSet($dataSet);
	//$chart->setUpperBound	(	120) 	;
	

	$chart->setTitle("Maharaja institute of Technology, EC Branch, 8th Sem");
	$chart->render("generated/demo1.png");
	
	// Creating the new document...
$phpWord = new \PhpOffice\PhpWord\PhpWord();
$phpWord->addParagraphStyle('tStyle', array('align' => 'center', 'spaceAfter' => 100));
$phpWord->addParagraphStyle('nStyle', array('align' => 'justify'));
$phpWord->addFontStyle('tFont', array('name' => 'Times New Roman', 'bold' => true, 'italic' => true, 'size' => 24, 'allCaps' => true));
$phpWord->addFontStyle('hFont', array('name' => 'Times New Roman', 'bold' => false, 'italic' => false, 'size' => 10, 'allCaps' => true));
$phpWord->addFontStyle('aFont', array('name' => 'Times New Roman', 'bold' => true, 'italic' => false, 'size' => 9));
$phpWord->addFontStyle('aFonti', array('name' => 'Times New Roman', 'bold' => true, 'italic' => true, 'size' => 9));
$phpWord->addFontStyle('nFont', array('name' => 'Times New Roman', 'bold' => false, 'italic' => false, 'size' => 10));
$phpWord->addNumberingStyle(
    'multilevel',
    array('type' => 'multilevel', 'levels' => array(
        array('format' => 'upperRoman', 'text' => '%1.', 'left' => 360, 'hanging' => 360, 'tabPos' => 360),
        array('format' => 'upperLetter', 'text' => '%2.', 'left' => 720, 'hanging' => 360, 'tabPos' => 720),
        )
     )
);

//Title
$section = $phpWord->addSection();
$section->addText(htmlspecialchars("Maharaja Institute of Techonology"),'tFont', 'tStyle');
$section->addTextBreak($lineSpace);
/*
$section = $phpWord->addSection();
//Abstract
$section->addText("Branch:   E&CE",'aFonti');
$section->addText("Semester: VIII",'aFonti');
$section->addTextBreak($lineSpace);
*/

$section->addText(htmlspecialchars("Branch   : E&CE"),null, null);
$section->addText(htmlspecialchars("Semester : VIII"),null, null);
$section->addText(htmlspecialchars("Result   : {$pp} %"),null, null);
$section->addTextBreak($lineSpace);

$section->addListItem("FCD: {$read[0]} ", 0, 'hFont', 'multilevel',null);			
$section->addListItem("FC : {$read[1]} ", 0, 'hFont', 'multilevel',null);			
$section->addListItem("SC : {$read[2]} ", 0, 'hFont', 'multilevel',null);			
$section->addListItem("F  : {$read[3]} ", 0, 'hFont', 'multilevel',null);	
$section->addTextBreak($lineSpace);

$section->addImage("generated/demo1.png", array(null, null, 'align'=>'center'));
	$section->addTextBreak($lineSpace);

	
// Saving the document as OOXML file...
$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
$objWriter->save('Report.docx');
	
	
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Libchart vertical bars demonstration</title>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-15" />
</head>
<body>
	<img alt="Vertical bars chart" src="generated/demo1.png" style="border: 1px solid gray;"/>
</body>
</html>


