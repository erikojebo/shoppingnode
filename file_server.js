var fs = require('fs');

var contentTypes = {
    "js" : "text/javascript",
    "css" : "text/css",
    "html" : "text/html"
}

var getContentType = function (path) {
	var parts = path.split('.');
    var extension = parts[parts.lenght - 1];
    return contentTypes[extension];
}

var serveFile = function (path, request, response) {
    fs.readFile(path, function(error, content) {
        if (error) {
            response.writeHead(500);
            response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type': getContentType(path) });
            response.end(content, 'utf-8');
        }
    });
}

module.exports = {
    serve: serveFile
}
