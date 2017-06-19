//TODO Dienstgeber
const express = require("express");
const user = require("./user");
const equipment = require("./equipment");
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
app.all(function(req,res,next){
  console.log("Time %d " + "Request-Pfad: "+req.path, Date.now());
  next();
});
//GET Requests
app.get("/", function (req, res) {
  res.send("GET Hello World!");
});
//TODO siehe Modellierung
//TODO POST Requests s
//TODO PUT Requests
//TODO DELETE Requests

//Server wird erstellt
app.listen(settings.port, function() {
  console.log("Dienstgeber ist nun auf Port " +settings.port+ " verfügbar.");
});
