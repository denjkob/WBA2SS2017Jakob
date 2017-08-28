const express = require("express");
const bodyParser = require("body-parser");
const	fs	=	require('fs');
const expressvalidator = require("express-validator");

const router = express.Router();
const ressourceName = "equipment";
const dataFile = "./equipment/equipment.json";

//Methoden auf /equipment
router.use(function(req,res,next){
  console.log("Time %d " + "Request-Pfad: "+req.originalUrl, Date.now());
  next();
});

router.get("/", function(req,res){
   fs.readFile(dataFile, "utf8",	function(err,data)	{
        if (err) throw err;

        var obj = JSON.parse(data);
        res.send(obj.equipment);
    });
});

router.post("/", bodyParser.json(), function(req, res){
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

//Methoden auf equipment/ID
router.put("/:id", bodyParser.json(),function(req,res){
  fs.readFile(dataFile, "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.equipment.splice(req.params.id,1,req.body); //Anfang, wie viele löschen, einfügen
    var json = JSON.stringify(obj);

    fs.writeFile(dataFile, json, 'utf8', function(err,data){
      if(err) throw err;
    });
    res.send("PUT "+obj.equipment[req.params.id]);
  });
});

router.get("/:id", function(req,res){
    fs.readFile(dataFile, "utf8",	function(err,data)	{
      if (err) throw err;

      var obj = JSON.parse(data);

      res.send(obj.equipment[req.params.id]);
    	});
});

router.delete("/:id", function(req,res){
  fs.readFile(dataFile, "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.equipment.splice(req.params.id, 1);
    var json = JSON.stringify(obj);
    fs.writeFile(dataFile, json, 'utf8', function(err,data){
      if(err) throw err;
    });
    res.send("DELETE");
  });
});

router.put("/:id/order", function(req, res){
  fs.readFile(dataFile, "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
      obj.equipment[req.params.id].orderedBy = req.query.userid;
      obj.equipment[req.params.id].orderedUntil = req.query.until;
    if(req.query.userid != null && req.query.until != null){
      obj.equipment[req.params.id].available = "false";
    }else{
      obj.equipment[req.params.id].available = "true";
      console.log("equipment reset or Error 400");
    }
    obj.equipment.splice(req.params.id,1,obj.equipment[req.params.id]); //Anfang, wie viele löschen, einfügen
    var json = JSON.stringify(obj);

    fs.writeFile(dataFile, json, 'utf8', function(err,data){
      if(err) throw err;
    });
    res.send("PUT "+obj.equipment[req.params.id]);
  });
});


module.exports = router;
