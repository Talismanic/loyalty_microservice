var firebase = require('firebase');
var FCM = require('fcm-node');
var firebaseConfig = {
    apiKey: 'AIzaSyC-kALPL3134_6IM2jRrArU2QsbeC8l20Q',
    databaseURL: 'https://tempapp-83df7.firebaseio.com',
};

var serverkey = 'AIzaSyC-kALPL3134_6IM2jRrArU2QsbeC8l20Q';
var fcm = FCM(serverkey);


firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// Get a database reference to our posts
//var db = admin.database();
var ref = db.ref("tempapp-83df7");



// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {       
  var temp=snapshot.val().Mehedi.temp;
  var uid=snapshot.val().Mehedi.uid;
//  console.log(snapshot.val());
//  console.log(temp);
  if(temp<35){

        console.log("Everything Ok. Temperature is "+ temp +"C");
var message= {
    to : uid,

    notification : {
        title : 'Title of the notification',
        body : 'Body of the notification'
    },

    data: {
        my_key: 'my value',
        my_another_key: 'my another value'
    }
};

fcm.send(message, function(err,response){
    if(err) {
        console.log("Something has gone wrong !");
    } else {
        console.log("Successfully sent with resposne :",response);
    }
});



}


}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
