var	fs	=	require('fs');
var chalk	=	require('chalk');

fs.readFile("staedte.json", "utf8",	function(err,data)	{

  if (err) throw err;

  var obj = JSON.parse(data);

//sortfunktion hier

obj.cities.sort(function (a,b) {

  for (arraynumber in obj.cities) {

    var popa= a.population, popb = b.population;

    if (popa < popb)

    return -1;

    if (popa > popb)
    return 1;

    return 0;

  }
 }
);




// fs.writeFile("staedte_sortiert", data ) {
//
// console.log(' alles gut ');
// });




  for (arraynumber in obj.cities)
  console.log(chalk.yellow('\n','name: ',obj.cities[arraynumber].name)
              ,chalk.blue('\n','country: ',obj.cities[arraynumber].country)
              ,'\n','population: ',obj.cities[arraynumber].population
              ,'\n','\n','-------------');

	});
