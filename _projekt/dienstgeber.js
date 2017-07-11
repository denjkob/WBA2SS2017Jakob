//API KEY:  LTTiFiJEOWmshX4FXGVxGgBAs3Hup1wqZq3jsn7SfqBxhh2XkU
//TODO Dienstgeber
const express = require("express");
const user = require("./user");
const equipment = require("./equipment");
const fs = require("fs");
//express an die Variable "app" binden
const app = express();
//Route an app binden
app.use("/user", user);
app.use("/equipment", equipment);

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
app.use(function(req,res,next){
  console.log("Time %d " + "Request-Pfad: "+req.path, Date.now());
  next();
});
//GET Requests
app.get("/", function (req, res) {
  res.send("GET Hello World!");
});

app.get("/searchuser/:name", function(req,res){
  fs.readFile("./user/user.json", "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    res.send("GET User "+ req.params.name);
  });
});
//TODO siehe Modellierung
//TODO POST Requests s
//TODO PUT Requests
//TODO DELETE Requests

//Server wird erstellt
app.listen(settings.port, function() {
  console.log("Dienstgeber ist nun auf der Adresse http://localhost:" +settings.port+ " verfügbar.");
});
