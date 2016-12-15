var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Dogs;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(DogID, callback) {
    var query = 'SELECT * FROM Dogs WHERE DogID = ?';
    var queryData = [DogID];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

    exports.insert = function(params, callback) {
        var query = 'INSERT INTO Dogs (DName, Sex, Birthdate) VALUES (?, ?, ?)';

        // the question marks in the sql query above will be replaced by the values of the
        // the data in queryData
        var queryData = [params.DName, params.Sex, params.Birthdate];

        connection.query(query, queryData, function(err, result) {
            callback(err, result);
        });

    }

    exports.delete = function(DogID, callback) {
        var query = 'DELETE FROM Dogs WHERE DogID = ?';
        var queryData = [DogID];

        connection.query(query, queryData, function(err, result) {
            callback(err, result);
        });


};