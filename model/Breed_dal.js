var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Breed_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Breed_ID, callback) {
    var query = 'SELECT * FROM Breed WHERE Breed_ID = ?';
    var queryData = [Breed_ID];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Breed (Name, Breed_ID) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Name, params.Breed_ID];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(Breed_ID, callback) {
    var query = 'DELETE FROM Breed WHERE Breed_ID = ?';
    var queryData = [Breed_ID];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE Breed set Name = ?, HairLength = ? where Breed_ID = ?';
    var queryData = [params.Name, params.HairLength, params.Breed_ID];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};