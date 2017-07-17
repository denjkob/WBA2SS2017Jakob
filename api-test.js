const express = require("express");
const user = require("./user");
const equipment = require("./equipment");
const fs = require("fs");
const igdb = require("igdb-api-node").default;

//express an die Variable "app" binden
const app = express();
const client = igdb("glf02WQpgRmshvNhjD5wRBsLir9Zp1h7ezVjsnMl2hOkIETLuI");

//Routen an app binden
app.use("/user", user);
app.use("/equipment", equipment);

const settings = {
    port: process.env.PORT || 6000
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
//Test der externen API, Einbindung TODO
app.get("/igdb", function (req, res) {
  unirest.get("https://igdbcom-internet-game-database-v1.p.mashape.com/games/120")
  .header("X-Mashape-Key", "glf02WQpgRmshvNhjD5wRBsLir9Zp1h7ezVjsnMl2hOkIETLuI")
  .header("Accept", "application/json")
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
    res.send(result.body);
  });
});

app.get("/order", function (req, res) {
  client.games({
    ids: [
        18472,
        18228
    ]
}, [
    'name',
    'cover'
]).then(response => {
      res.send(response.body);
  }).catch(error => {
      throw error;
  });
});

app.get("/search", function (req, res) {
  client.games({
    fields: 'name',
    limit: 1,
    search: req.query.name
}).then(response => {
    res.send(response.body);
}).catch(error => {
    throw error;
});
});


//Server wird erstellt
app.listen(settings.port, function() {
  console.log("Dienstgeber ist nun auf dem Port " +settings.port+ " verfügbar.");
});
