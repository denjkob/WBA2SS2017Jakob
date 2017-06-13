//TODO Dienstgeber
const express = require("express");
//TODO body-parser, siehe Screencast
//express an die Variable "app" binden
const app = express();
const settings = {
    port: 5000
    //datafile: DATEN
    //mehr hier
};
//Error Handler
app.use(function(err,req,res,next){
  console.console.error(err.stack);
  res.end(err.status + " " + err.messages);
});
//Pfad und Zeit für Request
app.use(function(err,req,res,next){
  console.log("Time %d" + "Request-Pfad: "+req.path, Date.now());
})
//GET Requests, später auslagern siehe Screencast express
app.get('/', function (req, res) {
  res.send('GET Hello World!');
});

app.get('/user', function(req,res){
  //TODO Response
  res.send('GET TODO');
});
//TODO siehe Modellierung

//TODO POST Requests s
//TODO PUT Requests
//TODO DELETE Requests

//Server wird erstellt
app.listen(settings.port, function() {
  console.log("Dienstgeber ist nun auf Port " +settings.port+ " verfügbar.");
});
