console.log("Starting...");

var pg = require('pg');
var fs = require('fs');

if (process.env.ENVIRONMENT === "development") {
    console.log("dev environment detected");
}

var foo = "";

pg.connect(process.env.DATABASE_URL, function(err, client) {

    if (err) {
        foo += err;
        return;
    }
    
    var query = client.query('SELECT * FROM List');

    query.on('row', function(row) {
        foo += JSON.stringify(row);
    });
});

var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function (request, response) {
    fs.readFile('./list.html', function(error, content) {
        if (error) {
            response.writeHead(500);
            response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(content, 'utf-8');
        }
    });
});

app.get('/list.css', function (request, response) {
    fs.readFile('./list.css', function(error, content) {
        if (error) {
            response.writeHead(500);
            response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.end(content, 'utf-8');
        }
    });
});

app.get('/list.js', function (request, response) {
    fs.readFile('./list.js', function(error, content) {
        if (error) {
            response.writeHead(500);
            response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type': 'text/javascript' });
            response.end(content, 'utf-8');
        }
    });
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});
