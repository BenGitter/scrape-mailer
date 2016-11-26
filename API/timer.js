var mail = require("./mail");
var mailer = require("./mailer");
var scrape = require("./scrape");

module.exports = function(){
  var hour = new Date().getUTCHours();
  var diff = (24 - hour) * 3600000 + 15*60000;  // wait at least till 1 am + 15min
  
  setTimeout(loop, diff);
}

function loop(){
  var hour = new Date().getUTCHours();
  var diff = (24 - hour) * 3600000 + 15*60000;

  scrape(function(title){
    mailer(title);
  })

  setTimeout(loop, diff);
}

