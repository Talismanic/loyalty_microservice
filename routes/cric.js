var express = require('express');
var router = express.Router();
var request = require("request");
var bodyParser = require('body-parser');
var match_id= null;
var headers= {
    'Content-Type': 'application/json'
}


var options_match={

    url: "http://cricapi.com/api/matches",
    method: 'GET',
    headers: headers,
    qs: {'apikey':'5v4sbOEUYbWKRiRuT5aaJ1ba8vQ2'}
}


var options_score={

    url: "http://cricapi.com/api/cricketScore",
    method: 'GET',
    headers: headers,
    qs: {'apikey':'5v4sbOEUYbWKRiRuT5aaJ1ba8vQ2','unique_id':match_id}
}

router.get('/', function(req, res, next){

request(options_match, function(err, resp, body){
var    matches=body;

var data=JSON.parse(matches);

var len=data.matches.length;
console.log(len);

var len=data.matches.length;

for(i=0; i<len;i++)
{
    if ((data.matches[i]["team-1"]==="Surrey" || data.matches[i]["team-2"]==="Surrey") && data.matches[i].matchStarted===true) 
  {
     match_id=data.matches[i].unique_id;
    console.log(match_id);
  }

}



request(options_score, function(error,response, body){
    var score=JSON.parse(body);
    console.log(score);

});



    res.send(data);


});

});


router.get('/upcoming/:country', function(req, res, next){

var country=req.params.country;

request(options_match,function(err,resp,body){
    var data=JSON.parse(body);
var count=0;
var match_id_ar=[];
var match_time=[];
   

for(i=0; i<data.matches.length;i++)
{
   
    if(data.matches[i].matchStarted==false){

    if (data.matches[i]["team-1"]===country || data.matches[i]["team-2"]===country) 
  {
     match_id_ar[count]=data.matches[i].unique_id;
     match_time[count]=data.matches[i].date;
     count++;
  }

    }


}

if(count){
    var output=JSON.stringify(match_time);

}

else
var output={"remaks":"No match scheduled"};

res.json(output);
return;

});


});

module.exports = router;
