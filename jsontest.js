const express = require("express");
const user = require("./user");
const equipment = require("./equipment");
const bodyParser = require("body-parser");
const fs = require("fs");


//express an die Variable "app" binden
const app = express();
const dataFile = "./equipment/equipment.json";

//Routen an app binden

const settings = {
    port: 5000
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

app.post("/equipment", bodyParser.json(), function(req, res){
  console.log(req.body);

  fs.readFile(dataFile, "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    i = 0
    while(obj.equipment[i] != null){
      i++;
    }
    res.status(200).json( {uri: req.protocol+"://"+req.headers.host+req.originalUrl+"/"+i});
    req.body.id = i;
    obj.equipment.push(req.body);  
    var json = JSON.stringify(obj);

    fs.writeFile(dataFile, json, 'utf8', function(err,data){
      if(err) throw err;
    });
  });
});

  app.get("/equipment", function(req,res){
     fs.readFile(dataFile, "utf8",	function(err,data)	{
          if (err) throw err;

          var obj = JSON.parse(data);
          res.send(obj.equipment);
      });
  });

  app.get("equipment/:id", function(req,res){
      fs.readFile(dataFile, "utf8",	function(err,data)	{
        if (err) throw err;

        var obj = JSON.parse(data);

        res.send(obj.equipment[req.params.id]);
      	});
  });

app.get("/searchequipment/:label", function(req,res){
  fs.readFile("./equipment/equipment.json", "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    var resJson;
    for(i in obj.equipment){
      if(obj.equipment[i].label == req.params.label) {
          resJson = obj.equipment
          [i];
          res.send(resJson);
      }
    }
    if(resJson == null)
    res.status(404).send('Not found!');
});
});

//Server wird erstellt
app.listen(settings.port, function() {
  console.log("jsontest ist nun auf dem Port " +settings.port+ " verfügbar.");
});
