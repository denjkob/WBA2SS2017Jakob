var fs = require("fs");
var chalk = require("chalk");

fs.readFile("staedte.json", function(err, data) {
    
    if (err) throw err;
    
    var obj = JSON.parse(data);
    var x = 0;
    
    for (x in obj.cities) {
        console.log("name : " + chalk.red(obj.cities[x].name.toString()));
        console.log("country : "+ chalk.green(obj.cities[x].country.toString()));
        console.log("population : "+ chalk.blue(obj.cities[x].population.toString()));  
        console.log("------------------------")
        
    }
    
    
});