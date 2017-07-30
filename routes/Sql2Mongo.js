var express = require('express');
var router = express.Router();
var db= require('../dbconnect');
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

loadFromMySql();

//module.exports = router;