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

var len=data.matches.length;
console.log(len);

var len=data.matches.length;
console.log(data.matches[2]);
console.log(len);


for(i=0; i<len;i++)
{
    if (data.matches[i]["team-1"]==="Surrey")
    console.log(data.matches[i].unique_id);


}

    res.send(matches);


});

});


module.exports = router;
