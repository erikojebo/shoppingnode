function addFileRoute(requestedPath, actualPath) {
	var filePath = actualPath || '.' + requestedPath;
    app.get(requestedPath, function (request, response) {
	    fileServer.serve(filePath, request, response);
    });
}

console.log("Starting...");

var pg = require('pg');
var fs = require('fs');

if (process.env.ENVIRONMENT === "development") {
    console.log("dev environment detected");
}

var items = [];

pg.connect(process.env.DATABASE_URL, function(err, client) {
    var query = client.query('SELECT * FROM List');

    query.on('row', function(row) {
        items.push(row);
    });
});

var express = require('express');
var fileServer = require('./file_server.js');
var app = express.createServer(express.logger());

addFileRoute('/', './list.html');
addFileRoute('/list.js');
addFileRoute('/list.css');
app.get('/items', function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json'});
    var content = JSON.stringify(items);
    response.end(content, 'utf-8');
})

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});
