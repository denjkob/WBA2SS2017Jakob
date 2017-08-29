var faye = require("faye");
var prompt = require("prompt")

var client = new faye.Client("http://localhost:8000/faye");
console.log("Faye Client started! Subscribe to a channel please. (/messages)");
prompt.start();
prompt.get(['channel'], function (err, result) {
  client.subscribe(result.channel, function(message) {
    console.log('Got a message: ' + message.text);
  });
  client.connect();
    console.log('Subscribed to:');
    console.log('channel:' + result.channel);
  });
