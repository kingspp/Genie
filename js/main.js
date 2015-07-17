var version = "BETA v0.0.5"
$('#version').html(version);

var $bgs = $('.toggleD');
	$('.toggleA').click(function () {
		$(this).toggleClass('active');
		var $target = $($(this).data('target')).stop(true).slideToggle();
		$bgs.not($target).filter(':visible').stop(true, true).slideUp();
        
});



 