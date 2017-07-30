var express = require('express');
var router = express.Router();
var db= require('../dbconnect');
var MongoClient = require('mongodb').MongoClient
var URL = 'mongodb://localhost:27017/cdr'
var msisdn="01711085812";
var mnDB=require('../mongoConnect');


function loadFromMySql(){
    var stmt="SELECT * FROM history where msisdn=?";
    db.query(stmt,msisdn, function(err, res){
        if(err)
            throw err;
        else 
            console.log(JSON.stringify(res));


    });


}



mnDB.connect(URL, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
      var collection = mnDB.get().collection('cdrHistory');
      collection.find().toArray(function(err,docs){
          console.log(docs[0]);
          return
      })
 
  }
})


loadFromMySql();

//module.exports = router;