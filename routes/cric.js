var express = require('express');
var router = express.Router();
var request = require("request");
var bodyParser = require('body-parser');
var util = require('util');
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



//List of all the matches

router.get('/', function(req, res, next){

request(options_match, function(err, resp, body){

var data=JSON.parse(body);

for(i=0; i<data.matches.length;i++)
{
    if ((data.matches[i]["team-1"]==="Surrey" || data.matches[i]["team-2"]==="Surrey") && data.matches[i].matchStarted===true) 
  {
     match_id=data.matches[i].unique_id;
  }

}
    res.send(data);


});

});

//Getting the upcoming match list specified by country name


router.get('/upcoming/:country', function(req, res, next){

var country=req.params.country;

request(options_match,function(err,resp,body){
    var data=JSON.parse(body);
    var count=0;
    var output=[];

for(i=0; i<data.matches.length;i++)
{
    if(data.matches[i].matchStarted==false){

    if (data.matches[i]["team-1"]===country || data.matches[i]["team-2"]===country) 
  {
    var mat=data.matches[i]; 
    output.push({'match':mat});
    count++;
  }

    }


}

if(count){

    res.json(output);
    return;
}

else
var output={"remaks":"No match scheduled"};

});

});





//getting the score of the ongoing matches specified by country name


router.get('/ongoing/:country', function(req, res, next){

var country=req.params.country;

request(options_match,function(err,resp,body){
    var data=JSON.parse(body);
    var output=[];
    var id=0;
    
for(i=0; i<data.matches.length;i++)
{
    if(data.matches[i].matchStarted==true){

    if (data.matches[i]["team-1"]===country || data.matches[i]["team-2"]===country) 
      {
        id=data.matches[i].unique_id;
        console.log(id); 
        break;

      }  
  

    }



}

if(id){
    var options_score={

    url: "http://cricapi.com/api/cricketScore",
    method: 'GET',
    headers: headers,
    qs: {'apikey':'5v4sbOEUYbWKRiRuT5aaJ1ba8vQ2','unique_id':id}
}


    request(options_score, function(error,response, body){
    var score=JSON.parse(body);
    res.json(score);
    return;
});

}

else
{
    var rem={"remaks":"No match Ongoing"};
    res.json(rem);
    return;
}

});


});


module.exports = router;
