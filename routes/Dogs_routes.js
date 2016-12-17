/**
 * Created by kelliedouglas on 11/28/16.
 */
var express = require('express');
var router = express.Router();
var Dogs_dal = require('../model/Dogs_dal.js');



// View All dogs
router.get('/all', function(req, res) {
    Dogs_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('Dogs/DogsViewAll', { 'result':result });
        }
    });

});

// View the dog for the given id
router.get('/', function(req, res){
    if(req.query.DogID == null) {
        res.send('DogID is null');
    }
    else {
        Dogs_dal.getById(req.query.DogID, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('Dogs/DogsViewById', {'result': result});
            }
        });
    }
});


// Return the add a new dog form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    Dogs_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('Dogs/DogsAdd', {'Dogs': result});
        }
    });
});

// insert a dog record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.DName == null) {
        res.send('Dog Name must be provided.');
    }
    else if(req.query.sex == null) {
        res.send('A Sex must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        Dogs_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Dogs/all');
            }
        });
    }
});

// Delete a dog for the given DogID
router.get('/delete', function(req, res){
    if(req.query.DogID == null) {
        res.send('DogID is null');
    }
    else {
        Dogs_dal.delete(req.query.DogID, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Dogs/all');
            }
        });
    }

});


router.get('/edit/', function(req, res){
    if(req.query.DogID == null) {
        res.send('DogID is null');
    }
    else {
        res.render('Dogs/edit', {'result':req.query.DogID});
    }
});

router.get('/update/', function(req, res) {
    if (req.query.DName == null || req.query.sex == null || req.query.birthdate == null || req.query.DogID == null)
        res.send('These cannot be null. GO BACK to answer.');
    else {
        Dogs_dal.update(req.query, function (err, result) {
            res.redirect(302, '/Dogs/all');

        });
    }
});
module.exports = router;
