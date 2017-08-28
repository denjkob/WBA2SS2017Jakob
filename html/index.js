const express = require("express");
const expressvalidator = require("express-validator");
const request = require("request");
const bodyParser = require("body-parser");
const	fs	=	require('fs');

const router = express.Router();
const ressourceName = "html";

//Methoden auf /equipment
router.use(function(req,res,next){
  console.log("Time %d " + "Request-Pfad: "+req.originalUrl, Date.now());
  next();
});

router.get("/home",function(req,res,next){
  fs.readFile("./html/index.html", "utf8",	function(err,data)	{
        if (err) throw err;
        res.status(200).send(data);
  });
});

router.get("/login",function(req,res,next){
  fs.readFile("./html/login.html", "utf8",	function(err,data)	{
        if (err) throw err;
        res.status(200).send(data);
  });
});

router.post("/register",bodyParser.urlencoded({ extended: true }),function(req,res,next){
  console.log(req.body);
  var url = req.protocol+"://"+req.headers.host+"/user";

  var options = {
    uri: url,
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    json: req.body
  };

  request(options, function(error, response, body){
    fs.readFile("./html/login.html", "utf8",	function(err,data)	{
          if (err) throw err;
          console.log(body);
          res.status(200).send(data);
    });
  });
  });

module.exports = router;
