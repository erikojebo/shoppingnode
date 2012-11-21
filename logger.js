var fs = require('fs');

var logError = function (message) {
    logMessage(message, "ERROR");
}

var logInfo = function (message) {
    logMessage(message, "INFO");
}

var logMessage = function (message, label) {
    var logMessage = createMessage(message, label);

	console.log(logMessage);

    fs.appendFile("./app.log", logMessage + "\n");
}


var createMessage = function (message, label) {
	var date = new Date();
    return date.toISOString() + " " + label + ": " + message;
}

module.exports = {
    logError: logError,
    logInfo: logInfo
};
