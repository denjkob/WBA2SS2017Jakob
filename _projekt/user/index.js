const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const	fs	=	require('fs');

const ressourceName = "user";

//GET auf /user
router.use(function(req,res,next){
  console.log("Time %d " + "Request-Pfad: "+req.originalUrl, Date.now());
  next();
});

router.get("/", function(req,res){
   fs.readFile("./user/user.json", "utf8",	function(err,data)	{
        if (err) throw err;

        var obj = JSON.parse(data);
        //res.send("GET User "+ req.params.id + "\n"+ data);

        res.send(obj.user);
    });//TODO Wirkliche Implementierung
});

router.post("/", bodyParser.json(), function(req, res){
  console.log(req.body);
  res.status(200).json( {uri: req.protocol+"://"+req.header})
  fs.readFile("./user/user.json", "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.user.push(req.body);
    var json = JSON.stringify(obj);
    fs.writeFile('./user/user.json', json, 'utf8', function(err,data){
      if(err) throw err;
    });
    var myJSON = JSON.stringify(obj);
  });

});

router.put("/:id", bodyParser.json(),function(req,res){
  fs.readFile("./user/user.json", "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.user.splice(req.params.id,1,req.body); //Anfang, wie viele löschen, einfügen
    var json = JSON.stringify(obj);
    fs.writeFile('./user/user.json', json, 'utf8', function(err,data){
      if(err) throw err;
    });
    var myJSON = JSON.stringify(obj);
    res.send("PUT "+obj.user[req.params.id]);
  });
});

router.get("/:id", function(req,res){
    fs.readFile("./user/user.json", "utf8",	function(err,data)	{
      if (err) throw err;

      var obj = JSON.parse(data);
      //res.send("GET User "+ req.params.id + "\n"+ data);
      res.send(obj.user[req.params.id]);
    	});
});
router.get("/:id/orders", function(req, res){
  res.send("GET User "+req.params.id+ " orders");
  //in equipment.json nach "orderedBy" id suchen entsprechend req.params.id
});

router.delete("/:id", function(req,res){
  fs.readFile("./user/user.json", "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.user.splice(req.params.id, 1);
    var json = JSON.stringify(obj);
    fs.writeFile('./user/user.json', json, 'utf8', function(err,data){
      if(err) throw err;
    });
    var myJSON = JSON.stringify(obj);
    res.send("DELETE");
  });
});

module.exports = router;
