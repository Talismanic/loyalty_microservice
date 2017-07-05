var express = require('express');
var router = express.Router();
var request = require("request");
var bodyParser = require('body-parser');

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
   var matches=body;
    res.send(matches);


    });

});


module.exports = router;
