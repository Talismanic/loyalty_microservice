var express = require('express');
var router = express.Router();
var request = require("request");
var bodyParser = require('body-parser');
var RssFeedEmitter = require('rss-feed-emitter');
var feeder = new RssFeedEmitter();


router.get('/',function(req, res, next){

feeder.add({
  url: 'http://www.nintendolife.com/feeds/news',
  refresh: 60000
});

feeder.on('new-item', function(item) {
  var out=JSON.parse(item);
  res.json(out);
})


})





module.exports = router;
