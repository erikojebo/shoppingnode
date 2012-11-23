function addFileRoute(requestedPath, actualPath) {
	var filePath = actualPath || '.' + requestedPath;
    app.get(requestedPath, function (request, response) {
	    fileServer.serve(filePath, request, response);
    });
}

require('./extensions.js')
var logger = require('./logger.js');
var express = require('express');
var fileServer = require('./file_server.js');
var db = require('./db.js');
var app = express.createServer(express.logger());

logger.logInfo("Starting server...");

if (process.env.ENVIRONMENT === "development") {
    logger.logInfo("Dev environment detected");
}

addFileRoute('/', './list.html');
addFileRoute('/list.js');
addFileRoute('/list.css');
addFileRoute('/lib/underscore-min.js');
addFileRoute('/lib/jquery-1.8.3.min.js');
addFileRoute('/lib/knockout-2.2.0.js');
addFileRoute('/fonts/metrophobic/metrophobic.ttf');
addFileRoute('/fonts/sanchez/regular.ttf');
addFileRoute('/images/delete.png');
addFileRoute('/images/add.png');
addFileRoute('/images/metro_add_128.png');
addFileRoute('/images/metro_delete_128.png');
addFileRoute('/images/favs.png');
addFileRoute('/images/refresh.png');

app.get('/items', function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json'});
    db.findAll(function (items) {
        var content = JSON.stringify(items);
        response.end(content, 'utf-8');
    }, function (error) {
        logger.logError("findAll failed: " + error)
    });
})

var port = process.env.PORT || 5000;

app.listen(port, function() {
    logger.logInfo("Listening on port: " + port);
});
