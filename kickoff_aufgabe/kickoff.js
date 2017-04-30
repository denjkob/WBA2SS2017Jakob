var fs = require('fs');

var content;
fs.readFile("staedte.json",'utf8', function(err,data) {
if(err){
  throw err;
  }
  console.log(JSON.stringify(data));
});;
