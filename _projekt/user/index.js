const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const	fs	=	require('fs');

const ressourceName = "user";

//GET auf /user
router.get("/", function(req,res){
    res.send("GET Repräsentation aller User");
    //TODO Wirkliche Implementierung
});
router.post("/", bodyParser.json(), function(req, res){
  console.log(req.body);
  res.status(200).json( {uri: req.protocol+"://"+req.header})
  fs.readFile("./user/user.json", "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    obj.user.push(req.body);
    var json = JSON.stringify(obj);
    fs.writeFile('./user/user.json', json, 'utf8', callback);
    var myJSON = JSON.stringify(obj);
  });

});

router.put("/", bodyParser.json(),function(req,res){
    res.send("PUT TODO");
    console.log("TODO");
});

router.get("/:id", function(req,res){
    fs.readFile("./user/user.json", "utf8",	function(err,data)	{
      if (err) throw err;

      var obj = JSON.parse(data);
      //res.send("GET User "+ req.params.id + "\n"+ data);
      res.send(obj.user[req.params.id]);
    	});
});

//router.delete

module.exports = router;
