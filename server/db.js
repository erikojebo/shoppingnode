var pg = require('pg');
var logger = require('./logger.js');

var connectionString = function () {
	return process.env.DATABASE_URL;
}

var findAll = function (onSuccess, onError) {

    var onQuerySuccess = function (result) {
        logger.logInfo("findAll found {0} items", result.rowCount)
        onSuccess(result.rows);
    };
    
    executeQuery("SELECT * FROM List", onQuerySuccess, createErrorLogger("findAll", onError));
}

var clearDone = function (onSuccess, onError) {

    var onQuerySuccess = function (result) {
	    logger.logInfo("Cleared {0} done items", result.rowCount);
        onSuccess();
    };

    executeQuery("DELETE FROM List WHERE done = true", onQuerySuccess, createErrorLogger("clearDone", onError));
};

function createErrorLogger (methodName, onError) {
    return function (error) {
	    logger.logError("{0} failed: {1}", methodName, error);

        if (onError)
            onError(error);
    };
}

function executeQuery (queryString, onSuccess, onError) {

    pg.connect(connectionString(), function(err, client) {
        if (err && onError) {
            onError(err);
            return;
        }

        client.query(queryString, function(err, result) {

            if (err && onError) {
                onError(err);
                return;
            }

            onSuccess(result);
        });
    });
}

module.exports = {
    findAll: findAll,
    clearDone: clearDone
}
