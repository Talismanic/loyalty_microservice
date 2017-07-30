var express = require('express');
var router = express.Router();
var db= require('../dbconnect');
var MongoClient = require('mongodb').MongoClient;
var URL = 'mongodb://localhost:27017/cdr';
var msisdn="01711085812";
var mnDB=require('../mongoConnect');
var doc=null;

mnDB.connect(URL, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
      var collection = mnDB.get().collection('cdrHistory');

      loadFromMySql(msisdn,function(err,docs){
          if(err)
            console.log(err);
          else{
              doc=docs;
             // console.log(doc);
             /*
             collection.insert(doc, function(err, res){
                 if(err)
                    console.log(err);
                 else
                    console.log(res);
                });*/
            }
        });
      //console.log(doc);
/*      
      collection.insert(doc, function(err, res){
          if(err)
            console.log(err);
          else
            console.log(res);
      });
*/

      console.log(doc);

      collection.find().toArray(function(err,docs){
          console.log(docs);
          return
      })
 
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
            var data=JSON.stringify(res)
            output.push({'msisdn':msisdn});
            output.push({'records':data});
      //      console.log(data);
        
            output=JSON.stringify(output);
            console.log(output);
            callback(null,output);
            
        } 

    });

}






//loadFromMySql(msisdn);

//module.exports = router;