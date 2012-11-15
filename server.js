var pg = require('pg');

var foo = "";

pg.connect(process.env.DATABASE_URL, function(err, client) {

    if (err) {
        foo = err;
        return;
    }

    var query = client.query('SELECT * FROM List');

    query.on('row', function(row) {
        foo = JSON.stringify(row);
    });
});

var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
    response.send('db: ' + process.env.DATABASE_URL);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port + ", foo: " + foo);
});
