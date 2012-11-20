var pg = require('pg');

var connectionString = function () {
	return process.env.DATABASE_URL;
}

var findAll = function (onSuccess, onError) {

    var onQuerySuccess = function (result) {
	    console.log("findAll found %d items",result.rowCount);
        onSuccess(result.rows);
    };

    executeQuery("SELECT * FROM List", onQuerySuccess, onError);
}

var clearDone = function (onSuccess, onError) {
    pg.connect(connectionString(), function(err, client) {
        if (err) {
            onError(err);
            return;
        }

        client.query("DELETE FROM List WHERE done = true", function(err, result) {

            if (err) {
                onError(error);
                return;
            }

            console.log("Cleared %d done items",result.rowCount);
            onSuccess();
        });
    });
};

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
