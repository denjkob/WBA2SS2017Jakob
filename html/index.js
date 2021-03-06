const express = require("express");
const {
  check,
  validationResult
} = require('express-validator/check');
const {
  matchedData
} = require('express-validator/filter');
const request = require("request");
const bodyParser = require("body-parser");
const fs = require('fs');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;


const router = express.Router();
const ressourceName = "html";


router.use(session({
  secret: 'dngolkfjnozifowhj',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    console.log(password);
    return done(null, 'dqasklh');
  }
));

router.use(function(req, res, next) {
  console.log("Time %d " + "Request-Pfad: " + req.originalUrl, Date.now());
  next();
});

router.get("/", function(req, res, next) {
    res.status(200).redirect("home");
});

router.get("/home", function(req, res, next) {
  fs.readFile("./html/index.html", "utf8", function(err, data) {
    if (err) throw err;
    res.status(200).send(data);
  });
});

router.get("/login", function(req, res, next) {
  fs.readFile("./html/login.html", "utf8", function(err, data) {
    if (err) throw err;
    res.status(200).send(data);
  });
});

router.get("/lend", function(req, res, next) {
  fs.readFile("./html/lend.html", "utf8", function(err, data) {
    if (err) throw err;
    res.status(200).send(data);
  });
});

router.post("/register", bodyParser.urlencoded({
  extended: true
}), function(req, res, next) {
  console.log(req.body);
  var url = req.protocol + "://" + req.headers.host + "/user";

  var options = {
    uri: url,
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    json: req.body
  };

  request(options, function(error, response, body) {
    fs.readFile("./html/login.html", "utf8", function(err, data) {
      if (err) throw err;
      console.log(body);
      res.status(200).send(body);
    });
  });
});

router.post("/login", passport.authenticate('local', {
  successRedirect: 'home',
  failureRedirect: 'login',
  failureFlash: false
}));

router.post("/lend", bodyParser.urlencoded({
  extended: true
}), function(req, res, next) {
  console.log(req.body);
if(req.body.equipmentid != null){
  if (req.body.userid != null && req.body.until != null) {
    var url = req.protocol + "://" + req.headers.host + "/equipment/" +req.body.equipmentid+ "/order?userid=" + req.body.userid + "&until=" + req.body.until;
  } else {
    var url = req.protocol + "://" + req.headers.host + "/equipment/" +req.body.equipmentid;
  } }else{
    res.status(400).redirect("lend");
  }
  var options = {
    uri: url,
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    json: req.body
  };

  request(options, function(error, response, body) {
    res.json(body);
  });
});

/*passport.serializeUser(function(userid, done) {
  done(null, userid);
});

passport.deserializeUser(function(userid, done) {
  done(null, userid);
});*/
module.exports = router;
