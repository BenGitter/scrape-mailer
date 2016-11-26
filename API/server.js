var express = require('express');
require("dotenv").config();
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var db = require("./db");
var api = require("./api");
var timer = require("./timer");
var port = process.env.PORT || 8080;

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors());

app.get("/", function(req, res){
  res.json({msg: "Hi!"});
});

app.use("/api", api);
// Start MongoDB
db.connect(process.env.DB_URL, function(err){
  if(err){
    console.log("Unable to connect to MongoDB");
    process.exit(1);
  }else{
    // Start server
    app.listen(port, function(){
      console.log("App listening on port", port);
      timer();
    });
  }
});