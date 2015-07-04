//v1.1.0
var casper = require('casper').create();
var url = "http://results.vtu.ac.in/";
var pad = "000";
var clg = "4";
var code = "MH";
var year = "11";
var branch = "EC";
var num = 1;
var dir = "images/";
var ans = "001";
var startUSN = 1;
var endUSN = 120;
var USN = clg+code+year+branch;

casper.start(url, function() {
    this.echo(this.getTitle());
});



for(var i=startUSN ; i<=endUSN ; i++){	//this.echo(clg+code+year+branch+(num++));	
	casper.waitForSelector("form[name='new']", function() {			
			this.fill('form[name="new"]', {
			rid: USN+ans,
		});
		this.click('input[type="SUBMIT"][name="submit"]');
		
	}, true);

	casper.then(function(){
			// scrape something else			
		   this.waitFor(function check() {
			return (this.getCurrentUrl() === 'http://results.vtu.ac.in/vitavi.php');
		},
		function then() { // step to execute when check() is ok			
			 casper.then(function() {
			// capture the entire page.
			casper.capture(dir+USN+ans+".png");
			this.wait(1000,function(){});
			var str = (num++).toString();
			ans = pad.substring(0, pad.length - str.length) + str;
			casper.echo(USN+ans);
			casper.thenOpen(url);
		   
		  });
		},
		function timeout() { // step to execute if check has failed
			this.echo('Failed to load to page', 'ERROR');
		});
	})
	
}

casper.run();
