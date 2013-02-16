function addFileRoute(requestedPath, actualPath) {
	var filePath = actualPath || '.' + requestedPath;
    app.get(requestedPath, function (request, response) {
	    fileServer.serve(filePath, request, response);
    });
}

require('./extensions.js')
var logger = require('./logger.js');
var express = require('express');
var connect = require('connect');
var fileServer = require('./file_server.js');
var db = require('./db.js');

var app = express.createServer(express.logger());

logger.logInfo("Starting server...");

if (process.env.ENVIRONMENT === "development") {
    logger.logInfo("Dev environment detected");
}



app.use('/images', express.static(__dirname + '/../client/images'));
app.use('/fonts', express.static(__dirname + '/../client/fonts'));
app.use('/lib', express.static(__dirname + '/../client/lib'));
app.use(express.static(__dirname + '/../client'));

app.use(express.bodyParser())
app.use(express.logger());

// Make sure this is done after the bodyParser middleware is set up
// since this call initializes the routing, and the bodyParser must
// be set up before that.
addFileRoute('/', __dirname + '/../client/list.html');

app.get('/items', function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json'});
    db.findAll(function (items) {
        var content = JSON.stringify(items);
        response.end(content, 'utf-8');
    });
});

app.post('/cleardone', function (request, response) {
    db.clearDone(function () {
	    response.writeHead(200);
        response.end();	    
    });
});

app.post('/markasdone', function (request, response) {
    db.markAsDone(request.body.id, function () {
	    response.writeHead(200);
        response.end();	    
    });
});

app.post('/markasremaining', function (request, response) {
    db.markAsRemaining(request.body.id, function () {
	    response.writeHead(200);
        response.end();	    
    });
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
    logger.logInfo("Listening on port: " + port);
});
