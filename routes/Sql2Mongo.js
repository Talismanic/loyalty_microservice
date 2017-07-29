var express = require('express');
var router = express.Router();
var db= require('../dbconnect');


function loadFromMySql(){
    var stmt="SELECT * FROM history";
    db.query(stmt, function(err, res){
        if(err)
            throw err;
        else 
            console.log(res);


    });


}

loadFromMySql();

//module.exports = router;