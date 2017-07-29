var express = require('express');
var router = express.Router();
var request = require("request");
var bodyParser = require('body-parser');
var util = require('util');
var dateTime = require('node-datetime');
var db=require('../dbconnect');
var data=require('csv-mysql');
var csvParser = require('csv-parse');

fs.readFile("usageHistory.csv", {
  encoding: 'utf-8'
}, function(err, csvData) {
  if (err) {
    console.log(err);
  }

  csvParser(csvData, {
    delimiter: ','
  }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
});




//module.exports = router;
