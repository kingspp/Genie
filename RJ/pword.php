<?php
require_once '../phpword/src/PhpWord/Autoloader.php';
include 'db/dbinfo.php';
\PhpOffice\PhpWord\Autoloader::register();
\PhpOffice\PhpWord\Settings::setPdfRendererPath('tcpdf');
\PhpOffice\PhpWord\Settings::setPdfRendererName('TCPDF');

$lineSpace = 1;



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


$styleTable = array('borderSize' => 6, 'borderColor' => '000000', 'cellMargin' => 80);
	$styleFirstRow = array('borderBottomSize' => 18, 'borderBottomColor' => '0000FF', 'bgColor' => 'FFFFFF');
	$styleCell = array('valign' => 'center');
	$styleCellBTLR = array('valign' => 'center', 'textDirection' => \PhpOffice\PhpWord\Style\Cell::TEXT_DIR_BTLR);
	$fontStyle = array('bold' => true, 'align' => 'center');
$phpWord->addTableStyle('Fancy Table', $styleTable, $styleFirstRow);	

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT Heading, Content FROM temp";
$result = $conn->query($sql);
$id=0;
if ($result->num_rows > 0) {   
    while($row = $result->fetch_assoc()) {
        $head[$id]=$row["Heading"];
		$content[$id]=$row['Content'];		
		$id++;
    }	
} else {
    //echo "";
}
$name=$head;
$read=$content;




//Title
$section = $phpWord->addSection();
$section->addText(htmlspecialchars($read[0]),'tFont', 'tStyle');
$section->addTextBreak($lineSpace);


// Two columns
$section = $phpWord->addSection(
    array(
        'colsNum'   => 2,		
        'breakType' => 'continuous',
    )
);
$section->addText(htmlspecialchars("Author 1"));
$section->addText(htmlspecialchars("Author 2"));



// Two columns
$section = $phpWord->addSection(
    array(
        'colsNum'   => 2,		
        'breakType' => 'continuous',
    )
);

//Abstract
$textrun = $section->createTextRun();
$textrun->addText("Abstract-",'aFonti');
$textrun->addText($read[1],'aFont');
$section->addTextBreak($lineSpace);

//Keywords
$textrun = $section->createTextRun();
$textrun->addText("Keywords-",'aFonti');
$textrun->addText($read[2],'aFont');
$section->addTextBreak($lineSpace);


for($x=3 ; $x < sizeof($name); $x++){		
	if (strpos($name[$x],'Table') !== false) {	
	$arr = explode(',', $read[$x]);
	$rows = $arr[0] ;
	$cols = $arr[1] ;	
	$id=2;	
	$section->addText(htmlspecialchars('Table'));
	$table = $section->addTable('Fancy Table');	
	for($r = 0; $r < $rows; $r++) { 		
		$table->addRow();		
		for($c = 0; $c < $cols; $c++) {		
			if ($r==0)
				$table->addCell(1750)->addText(htmlspecialchars($arr[$id++]), $fontStyle);
			else
				$table->addCell(1750)->addText(htmlspecialchars($arr[$id++]), null);
		}
	}
	$section->addTextBreak($lineSpace);	
	}
	else if (strpos($name[$x],'Image') !== false){
	$section->addImage($read[$x], array(null, null, 'align'=>'center'));
	$section->addTextBreak($lineSpace);
	
	}
	else{
	$section->addListItem($name[$x], 0, 'hFont', 'multilevel','tStyle');	
	$section->addText(htmlspecialchars($read[$x]),'nFont','nStyle');	
	$section->addTextBreak($lineSpace);
	}
}




// Saving the document as OOXML file...
$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
$objWriter->save('Report.docx');


/*
// Saving the document as HTML file...
$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'HTML');
$objWriter->save('Report.html');


//Load temp file
$phpWord = \PhpOffice\PhpWord\IOFactory::load('Report.docx'); 

$xmlWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord , 'PDF');
$xmlWriter->save('Report.pdf');  
*/
/*
for ($x = 0; $x < 3; $x++){		
	echo $read[$x].'<br><br>';
}
*/
header("Refresh: 1; url=http://localhost/download.html");

/* Note: we skip RTF, because it's not XML-based and requires a different example. */
/* Note: we skip PDF, because "HTML-to-PDF" approach is used to create PDF documents. */
?>