//example only, not working
var http = require("http");
var faye = require("faye");

//Server
var server = http.createServer();

//node Adapter
var fayeservice = new faye.NodeAdapter({
  mount: "/faye",
  timeout: 45
});

fayeservice.attach(server);
server.listen(8000);
