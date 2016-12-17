var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Shelter;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(resume_id, callback) {
    var query = 'SELECT * FROM Shelter WHERE ShelterID = ?';
    var queryData = [ShelterID];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });

};

    exports.insert = function(params, callback) {
        var query = 'INSERT INTO Shelter (SName, Street, Zip) VALUES (?, ?, ?)';

        // the question marks in the sql query above will be replaced by the values of the
        // the data in queryData
        var queryData = [params.SName, params.Street, params.Zip];

        connection.query(query, queryData, function (err, result) {
            callback(err, result);
        });

    };

    exports.delete = function(ShelterID, callback) {
        var query = 'DELETE FROM Shelter WHERE ShelterID = ?';
        var queryData = [ShelterID];

        connection.query(query, queryData, function(err, result) {
            callback(err, result);
        });

};

exports.update = function(params, callback) {
    var query = 'UPDATE Shelter set SName = ?, Street = ?, Zip = ? where ShelterID = ?';
    var queryData = [params.SName, params.Street, params.City, params.ShelterID];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

