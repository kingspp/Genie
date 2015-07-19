//v1.2.2

var fs = require('fs');
var casper = require('casper').create();
var url = "http://results.vtu.ac.in/";
var pad = "000";

/*
//Test Unit
var clg = "4";
var code = "MH";
var year = "11";
var branch = "EC";
var num = 1;
var endUSN = 10;
//Adjust waitTime for your internet speed (in ms)
var waitTime = 10000;
*/

//Production Unit
var clg = casper.cli.get(0);
var code = casper.cli.get(1);
var year = casper.cli.get(2);
var branch = casper.cli.get(3);
var num = casper.cli.get(4);
var endUSN = casper.cli.get(5);
var waitTime = 10;



var dir = "sample/"+clg+code+year+branch+"/";
var str = num.toString();			
var ans = pad.substring(0, pad.length - str.length) + str;
var startUSN = num;
var USN = clg+code+year+branch;

//Rankings
var FCD = 0;
var FC=0;
var SC=0;
var F=0;

//Result file
var fileName = dir+"../Result.txt";
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
			 fs.write(fileName, res, 'w'); 
			}
			else if (casper.exists(x('//b[(contains(text(), "FIRST CLASS"))]'))){
			 res=(FCD)+"\n"+(++FC)+"\n"+SC+"\n"+F;
			 fs.write(fileName, res, 'w'); 
			}
			else if (casper.exists(x('//b[(contains(text(), "SECOND CLASS"))]'))){
			 res=(FCD)+"\n"+(FC)+"\n"+(++SC)+"\n"+F;
			 fs.write(fileName, res, 'w'); 
			}
			else if (casper.exists(x('//b[(contains(text(), "FAIL"))]'))){
			 res=(FCD)+"\n"+(FC)+"\n"+(SC)+"\n"+(++F);
			 fs.write(fileName, res, 'w'); 
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