var express = require("express");
var router = express.Router();
var db = require("./db");

router.get("/scrape", function(req, resp){
  
});

router.post("/mail", function(req, res){
  var mail = req.body.mail;

  db.findMail(mail, function(err, doc){
    if(err) res.json({msg: err});
    
    if(doc){
      res.json({msg: "Email already exists"});
    }else{
      db.addMail(mail, function(err, doc){
        if(err){
          res.sendStatus(500).json({"error": err});
        }
        console.log(doc);
        res.json({msg: "Email added"});
      });
    }
  });
});

router.delete("/mail/:mail", function(req, res){
  db.deleteMail(req.params.mail, function(msg){
    res.json({msg: msg});
  });
});

module.exports = router;