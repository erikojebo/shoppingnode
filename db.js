var pg = require('pg');

var connectionString = function () {
	return process.env.DATABASE_URL;
}

var findAll = function (onSuccess, onError) {

    pg.connect(connectionString(), function(err, client) {
        if (err && onError) {
            onError(err);
            return;
        }

        client.query("SELECT * FROM List", function(err, result) {

            if (err && onError) {
                onError(err);
                return;
            }

            console.log("findAll found %d items",result.rowCount);
            onSuccess(result.rows);
        });
    });
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

module.exports = {
    findAll: findAll,
    clearDone: clearDone
}
