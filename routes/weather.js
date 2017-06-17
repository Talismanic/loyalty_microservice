var express = require('express');
var router = express.Router();
var YQLP= require('yqlp');
var YQL= require('yql');
var woeid=null;
var util = require('util');
/* GET home page. */
router.get('/:location', function(req, res, next) {
  var loc=req.params.location;
  var location= loc+ ', bd';
  console.log(location);

YQLP.exec("SELECT woeid FROM geo.places(1) WHERE text=@text",{text:location}, function(error, response) {

    if (error) {
        console.log('Ut oh! Example #1 has messed up:', error);
    } else {
        woeid = response.query.results.place.woeid;
    }


YQLP.exec("SELECT * FROM weather.forecast WHERE woeid=@woeid",{woeid:woeid}, function(error, response) {

   console.log(woeid);

    if (error) {
        console.log('Ut oh! Example #1 has messed up:', error);
    } else {
      var results = response.query.results;
             var output = util.format(' The current weather in %s, %s is %s%s and %s',
            results.channel.location.city,
            results.channel.location.country,
            results.channel.item.condition.temp,
            results.channel.units.temperature,
            results.channel.item.condition.text);
      var condition=results.channel.item.condition;
      var wind=results.channel.wind;
      var atmos=results.channel.atmosphere;
      var forecast=results.channel.item.forecast;
//      var output=Object.assign('condition':condition,'wind':wind,'atmosphere':atmos);
   var output=[];
output.push({'condition':condition});
output.push({'wind':wind});
output.push({'atmosphere':atmos});
output.push({'forecast':forecast});
    }
     console.log(condition);
     console.log(wind);
     console.log(atmos);
     console.log(forecast);
     res.json(output);

}

        );


}

        );

});

module.exports = router;
