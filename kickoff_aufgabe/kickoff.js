var fs = require('fs');

fs.readFile("staedte.json",'utf8', function(data) {

  }
var JsonArr = JSON.parse(data);
  for (i in JsonArr.cities){
      console.log('\n','name: ',JsonArr.cities[i].name
                  ,'\n','country: ',JsonArr.cities[i].country
                  ,'\n','population: ',JsonArr.cities[i].population
                  ,'\n','\n','-------------');
  }
});
