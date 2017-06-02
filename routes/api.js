var express = require('express');
var db = require('../dbconnect');
var router = express.Router();
//var bodyParser=require('body-parser');

/* Saying Hello. */
router.get('/greet', function(req, res, next) {
  res.send('Hello from the other side');
});


//Crediting balance

router.post('/credit', function(req, res, next){
  //console.log(req.body.msisdn);
  var msisdn= req.body.msisdn;
  var amount=parseFloat(req.body.amount);

//finding current point_balance and point_total from db
update_balance(msisdn,amount,res);
});




//debiting point

router.post('/debit', function(req, res, next){
  //console.log(req.body.msisdn);
  var msisdn= req.body.msisdn;
  var amount=parseFloat(req.body.amount);

    update_balance(msisdn,-amount,res);
});


//getting balance point

router.get('/msisdn/:msisdn/getBalance', function(req,res,next){

  //console.log(req.params.msisdn);
var msisdn= req.params.msisdn;

var sql_sel='SELECT * FROM balance where msisdn=?'

db.query(sql_sel,msisdn, function(err,result){
  if(err){
    res.statusCode=400;
    res.json(err);
  }
  if(result.length>0){
    var point_balance=parseFloat(result[0].point_balance);
    var point_total=parseFloat(result[0].point_total);

    var data={"msisdn":msisdn,"point_balance":point_balance,"point_total":point_total};

    res.statusCode=200;
    res.json(data);
  }
  else 
  {
    var data={"remark":"User not found"};
    res.statusCode=200;
    res.json(data);
  }


});

  //var data=req.param.msisdn;
  //res.send(data);


});


//updating balance sheet

function update_balance(msisdn, amount,res){
var sql_sel='SELECT * FROM balance where msisdn=?'
  db.query(sql_sel,msisdn, function(err,result){
    if(err){
      res.statusCode=400;
      res.json(err);
    }
    if (result.length>0){
      console.log(result);
      var previous_point=parseFloat(result[0].point_balance);
      var previous_total=parseFloat(result[0].point_total);

//updating point balance and point total
      var current_balance=previous_point+ amount;
            
  if(amount<0){
    amount=amount*0;
      if(current_balance<0)
        {
          var new_total=previous_total+amount;
          var data={"remark":"Insufficient balance"};
          res.statusCode=200;
          res.json(data);
          return;

        }
        else
      var new_total=previous_total+amount;  
  }

  else{
      var new_total=previous_total+amount;
  }
      

      console.log(current_balance);
      console.log(new_total);

      var sql_upd='UPDATE  balance SET point_balance=?,point_total=? where msisdn=?'
      var req_data=[
      current_balance,
      new_total,
      msisdn
      ];
      db.query(sql_upd,req_data,function(err,result){

        if(err){
          res.statusCode=400;
          res.json(err);
        }

        if(result){
          res.statusCode=201;
          var data={"remark":"updated successfully", "point_balance":current_balance, "point_total":new_total};
          res.json(data);
        }
      });
    }
    
  
    //handling if the user is new
    else
    {
      if(amount>0){
      var sql_ins='INSERT INTO balance (msisdn,point_balance,point_total) VALUES(?,?,?)' ;
      var ins_data=[
        msisdn,
        amount,
        amount
      ];
      db.query(sql_ins,ins_data,function(err,result){
        if(err){
          res.statusCode=400;
          res.json(err);
        }

        if(result){
          res.statusCode=201;
          var data={"remark":"updated successfully","point_balance":amount,"point_total":amount};
          res.json(data);
        }

      });
    }
    

    }
  });

}



module.exports = router;