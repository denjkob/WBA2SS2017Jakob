var faye = require("faye");

var client = new faye.Client("http://localhost:7070/faye");
client.subscribe('/messages', function(message) {
  alert('Got a message: ' + message.text);
});
client.connect();
