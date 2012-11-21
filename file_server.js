var fs = require('fs');
var logger = require('./logger.js');

var contentTypes = {
    "js" : "text/javascript",
    "css" : "text/css",
    "html" : "text/html",
    "ttf" : "application/octet-stream"
}

var getContentType = function (path) {
	var parts = path.split('.');
    var extension = parts[parts.length - 1];
    return contentTypes[extension];
}

var serveFile = function (path, request, response) {
    fs.readFile(path, function(error, content) {
        if (error) {
            logger.logInfo("Error serving file: {0} ({1})".format(path, error));
            response.writeHead(500);
            response.end();
        }
        else {
            logger.logInfo("Serving file: " + path);
            logger.logInfo("Content type:" + getContentType(path));
            response.writeHead(200, { 'Content-Type': getContentType(path) });
            response.end(content, 'utf-8');
        }
    });
}

module.exports = {
    serve: serveFile
}
