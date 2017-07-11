const request = require("request");
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

var app = express();

const settings = {
    port: 7070
    //datafile: DATEN
    //mehr hier
};

var dHost = 'http://localhost';
var dPort = 5000;
var dUrl = dHost+":"+dPort;

//GET Funktionen
app.get("/", function(req,res){
  var url = dUrl;
  request(url, function (error, response, body) {
    if(error) res.status(404);
    console.log("path: ", req.path);
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);
    res.send(body); //res.json(body);
  });
});

app.get("/user", function(req,res){
    var url = dUrl+req.path;
    request(url, function (error, response, body) {
      if(error) res.status(404);
      console.log("path: ", req.path);
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body);
      res.status(response.statusCode).send(body); //res.json(body);
    });
  });

app.get("/user/:id", function(req,res){
      var url = dUrl+req.path;
      request(url, function (error, response, body) {
        if(error) res.status(404);
        console.log("path: ", req.path);
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
        res.status(response.statusCode).send(body); //res.json(body);
      });
    });

app.get("/equipment", function(req,res){
    var url = dUrl+req.path;
    request(url, function (error, response, body) {
      if(error) res.status(404);
      console.log("path: ", req.path);
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body);
      res.status(response.statusCode).send(body); //res.json(body);
    });
  });

app.get("/equipment/:id", function(req,res){
  var url = dUrl+req.path;
  request(url, function (error, response, body) {
    if(error) res.status(404);
    console.log("path: ", req.path);
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);
    res.status(response.statusCode).send(body); //res.json(body);
  });
});

//POST Methoden

app.post("/user", bodyParser.json(),function(req,res){
  var url = dUrl+req.path;

  var options = {
    uri: url,
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    json: req.body
  };

  request(options, function(error, response, body){
    console.log("path: ", req.path);
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);
    res.json(body);
  });
});

app.post("/equipment", bodyParser.json(),function(req,res){
  var url = dUrl+req.path;

  var options = {
    uri: url,
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    json: req.body
  };

  request(options, function(error, response, body){
    console.log("path: ", req.path);
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);
    res.json(body);
  });
});

//PUT Methoden
//TODO
//DELETE Methoden
//TODO

app.listen(settings.port, function() {
  console.log("Dienstnutzer ist nun auf der Adresse http://localhost:" +settings.port+ " verfügbar.");
});
