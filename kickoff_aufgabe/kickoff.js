var fs = require('fs');

fs.readFile("staedte.json",'utf8', function(err,data) {
if(err){
  throw err;
  }
var JsonArr = JSON.parse(data);
  for (i in JsonArr.cities){
      console.log('\n','name: ',JsonArr.cities[i].name
                  ,'\n','country: ',JsonArr.cities[i].country
                  ,'\n','population: ',JsonArr.cities[i].population
                  ,'\n','\n','-------------');
  }
});;
