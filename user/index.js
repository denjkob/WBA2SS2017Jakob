const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const expressValidator = require('express-validator');

const router = express.Router();
const ressourceName = "user";
const dataFile = "./user/user.json";

//Methoden auf /user
router.use(expressValidator());
router.use(function(req, res, next) {
  console.log("Time %d " + "Request-Pfad: " + req.originalUrl, Date.now());
  next();
});

router.get("/", function(req, res) {
  fs.readFile(dataFile, "utf8", function(err, data) {
    if (err) throw err;

    var obj = JSON.parse(data);

    res.send(obj.user);
  });
});

router.post("/", bodyParser.json(), function(req, res) {
  console.log(req.body);

  fs.readFile(dataFile, "utf8", function(err, data) {
    if (err) throw err;

    var obj = JSON.parse(data);
    i = 0
    while (obj.user[i] != null) {
      i++;
    }
    req.checkBody("username", 'username field cannot be empty.').notEmpty();
    req.checkBody("address", 'address field cannot be empty.').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      res.status(400).send(JSON.stringify(errors));
    } else {
      res.status(200).json({
        uri: req.protocol + "://" + req.headers.host + req.originalUrl + "/" + i
      });
      req.body.id = i;
      obj.user.push(req.body);
      var json = JSON.stringify(obj);

      fs.writeFile(dataFile, json, 'utf8', function(err, data) {
        if (err) throw err;
      });
    }
  });
});


router.put("/:id", bodyParser.json(), function(req, res) {
  console.log("body: ", req.body);
  fs.readFile(dataFile, "utf8", function(err, data) {
    if (err) throw err;

    var obj = JSON.parse(data);

    req.checkBody("username", 'username field cannot be empty.').notEmpty();
    req.checkBody("address", 'address field cannot be empty.').notEmpty();
    req.checkBody("id", "field not to be modified by user.").not().exists();

    const errors = req.validationErrors();

    if (errors) {
      res.status(401).send(JSON.stringify(errors));
    } else {

      obj.user.splice(req.params.id, 1, req.body); //Anfang, wie viele löschen, einfügen
      req.body.id = req.params.id;
      var json = JSON.stringify(obj);
      fs.writeFile(dataFile, json, 'utf8', function(err, data) {
        if (err) throw err;
      });
      res.send("PUT " + obj.user[req.params.id]);
    }
  });
});

router.get("/:id", function(req, res) {
  fs.readFile(dataFile, "utf8", function(err, data) {
    if (err) throw err;

    var obj = JSON.parse(data);

    if (obj.user[req.params.id] == null) res.status(404);

    res.send(obj.user[req.params.id]);
  });
});

router.delete("/:id", function(req, res) {
      fs.readFile(dataFile, "utf8", function(err, data) {
          if (err) throw err;

          var obj = JSON.parse(data);
          obj.user.splice(req.params.id, 1);
          fs.readFile("./equipment/equipment.json", "utf8", function(err, data) {
              var equipment = JSON.parse(data);
              for (i in equipment.equipment) {
                if (equipment.equipment[i].orderedBy == req.params.id) {
                  equipment.equipment[i].orderedBy = null;
                  equipment.equipment[i].orderedUntil = null;
                  equipment.equipment[i].available = "true";
                  var json = JSON.stringify(equipment);
                  fs.writeFile("./equipment/equipment.json", json, 'utf8', function(err, data) {
                    if (err) throw err;
                  });
                }
              }
            });
            for (i in obj.user) {
              obj.user[i].id = i;
            }
            var json = JSON.stringify(obj);
            fs.writeFile(dataFile, json, 'utf8', function(err, data) {
              if (err) throw err;
            });
            res.send("DELETE");
          });
        });

    router.get("/:id/orders", function(req, res) {
      fs.readFile("./equipment/equipment.json", "utf8", function(err, data) {
        if (err) throw err;

        var obj = JSON.parse(data);
        var resJson = {
          "orders": []
        };
        for (i in obj.equipment) {
          if (obj.equipment[i].orderedBy == req.params.id) resJson.orders.push(obj.equipment[i]);
        }
        res.json(resJson);
      });

      //TODO in equipment.json nach "orderedBy" id suchen entsprechend req.params.id
    });

    module.exports = router;
