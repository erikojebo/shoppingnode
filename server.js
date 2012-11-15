var pg = require('pg');
console.log("database url: " + process.env.DATABASE_URL);
pg.connect(process.env.DATABASE_URL, function(err, client) {

    if (err) {
        console.log(err);
        return;
    }

    // var query = client.query('SELECT * FROM List');

    // query.on('row', function(row) {
    //     console.log(JSON.stringify(row));
    //});
});


var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
