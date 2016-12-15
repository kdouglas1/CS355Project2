var express = require('express');
var router = express.Router();
var Behavior_dal = require('../model/Behavior_dal.js');
var Dogs_dal = require('../model/Dogs_dal.js');


// View All behaviors
router.get('/all', function(req, res) {
    Behavior_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('Behavior/BehaviorViewAll', { 'result':result });
        }
    });

});

// View the behavior for the given id
router.get('/', function(req, res){
    if(req.query.Behavior_ID == null) {
        res.send('Behavior_ID is null');
    }
    else {
        Behavior_dal.getById(req.query.Behavior_ID, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('Behavior/BehaviorViewById', {'result': result});
            }
        });
    }
});

// Return the add a new behavior form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    Behavior_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('Behavior/BehaviorAdd', {'account': result});
        }
    });
});

// insert a Dogs behavior record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.Aggressive == null) {
        res.send('Aggressiveness must be provided.');
    }
    else if(req.query.GetsAlongWithChildren == null) {
        res.send('Behavior toward children must be provided');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        Behavior_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Behavior/all');
            }
        });
    }
});

// Delete a behavior for the given id
router.get('/delete', function(req, res){
    if(req.query.Behavior_ID == null) {
        res.send('Behavior_ID is null');
    }
    else {
        Behavior_dal.delete(req.query.Behavior_ID, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Behavior/all');
            }
        });
    }
});

module.exports = router;

