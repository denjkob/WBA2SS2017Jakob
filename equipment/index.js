const express = require("express");
const bodyParser = require("body-parser");
const	fs	=	require('fs');
const expressValidator = require('express-validator');

const router = express.Router();
const ressourceName = "equipment";
const dataFile = "./equipment/equipment.json";

//Methoden auf /equipment

router.use(expressValidator());
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
    //Validator
    req.checkBody("label", 'Label field cannot be empty.').notEmpty();

    const errors = req.validationErrors();

    if(errors) {
      res.status(401).send(JSON.stringify(errors));
    }else{

    res.status(200).json( {uri: req.protocol+"://"+req.headers.host+req.originalUrl+"/"+i});
    req.body.available = "true";
    req.body.id = i;
    obj.equipment.push(req.body);
    var json = JSON.stringify(obj);

    fs.writeFile(dataFile, json, 'utf8', function(err,data){
      if(err) throw err;
    });
  };
  });
});

//Methoden auf equipment/ID
router.put("/:id", bodyParser.json(),function(req,res){
  fs.readFile(dataFile, "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);

    req.checkBody("label", 'Label field cannot be empty.').notEmpty();
    req.checkBody("id", "field not to be modified by user.").not().exists();
    req.checkBody("available", "field not to be modified by user").not().exists();
    req.checkBody("orderedBy", "field not to be modified by user").not().exists();
    req.checkBody("orderedUntil", "field not to be modified by user").not().exists();

    const errors = req.validationErrors();

    if(errors) {
      res.status(400).send(JSON.stringify(errors));
    }else{
    req.body.available=obj.equipment[req.params.id].available;
    req.body.orderedBy=obj.equipment[req.params.id].orderedBy;
    req.body.orderedUntil=obj.equipment[req.params.id].orderedUntil;
    req.body.id=req.params.id;
    obj.equipment.splice(req.params.id,1,req.body); //Anfang, wie viele löschen, einfügen
    var json = JSON.stringify(obj);

    fs.writeFile(dataFile, json, 'utf8', function(err,data){
      if(err) throw err;
    });
    res.send("PUT "+obj.equipment[req.params.id]);
  }
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
    for(i in obj.equipment){
      obj.equipment[i].id = i;
    }
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

    if(req.query.userid != null && req.query.until != null){
    if(obj.equipment[req.params.id].available=="true"){
      obj.equipment[req.params.id].orderedBy = req.query.userid;
      obj.equipment[req.params.id].orderedUntil = req.query.until;
      obj.equipment[req.params.id].available = "false";
      obj.equipment.splice(req.params.id,1,obj.equipment[req.params.id]); //Anfang, wie viele löschen, einfügen
      var json = JSON.stringify(obj);

      fs.writeFile(dataFile, json, 'utf8', function(err,data){
        if(err) throw err;
      });
      res.send("PUT "+obj.equipment[req.params.id]);
    }else{
      res.status(400).send({"message":"Equipment not available!"})
    }
    }else{
      obj.equipment[req.params.id].available = "true";
      console.log("equipment reset or Error 400");
      res.send({"message":"Equipment ordered."});
    }
  });
});


module.exports = router;
