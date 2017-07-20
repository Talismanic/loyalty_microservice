var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var headers={
        'Content-Type': 'application/json'
    }

    var options={

    url: "http://resaps.teletalk.com.bd/apps.php",
    method: 'GET',
    headers: headers,
    qs: {'exam':'hsc','year':2014,'board':'chittagong','roll':'103266','reg':'814887'}
}


    request(options_score, function(error,response, body){
    var score=JSON.parse(body);
    res.json(score);
    return;

});

});

module.exports = router;
