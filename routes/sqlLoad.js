var express = require('express');
var bodyParser = require('body-parser');
var dateTime = require('node-datetime');
var cm=require('csv-mysql');
var csvParser = require('csv-parse');
var fs = require("fs");

fs.readFile("usageHistory.csv", {
  encoding: 'utf-8'
}, function(err, csvData) {
  if (err) {
    console.log(err);
  }
 else{
     console.log(csvData);
//     data=csvData;

     var options = {
         mysql: {
             host:'localhost',
             user:'root',
             password:'mehedi123',
             database:'loyalty',
             port: 3006
            },
        csv: {
            comment: '#',
            quote: '"'
        },
        table: 'history'
    }



cm.import(options, csvData, function(err, rows){
    if(err)
        console.log(err);

    else
        console.log(rows);
});


console.log(data);

 }
    
});