var version = "BETA v0.1.6"
$('#version').html(version);
var fileN = 10;

var casperJS = true;
var genie = "";

var $bgs = $('.toggleD');
	$('.toggleA').click(function () {
		$(this).toggleClass('active');
		$('.toggleA').not(this).removeClass('active');
		var $target = $($(this).data('target')).stop(true).slideToggle();
		$bgs.not($target).filter(':visible').stop(true, true).slideUp();
       
	   if ( $('#Ldr').is(':visible') ){
			$("#Ldr").toggle();
	   }
});



function listf(){	
	$.ajax({
            type:"POST",
			dataType: "json",
            url:"php/listFiles.php",			
            data:{clg: $('#region').val(), code: $('#college').val(), year: $('#year').val(), branch: $('#branch').val()},		
            success:function(data){
				alert(data.fileN);				
				var files = parseInt(data.fileN);
				$("#Ldr").percentageLoader({value: data.size, progress: files/fileN});		
				if(files != fileN){
					console.log((files/fileN)*100);
					setTimeout(function(){
						listf();
					}, 2000);
					}
				if(files>=fileN)
				zipContents();
            }
        });
	}
	
	
function zipContents(){
	 $.ajax({
			type:"POST",
			url: "php/zip.php", 
			data:{clg: $('#region').val(), code: $('#college').val(), year: $('#year').val(), branch: $('#branch').val()},
			success: function(result){			
			var zipFileName = $('#region').val() + $('#college').val() +$('#year').val() + $('#branch').val() ;
			window.location = 'http://localhost/php/download.php?Fname='+zipFileName;
			$('#Ldr').hide('slide', {direction: 'right'}, 500);				
			setTimeout(function(){
				$('#thankYou').show();
			},1000);
			setTimeout(function(){
				$('#thankYou').hide('slide', {direction: 'right'}, 500);
			},5000);
    }});
}
	
$("#vtuForm").submit(function(event) {
      /* stop form from submitting normally */
      event.preventDefault();
	   $('#Ldr').show('slide', {direction: 'left'}, 1000);
	   $("#Ldr").percentageLoader({value: '250kb', progress: 0.07});
	   $('#dVTU').toggle();
      /* get some values from elements on the page: */
      var $form = $( this ),
          url = $form.attr( 'action' );
      /* Send the data using post */
	  if(casperJS == true)
		genie="genie.js";
      var posting = $.post( url, { clg: $('#region').val(), code: $('#college').val(), year: $('#year').val(), branch: $('#branch').val(), num: $('#startU').val(), endUSN: $('#endU').val(), JS:genie  } );
      /* Alerts the results */
      posting.done(function( data ) {
		setTimeout(function(){
				listf();			
			},5000);
	    
      });
    });

	
$(document).ready(function (){
	$("#Ldr").percentageLoader({
    width : 256, height : 256, progress : 0.5, value : '512kb'});	
});    