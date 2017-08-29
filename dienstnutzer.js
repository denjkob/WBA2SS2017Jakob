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
    }, [
    'name',
    'rating',
    "url",
    'cover'
] ).then(response => {
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

app.get("/searchequipment/:label", function(req,res){
  var url = dUrl+req.path;
  request(url, function (error, response, body) {
    if(error) res.status(404);
    getConsoleOut(error,req, response,body);
    res.send(body); //res.json(body);
  });
});

app.get("/html/home", function(req,res){
  var url = dUrl+req.path;
  request(url, function (error, response, body) {
    if(error) res.status(404);
    getConsoleOut(error,req, response,body);
    res.send(body); //res.json(body);
  });
});

app.get("/html/login", function(req,res){
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
    bayeux.getClient().publish("/messages/new", {text: "Ein neuer User Eintrag wurde angelegt."})
    .then(function(){
      console.log("faye: Nachricht geschickt!");
    }, function(error){
      console.log("faye: There was an error publishing: "+ error.message);
    });
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
    bayeux.getClient().publish("/messages/new", {text: "Ein neuer Equipment Eintrag wurde angelegt."})
    .then(function(){
      console.log("faye: Nachricht geschickt!");
    }, function(error){
      console.log("faye: There was an error publishing: "+ error.message);
    });
    res.json(body);
  });
});

//nicht funktionierend, siehe Dienstgeber
app.post("/html/register", bodyParser.urlencoded({ extended: true }),function(req,res){
  var url = dUrl+req.path;

  var options = {
    uri: url,
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: req.body
  };

  request(options, function(error, response, body){
    getConsoleOut(error,req, response,body);
    console.log(options)
    res.status(200).send(body);
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

  request(options, function(error, response, body){
    getConsoleOut(error,req, response,body);
    bayeux.getClient().publish("/messages/changes", {text: "UserID "+req.params.id+" wurde geändert."})
    .then(function(){
      console.log("faye: Nachricht geschickt!");
    }, function(error){
      console.log("faye: There was an error publishing: "+ error.message);
    });
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
    if(req.query.userid != null&&req.query.until!=null){
      bayeux.getClient().publish("/messages/orders", {text: "Auf EquipmentID "+req.params.id+" wurde eine Order plaziert von UserID "+req.query.userid+", falls diese freigeben war."})
      .then(function(){
        console.log("faye: Nachricht geschickt!");
      }, function(error){
        console.log("faye: There was an error publishing: "+ error.message);
      });
    }else{
      bayeux.getClient().publish("/messages/orders", {text: "EquipmentID "+req.params.id+" wurde freigegeben. Es können wieder Orders platziert werden."})
      .then(function(){
        console.log("faye: Nachricht geschickt!");
      }, function(error){
        console.log("faye: There was an error publishing: "+ error.message);
      });
    }
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
  bayeux.getClient().publish("/messages/changes", {text: "UserID "+req.params.id+" wurde geändert."})
  .then(function(){
    console.log("faye: Nachricht geschickt!");
  }, function(error){
    console.log("faye: There was an error publishing: "+ error.message);
  });

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
        bayeux.getClient().publish("/messages/delete", {text: "Ein User Delete Request wurde gesendet."})
        .then(function(){
          console.log("faye: Nachricht geschickt!");
        }, function(error){
          console.log("faye: There was an error publishing: "+ error.message);
        });
        res.status(response.statusCode).send(body); //res.json(body);
      });
    });

app.delete("/equipment/:id", function(req,res){
          var url = dUrl+req.path;
          request.delete(url, function (error, response, body) {
            if(error) res.status(404);
            getConsoleOut(error,req, response,body);
            bayeux.getClient().publish("/messages/delete", {text: "Ein Equipment Delete Request wurde gesendet."})
            .then(function(){
              console.log("faye: Nachricht geschickt!");
            }, function(error){
              console.log("faye: There was an error publishing: "+ error.message);
            });
            res.status(response.statusCode).send(body); //res.json(body);
          });
        });
//TODO


//Server
var bayeux = new faye.NodeAdapter({
  mount: "/faye",
  timeout: 45
});
bayeux.attach(server);
server.listen(8000);
//Client
var fayeclient = new faye.Client("http://localhost:"+8000+"/faye");
fayeclient.subscribe("/messages/**").withChannel(function(channel, message) {
  console.log('faye,'+channel+': Nachricht erhalten!');
});


app.listen(settings.port, function() {
  console.log("Dienstnutzer ist nun auf der Adresse http://localhost:" +settings.port+ " verfügbar.");
});
