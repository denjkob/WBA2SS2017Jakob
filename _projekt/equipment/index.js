const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const ressourceName = "equipment";

// auf "/"
router.get("/", function(req,res){
    res.send("GET Repräsentation gesamtes Equipment");
    //TODO Wirkliche Implementierung
});
router.post("/", bodyParser.json(), function(req, res){
  console.log(req.body);
  res.status(200).json( {uri: req.protocol+"://"+req.header})
  //TODO Wirkliche Implementierung
});
//auf "/ID"
router.get("/:id", function(req,res){
  fs.readFile("./equipment/equipment.json", "utf8",	function(err,data)	{
    if (err) throw err;

    var obj = JSON.parse(data);
    //res.send("GET User "+ req.params.id + "\n"+ data);
    res.send(obj.equipment[req.params.id]);
  });
});
//router.delete

module.exports = router;
