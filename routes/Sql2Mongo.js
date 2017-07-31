var express = require('express');
var router = express.Router();
var db= require('../dbconnect');
var MongoClient = require('mongodb').MongoClient;
var URL = 'mongodb://localhost:27017/cdr';
var msisdn="01711085815";
var mnDB=require('../mongoConnect');
var doc=null;

mnDB.connect(URL, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
      var collection = mnDB.get().collection('cdrHistory');

      loadFromMySql(msisdn,function(err,doc){
          if(err)
            console.log(err);
          else{
              //console.log(doc);
              //console.log(docs);
             //var hist=JSON.parse(doc);
             for(var key in doc){
                 var val=JSON.stringify(doc[key]);
                 var output={};
                 output["msisdn"]=msisdn;
                 output["records"]=val;
                 output=JSON.parse(output);
                 //console.log(output);
                 collection.insert(output, function(err, res){
                     if(err)
                        console.log(err);
                     else
                        console.log(res);
                    });
                }

/*
             collection.insert(hist, function(err, res){
                 if(err)
                    console.log(err);
                 else
                    console.log(res);
                });
                collection.find().toArray(function(err,docs){
                    console.log(docs);
                    return
                })*/
            }
        });
 
  }
});





//loading data from mysql

function loadFromMySql(ms,callback){
    var output=[];
    var stmt="SELECT transaction_type,transaction_mode,other_party_number,start_time,actual_consumption,consumption_unit,charges_in_bdt FROM history where msisdn=?";
    db.query(stmt,ms, function(err, res){
        if(err)
            throw err;
        else{
            var data=res;
           
      //      console.log(data);
        
            output=JSON.stringify(output);
     //     console.log(output);
            callback(null,data);
            
        } 

    });

}






//loadFromMySql(msisdn);

//module.exports = router;