const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const	fs	=	require('fs');

const ressourceName = "equipment";

//GET auf /equipment
router.use(function(req,res,next){
  console.log("Time %d " + "Request-Pfad: "+req.originalUrl, Date.now());
  next();
});

router.get("/", function(req,res){
   fs.readFile("./equipment/equipment.json", "utf8",	function(err,data)	{
        if (err) throw err;

        var obj = JSON.parse(data);
        res.send(obj.equipment);
    });
});

router.post("/", bodyParser.json(), function(req, res){
  console.log(req.body);
    res.status(200).json( {uri: req.protocol+"://"+req.headers.host+req.originalUrl+"/"+req.body.id});
  fs.readFile("./equipment/equipment.json", "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.equipment.push(req.body);
    var json = JSON.stringify(obj);

    fs.writeFile('./equipment/equipment.json', json, 'utf8', function(err,data){
      if(err) throw err;
    });
  });

});

router.put("/:id", bodyParser.json(),function(req,res){
  fs.readFile("./equipment/equipment.json", "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.equipment.splice(req.params.id,1,req.body); //Anfang, wie viele löschen, einfügen
    var json = JSON.stringify(obj);

    fs.writeFile('./equipment/equipment.json', json, 'utf8', function(err,data){
      if(err) throw err;
    });
    res.send("PUT "+obj.equipment[req.params.id]);
  });
});

router.get("/:id", function(req,res){
    fs.readFile("./equipment/equipment.json", "utf8",	function(err,data)	{
      if (err) throw err;

      var obj = JSON.parse(data);
      //res.send("GET equipment "+ req.params.id + "\n"+ data);
      res.send(obj.equipment[req.params.id]);
    	});
});

router.delete("/:id", function(req,res){
  fs.readFile("./equipment/equipment.json", "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.equipment.splice(req.params.id, 1);
    var json = JSON.stringify(obj);
    fs.writeFile('./equipment/equipment.json', json, 'utf8', function(err,data){
      if(err) throw err;
    });
    res.send("DELETE");
  });
});

module.exports = router;
