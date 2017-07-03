var express = require('express');
var router = express.Router();
var request = require("request");
var bodyParser = require('body-parser');

var headers= {
    'Content-Type': 'application/json'
}


var options={

    url: "http://cricapi.com/api/matches",
    method: 'GET',
    headers: headers,
    qs: {'apikey':'5v4sbOEUYbWKRiRuT5aaJ1ba8vQ2'}
}


router.get('/', function(req, res, next){

request(options, function(err, resp, body){

    for (var i=0; i<body.matches.length; i++){
        var matches=body.matches[i];
        var team01=matches.team-1;
        var team02=matches.team-2;
        console.log(team01);
        console.log(team02);


    }

    res.send(body);


});




});


module.exports = router;
