const request = require("request");
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const faye = require("faye");
const igdb = require("igdb-api-node").default;

const app = express();
const client = igdb("glf02WQpgRmshvNhjD5wRBsLir9Zp1h7ezVjsnMl2hOkIETLuI");
//Faye Server
var server = http.createServer();

function getConsoleOut(error, request, response, body) {
  console.log("path: ", request.path);
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body);
}

const settings = {
    port: 7070
};

var dUrl = 'https://gamelend.herokuapp.com' || "http://localhost:5000";

//GET Funktionen
app.get("/", function(req,res){
  var url = dUrl;
  request(url, function (error, response, body) {
    if(error) res.status(404);
    getConsoleOut(error,req, response,body);
    res.send(body); //res.json(body);
  });
});

app.get("/user", function(req,res){
    var url = dUrl+req.path;
    request(url, function (error, response, body) {
      if(error) res.status(404);
      getConsoleOut(error,req, response,body);
      res.status(response.statusCode).send(body); //res.json(body);
    });
  });

app.get("/user/:id", function(req,res){
      var url = dUrl+req.path;
      request(url, function (error, response, body) {
        if(error) res.status(404);
        getConsoleOut(error,req, response,body);
        res.status(response.statusCode).send(body); //res.json(body);
      });
    });

app.get("/user/:id/orders", function(req,res){
        var url = dUrl+req.path;
        request(url, function (error, response, body) {
          if(error) res.status(404);
          getConsoleOut(error,req, response,body);
          res.status(response.statusCode).send(body); //res.json(body);
          });
        });

app.get("/equipment", function(req,res){
    var url = dUrl+req.path;
    request(url, function (error, response, body) {
      if(error) res.status(404);
      getConsoleOut(error,req, response,body);
      res.status(response.statusCode).send(body); //res.json(body);
    });
  });

app.get("/equipment/:id", function(req,res){
  var url = dUrl+req.path;
  request(url, function (error, response, body) {
    if(error) res.status(404);
    var obj = JSON.parse(body);
    //igdb API
    client.games({
      fields: 'summary,rating',
      limit: 1,
      search: obj.label
    }).then(response => {
        var obj2 = response.body;
        obj.gdbinfo = obj2;
        res.send(obj);
      console.log(JSON.stringify(response.body));
    }).catch(error => {
      throw error;
    });
    getConsoleOut(error,req, response,body);
    //res.status(response.statusCode).send(body); //res.json(body);
  });
});

app.get("/searchuser/:name", function(req,res){
  var url = dUrl+req.path;
  request(url, function (error, response, body) {
    if(error) res.status(404);
    getConsoleOut(error,req, response,body);
    res.send(body); //res.json(body);
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
    getConsoleOut(error,req, response,body);
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
    getConsoleOut(error,req, response,body);
    res.json(body);
  });
});

//PUT Methoden
app.put("/equipment/:id", bodyParser.json(),function(req,res){
  var url = dUrl+req.path;

  var options = {
    uri: url,
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    json: req.body,
  };
  //faye stuff, also not working
  /*client.publish("/messages", {text: "EquipmentID "+req.params.id+" wurde geändert."})
  .then(function(){
    console.log("Nachricht geschickt!");
  }, function(error){
    console.log("There was an error publishing: "+ error.message);
  });*/

  request(options, function(error, response, body){
    getConsoleOut(error,req, response,body);
    res.json(body);
  });
});

app.put("/equipment/:id/order", bodyParser.json(),function(req,res){
  if(req.query.userid != null&&req.query.until!=null){
  var url = dUrl+req.path+"?userid="+req.query.userid+"&until="+req.query.until;
}else{
  var url = dUrl+req.path;
}
  var options = {
    uri: url,
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    json: req.body
  };

  request(options, function(error, response, body){
    getConsoleOut(error, req, response, body);
    res.json(body);
  });
});

app.put("/user/:id", bodyParser.json(),function(req,res){
  var url = dUrl+req.path;

  var options = {
    uri: url,
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    json: req.body
  };

  request(options, function(error, response, body){
    getConsoleOut(error,req, response,body);
    res.json(body);
  });
});
//DELETE Methoden
app.delete("/user/:id", function(req,res){
      var url = dUrl+req.path;
      request.delete(url, function (error, response, body) {
        if(error) res.status(400);
        getConsoleOut(error,req, response,body);
        res.status(response.statusCode).send(body); //res.json(body);
      });
    });

app.delete("/equipment/:id", function(req,res){
          var url = dUrl+req.path;
          request.delete(url, function (error, response, body) {
            if(error) res.status(404);
            getConsoleOut(error,req, response,body);
            res.status(response.statusCode).send(body); //res.json(body);
          });
        });
//TODO

//faye (not working)
//Server
/* var fayeservice = new faye.NodeAdapter({
  mount: "/faye",
  timeout: 45
});
fayeservice.attach(server);
//Client
var fayeclient = new faye.Client("http://localhost:"+settings.port+"/faye");
client.subscribe("/messages", function(message) {
  console.log(message.text);
});*/


app.listen(settings.port, function() {
  console.log("Dienstnutzer ist nun auf der Adresse http://localhost:" +settings.port+ " verfügbar.");
});
