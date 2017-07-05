var express = require('express');
var router = express.Router();
var request = require("request");
var bodyParser = require('body-parser');
var matches= null;
var headers= {
    'Content-Type': 'application/json'
}


var options_match={

    url: "http://cricapi.com/api/matches",
    method: 'GET',
    headers: headers,
    qs: {'apikey':'5v4sbOEUYbWKRiRuT5aaJ1ba8vQ2'}
}


router.get('/', function(req, res, next){

request(options_match, function(err, resp, body){
    matches=body;

var data=JSON.parse(matches);

var len=data.length();

/*
for( var item of data){
    console.log(item.team-1);
}*/

    res.send(matches);


});

});


module.exports = router;
