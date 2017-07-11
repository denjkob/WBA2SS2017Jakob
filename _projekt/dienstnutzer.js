const request = require("request");
const express = require("express");
const http = require("http");

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
    //if(error) res.status()
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);
    res.send(body); //res.json(body);
  });
});

app.get("/user", function(req,res){
    var url = dUrl+req.path;
    request(url, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body);
      res.send(body); //res.json(body);
    });
  });

app.get("/user/:id", function(req,res){
      var url = dUrl+req.path;
      request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
        res.send(body); //res.json(body);
      });
    });

app.get("/equipment", function(req,res){
    var url = dUrl+req.path;
    request(url, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body);
      res.send(body); //res.json(body);
    });
  });

app.get("/equipment/:id", function(req,res){
  var url = dUrl+req.path;
  request(url, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);
    res.send(body); //res.json(body);
  });
});

app.listen(settings.port, function() {
  console.log("Dienstnutzer ist nun auf der Adresse http://localhost:" +settings.port+ " verfügbar.");
});
