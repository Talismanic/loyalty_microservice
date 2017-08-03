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
             for(var key in doc){
                 var val=doc[key];
                 var output={};
                 output["msisdn"]=msisdn;
                 output["records"]=val;
                 collection.insert(output, function(err, res){
                     if(err)
                        console.log(err);
                     else
                        console.log(res);
                    });
                }

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
            output=JSON.stringify(output);
            callback(null,data);
            
        } 

    });

}





//module.exports = router;