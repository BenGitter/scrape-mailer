var request = require('request');
var cheerio = require('cheerio');

module.exports = function(done){
  var url = "https://www.packtpub.com/packt/offers/free-learning"; 

  request(url, function(err, res, html){
    if(!err){
      var $ = cheerio.load(html);

      var title = $(".dotd-title h2").html().trim();

      return done(title);
    }
  });
}