// Require mongodb and set database to null
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var database = null;

exports.connect = function(url, done){
  if(database) return done();

  MongoClient.connect(url, function(err, db){
    if(err) return done(err);

    database = db;
    done();
  });
}

exports.findMail = function(mail, done){
  var mails = database.collection("mails");

  mails.findOne({
    mail: mail
  }, function(err, doc){
    if(err) return done(err);

    return done(null, doc);
  });
}

exports.getAll = function(done){
  var mails = database.collection("mails");

  mails.find({}).toArray(function(err, docs){
    if(err) return done(err);

    return done(null, docs);
  });
}

exports.addMail = function(mail, done){
  var mails = database.collection("mails");

  mails.insertOne({
    mail: mail
  }, function(err, doc){
    if(err) done(err);

    return done(null, doc);
  });
}

exports.deleteMail = function(mail, done){
  var mails = database.collection("mails");
  
  mails.deleteOne({
    mail: mail
  }, function(err, doc){
    if(err) return done("There was an error");

    return done("Succes");
  })
}