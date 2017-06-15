const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const ressourceName = "user";

//GET auf /user
router.get("/", function(req,res){
    res.send("GET Repräsentation aller User");
    //TODO Wirkliche Implementierung
});
router.post("/", bodyParser.json(), function(req, res){
  console.log(req.body);
  res.status(200).json( {uri: req.protocol+"://"+req.header})
  //TODO Wirkliche Implementierung
})

module.exports = router;
