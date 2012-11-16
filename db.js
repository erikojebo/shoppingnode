var pg = require('pg');

var findAll = function (success) {

    pg.connect(process.env.DATABASE_URL, function(err, client) {
        var query = client.query('SELECT * FROM List');

        var items = [];

        query.on('row', function(row) {
            items.push(row);
        });

        query.on('end', function(result) {
            console.log("findAll: found " + result.rowCount + " items");
            success(items); 
        });
    });
}

module.exports = {
    findAll: findAll
}
