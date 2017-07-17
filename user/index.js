const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const	fs	=	require('fs');

const ressourceName = "user";
const dataFile = "./user/user.json";

router.use(function(req,res,next){
  console.log("Time %d " + "Request-Pfad: "+req.originalUrl, Date.now());
  next();
});

router.get("/", function(req,res){
   fs.readFile(dataFile, "utf8",	function(err,data)	{
        if (err) throw err;

        var obj = JSON.parse(data);

        res.send(obj.user);
    });
});

router.post("/", bodyParser.json(), function(req, res){
  console.log("body: ",req.body);
  res.status(200).json( {uri: req.protocol+"://"+req.headers.host+req.originalUrl+"/"+req.body.id});
  fs.readFile(dataFile, "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.user.push(req.body);
    var json = JSON.stringify(obj);
    fs.writeFile(dataFile, json, 'utf8', function(err,data){
      if(err) throw err;
    });
  });

});

router.put("/:id", bodyParser.json(),function(req,res){
  console.log("body: ",req.body);
  fs.readFile(dataFile, "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.user.splice(req.params.id,1,req.body); //Anfang, wie viele löschen, einfügen
    var json = JSON.stringify(obj);
    fs.writeFile(dataFile, json, 'utf8', function(err,data){
      if(err) throw err;
    });
    var myJSON = JSON.stringify(obj);
    res.send("PUT "+obj.user[req.params.id]);
  });
});

router.get("/:id", function(req,res){
    fs.readFile(dataFile, "utf8",	function(err,data)	{
      if (err) throw err;

      var obj = JSON.parse(data);

      if(obj.user[req.params.id]==null)res.status(404);

      res.send(obj.user[req.params.id]);
    });
});

router.delete("/:id", function(req,res){
  fs.readFile(dataFile, "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.user.splice(req.params.id, 1);
    var json = JSON.stringify(obj);
    fs.writeFile(dataFile, json, 'utf8', function(err,data){
      if(err) throw err;
    });
    res.send("DELETE");
  });
});

router.get("/:id/orders", function(req, res){
  fs.readFile("./equipment/equipment.json", "utf8", function(err,data){
    if(err) throw err;

    var obj = JSON.parse(data);
    var resJson = {"orders":[]};
    for(i in obj.equipment){
      if(obj.equipment[i].orderedBy == req.params.id) resJson.orders.push(obj.equipment[i]);
    }
    res.json(resJson);
  });

  //TODO in equipment.json nach "orderedBy" id suchen entsprechend req.params.id
});

module.exports = router;
