var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Behavior_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Behavior_ID, callback) {
    var query = 'SELECT * FROM Behavior_view WHERE Behavior_ID = ?';
    var queryData = [Behavior_ID];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
}

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Behavior (Aggressive, Behavior_ID) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Behavior_ID];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(Behavior_ID, callback) {
    var query = 'DELETE FROM Behavior WHERE Behavior_ID = ?';
    var queryData = [Behavior_ID];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};