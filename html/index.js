const express = require("express");
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const request = require("request");
const bodyParser = require("body-parser");
const	fs	=	require('fs');
const session = require("express-session");
const passport = require("passport");

const router = express.Router();
const ressourceName = "html";
var userid;


router.use(session({
  secret: 'dngolkfjnozifowhj',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}));
router.use(passport.initialize());
router.use(passport.session());

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

  router.post("/login",bodyParser.urlencoded({ extended: true }),function(req,res,next){
    console.log(req.body);
    fs.readFile("./html/login.html", "utf8",	function(err,data)	{
        fs.readFile("./user/user.json", "utf8", function(err,userdata){
          var obj = JSON.parse(userdata);

          for(i in obj.user){
            if(obj.user[i].username == req.body.username && obj.user[i].password == req.body.password) {
              userid = obj.user[i].id;
              req.login(userid, function(err){
                console.log("Success!");
                res.redirect("home");
              })
            }};
        });
          //res.status(200).send(data);
        });
    });
    /*passport.serializeUser(function(userid, done) {
      done(null, userid);
    });

    passport.deserializeUser(function(userid, done) {
      done(null, userid);
});*/
module.exports = router;
