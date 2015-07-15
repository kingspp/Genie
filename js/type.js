var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "js/data.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
	
	//console.log(json);
    return json;
	
})(); 

    
var stocks = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('company_name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,		
	prefetch: 'js/data.json'
	//local:stocksData			
});
stocks.initialize();
/*
$('.typeahead').typeahead(
    null, {
		name: 'stocks',
        displayKey: 'company_name',
        source: stocks.ttAdapter()
    }).on('typeahead:selected', function(event, data){            
            $('.typeahead').val(data.code); 			
        });
*/		
 $('.typeahead').typeahead(
    null, {
		name: 'stocks',
        displayKey: 'company_name',
        source: stocks.ttAdapter()
    }).on([
                    'typeahead:initialized',
                    'typeahead:initialized:err',
                    'typeahead:selected',
                    'typeahead:autocompleted',
                    'typeahead:cursorchanged',
                    'typeahead:opened',
                    'typeahead:closed'
                ].join(' '), function(event, data){            
            $('.typeahead').val(data.code); 
			alert(data.code);
			$('.typeahead').val(data.code);
			alert($('.typeahead').val());
        });
            
