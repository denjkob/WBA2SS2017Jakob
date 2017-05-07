var fs = require("fs");
fs.readFile("staedte.json", function(err, data) {
    
    if (err) throw err;
    
    var obj = JSON.parse(data);
    var x = 0;
    
    for (x in obj.cities) {
        console.log("name : " + obj.cities[x].name.toString());
        console.log("country : "+obj.cities[x].country.toString());
        console.log("population : "+obj.cities[x].population.toString());  
        console.log("------------------------")
        
    }
    
    
    
    
});