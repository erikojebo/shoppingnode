var fs = require('fs');

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
            console.log("Error serving file: " + path + "(" + error + ")");
            response.writeHead(500);
            response.end();
        }
        else {
            console.log("Serving file: " + path);
            console.log("Content type:" + getContentType(path));
            response.writeHead(200, { 'Content-Type': getContentType(path) });
            response.end(content, 'utf-8');
        }
    });
}

module.exports = {
    serve: serveFile
}
