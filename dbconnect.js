var mysql=require('mysql');
var connection=mysql.createConnection({
 
host:'localhost',
user:'root',
password:'mehedi123',
database:'loyalty'
});

connection.connect(function(err){

    if(err) throw err;
    console.log('now you are connected with mysql');

});

 module.exports=connection;