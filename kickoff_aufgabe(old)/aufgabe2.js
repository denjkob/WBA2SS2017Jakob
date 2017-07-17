var	fs	=	require('fs');

// npm install chalk
// require like import in java
var chalk	=	require('chalk');

fs.readFile("staedte.json", "utf8",	function(err,data)	{

  if (err) throw err;



  var obj = JSON.parse(data);

// chalk.farbe to make it look like a fag.
  for (arraynumber in obj.cities)
  console.log(chalk.yellow('\n','name: ',obj.cities[arraynumber].name)
              ,chalk.blue('\n','country: ',obj.cities[arraynumber].country)
              ,'\n','population: ',obj.cities[arraynumber].population
              ,'\n','\n','-------------');

	});

  //npm init
  //macht dir die package.json datei
  //da steht auch was fuer packages benutzt wurde bsp. chalk
