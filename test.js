//v1.1.1
var fs = require('fs');
var casper = require('casper').create();
var url = "http://results.vtu.ac.in/";
var pad = "000";
var clg = "4";
var code = "MH";
var year = "11";
var branch = "EC";
var num = 1;
var dir = "sample/"+branch+"/";
var str = num.toString();			
var ans = pad.substring(0, pad.length - str.length) + str;
var startUSN = num;
var endUSN = 120;
var USN = clg+code+year+branch;
//Adjust waitTime for your internet speed (in ms)
var waitTime = 10;

//Rankings
var FCD = 0;
var FC=0;
var SC=0;
var F=0;

var res="";

var as = document.querySelectorAll("tbody tr td");


casper.start(url, function() {
    this.echo(this.getTitle());
});



for(var i=startUSN ; i<=endUSN+1 ; i++){	
	casper.waitForSelector("form[name='new']", function() {			
			this.fill('form[name="new"]', {
			rid: USN+ans,
		});
		this.click('input[type="SUBMIT"][name="submit"]');
		
	}, true);

	casper.then(function(){
			// scrape something else			
		   this.waitFor(function check() {
		   	var x = require('casper').selectXPath;
		   if (casper.exists(x('//b[(contains(text(), "DISTINCTION"))]'))){
			 res=(++FCD)+"\n"+FC+"\n"+SC+"\n"+F;	
			 fs.write("FCD.txt", res, 'w'); 
			}
			else if (casper.exists(x('//b[(contains(text(), "FIRST CLASS"))]'))){
			 res=(FCD)+"\n"+(++FC)+"\n"+SC+"\n"+F;
			 fs.write("FCD.txt", res, 'w'); 
			}
			else if (casper.exists(x('//b[(contains(text(), "SECOND CLASS"))]'))){
			 res=(FCD)+"\n"+(FC)+"\n"+(++SC)+"\n"+F;
			 fs.write("FCD.txt", res, 'w'); 
			}
			else if (casper.exists(x('//b[(contains(text(), "FAIL"))]'))){
			 res=(FCD)+"\n"+(FC)+"\n"+(SC)+"\n"+(++F);
			 fs.write("FCD.txt", res, 'w'); 
			}
			return (this.getCurrentUrl() === 'http://results.vtu.ac.in/vitavi.php');
		},
		function then() { // step to execute when check() is ok			
			 casper.then(function() {		
			casper.capture(dir+USN+ans+".png");
			this.wait(waitTime,function(){});
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