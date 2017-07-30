var express = require('express');
var router = express.Router();
var db= require('../dbconnect');
var MongoClient = require('mongodb').MongoClient
var URL = 'mongodb://localhost:27017/cdr'
var msisdn="01711085812";

function loadFromMySql(){
    var stmt="SELECT * FROM history where msisdn=?";
    db.query(stmt,msisdn, function(err, res){
        if(err)
            throw err;
        else 
            console.log(res);


    });


}

//loadFromMySql();



MongoClient.connect(URL, function(err, db) {
  if (err){
      console.log(err);
      return

  } 

  var collection = db.collection('cdrHistory')
  collection.insert({"msisdn": msisdn, "records":{"transaction_type":"VOICE","transaction_mode":"OUT","other_party_number":"01711085811","start_time":"2017-06-12 02:33:12","actual_consumption":"30","consumption_unit":"SEC","charges_in_bdt":"0.8"}}, function(err, result) {
    collection.find().toArray(function(err, docs) {
      console.log(docs[0])
      db.close()
    })
  })
})
//module.exports = router;