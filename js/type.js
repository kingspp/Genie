var college = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('college_name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,		
	prefetch: 'college.json'
			
});
college.initialize();
	
 $('.college').typeahead(
    null, {
		name: 'college',
        displayKey: 'college_name',
        source: college.ttAdapter()
    }).on([
                    'typeahead:initialized',
                    'typeahead:initialized:err',
                    'typeahead:selected',
                    'typeahead:autocompleted',
                    'typeahead:cursorchanged',
                    'typeahead:opened',
                    'typeahead:closed'
                ].join(' '), function(event, data){            
            $('.college').val(data.college_code); 		
        });
		
		
		
var region = new Bloodhound({
	datumTokenizer: Bloodhound.tokenizers.obj.whitespace('region_name'),
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	prefetch: 'region.json'
});
region.initialize();

$('.region').typeahead(
	null,{
		name: 'region',
		displayKey: 'region_name',
		source: region.ttAdapter()
	}).on ([
		'typeahead:initialized',
        'typeahead:initialized:err',
        'typeahead:selected',
        'typeahead:autocompleted',
        'typeahead:cursorchanged',
        'typeahead:opened',
        'typeahead:closed'	
	].join(' '), function(event,data){
		$('.region').val(data.region_code);
		
		});
            
