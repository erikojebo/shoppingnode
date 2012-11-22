var fs = require('fs');

var logError = function (format) {
    logMessage("ERROR", format, [].splice.call(arguments, 1));
}

var logInfo = function (format) {
    logMessage("INFO", format, [].splice.call(arguments, 1));
}

var logMessage = function (label, format, params) {
    var logMessage = createMessage(label, format, params);

	console.log(logMessage);

    fs.appendFile("./app.log", logMessage + "\n");
}

var createMessage = function (label, format, params) {
    var message = format.format.apply(format, params);
	var date = new Date();
    return date.toISOString() + " " + label + ": " + message;
}

module.exports = {
    logError: logError,
    logInfo: logInfo
};
