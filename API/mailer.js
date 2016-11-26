var db = require("./db");
var mail = require("./mail");

module.exports = function(deal){
  var errors = [];
  db.getAll(function(err, docs){
    if(err) res.json({msg: err});

    docs.forEach(function(doc, i){
      mail(doc.mail, deal, function(err, info){
        if(err) errors.push(err);
      }); 
    });

    setTimeout(function(){
      console.log({errors: errors});
    }, 60000);
  });
}