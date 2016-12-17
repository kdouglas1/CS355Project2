/**
 * Created by kelliedouglas on 11/21/16.
 */
var express = require('express');
var router = express.Router();
var Dogs_dal = require('../model/Dogs_dal.js');
var Breed_dal = require('../model/Breed_dal.js');



// View All breeds
router.get('/all', function(req, res) {
    Breed_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('Breed/BreedViewAll', { 'result':result });
        }
    });

});

// View the breed for the given id
router.get('/', function(req, res){
    if(req.query.Breed_ID == null) {
        res.send('Breed_ID is null');
    }
    else {
        Breed_dal.getById(req.query.Breed_ID, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('Breed/BreedViewById', {'result': result});
            }
        });
    }
});

// Return the add a new breed form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    Dogs_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('Breed/BreedAdd', {'Dogs': result});
        }
    });
});

// insert a shelter record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.Name == null) {
        res.send('Breed Name must be provided.');
    }
    else if(req.query.HairLength == null) {
        res.send('Hair Length must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        Breed_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Breed/all');
            }
        });
    }
});

// Delete a Breed for the given id
router.get('/delete', function(req, res){
    if(req.query.Breed_ID == null) {
        res.send('Breed_ID is null');
    }
    else {
        Breed_dal.delete(req.query.Breed_ID, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Breed/all');
            }
        });
    }


});

router.get('/edit/', function(req, res){
    if(req.query.Breed_ID == null) {
        res.send('Breed_ID is null');
    }
    else {
        res.render('Breed/edit', {'result':req.query.Breed_ID});
    }
});

router.get('/update/', function(req, res) {
    if (req.query.Name == null || req.query.HairLength == null || req.query.Breed_ID == null)
        res.send('These cannot be null. GO BACK to answer yes or no.');
    else {
        Breed_dal.update(req.query, function (err, result) {
            res.redirect(302, '/Breed/all');

        });
    }
});

module.exports = router;
