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
    
    executeQuery("SELECT * FROM List", [], onQuerySuccess, createErrorLogger("findAll", onError));
}

var clearDone = function (onSuccess, onError) {

    var onQuerySuccess = function (result) {
	    logger.logInfo("Cleared {0} done items", result.rowCount);
        onSuccess();
    };

    executeQuery("DELETE FROM List WHERE done = true", [], onQuerySuccess, createErrorLogger("clearDone", onError));
};

var markAsDone = function (id, onSuccess, onError) {
	var onQuerySuccess = function (result) {
	    logger.logInfo("Marked item {0} as done", id);
        onSuccess();
    };

    executeQuery("UPDATE List SET done = true WHERE id = $1", [id], onQuerySuccess, createErrorLogger("markAsDone", onError));
};

var markAsRemaining = function (id, onSuccess, onError) {
	var onQuerySuccess = function (result) {
	    logger.logInfo("Marked item {0} as remaining", id);
        onSuccess();
    };

    executeQuery("UPDATE List SET done = false WHERE id = $1", [id], onQuerySuccess, createErrorLogger("markAsRemaining", onError));
};

function createErrorLogger (methodName, onError) {
    return function (error) {
	    logger.logError("{0} failed: {1}", methodName, error);

        if (onError)
            onError(error);
    };
}

function executeQuery (queryString, parameters, onSuccess, onError) {

    pg.connect(connectionString(), function(err, client) {
        if (err && onError) {
            onError(err);
            return;
        }

        client.query(queryString, parameters, function(err, result) {

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
    clearDone: clearDone,
    markAsRemaining: markAsRemaining,
    markAsDone: markAsDone
}
