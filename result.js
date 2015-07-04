//v1.0.0

var casper = require('casper').create();

casper.start('http://results.vtu.ac.in/', function() {
    this.echo(this.getTitle());
});


casper.waitForSelector("form[name='new']", function() {
    this.echo("Loaded");
	this.fill('form[name="new"]', {
    rid: '4MH11ec075',
});
this.click('input[type="SUBMIT"][name="submit"]');
    
}, true);

casper.then(function(){
    // scrape something else
	
   this.waitFor(function check() {
    return (this.getCurrentUrl() === 'http://results.vtu.ac.in/vitavi.php');
},
function then() { // step to execute when check() is ok
    this.echo('Navigated to page 2', 'INFO');
	 casper.then(function() {
    // capture the entire page.
    casper.capture("page.png"); 
   
  });
},
function timeout() { // step to execute if check has failed
    this.echo('Failed to navigate to page 2', 'ERROR');
});
  })

casper.run();
