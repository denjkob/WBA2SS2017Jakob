var imdb = require('imdb-node-api');

imdb.search({keyword: 'scarface', category: 'movie'}, function (err, data) {
    console.error("error: " + err);
    console.log("Results: " + data);
});
