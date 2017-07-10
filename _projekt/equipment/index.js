const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const	fs	=	require('fs');

const ressourceName = "equipment";

//GET auf /equipment
router.get("/", function(req,res){
   fs.readFile("./equipment/equipment.json", "utf8",	function(err,data)	{
        if (err) throw err;

        var obj = JSON.parse(data);
        //res.send("GET equipment "+ req.params.id + "\n"+ data);

        res.send(obj.equipment);
    });//TODO Wirkliche Implementierung
});

router.post("/", bodyParser.json(), function(req, res){
  console.log(req.body);
  res.status(200).json( {uri: req.protocol+"://"+req.header})
  fs.readFile("./equipment/equipment.json", "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.equipment.push(req.body);
    var json = JSON.stringify(obj);
    fs.writeFile('./equipment/equipment.json', json, 'utf8', function(err,data){
      if(err) throw err;
    });
    var myJSON = JSON.stringify(obj);
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
    var myJSON = JSON.stringify(obj);
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
    var myJSON = JSON.stringify(obj);
    res.send("DELETE");
  });
});

module.exports = router;
