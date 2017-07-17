var fs = require("fs");
var chalk = require("chalk");

fs.readFile("staedte.json", function(err, data) {
    
    if (err) throw err;
    
    var obj = JSON.parse(data);
    var x = 0;
    
    obj.cities.sort(function (a, b) {
                    return a.population - b.population;
                    });
    
    fs.writeFile("staedte_sortiert.json", JSON.stringify(obj));
    

    for (x in obj.cities) {
        console.log("name : " + chalk.red(obj.cities[x].name.toString()));
        console.log("country : "+ chalk.green(obj.cities[x].country.toString()));
        console.log("population : "+ chalk.blue(obj.cities[x].population.toString()));  
        console.log("------------------------")
        
    }
    
    
    
    
});

