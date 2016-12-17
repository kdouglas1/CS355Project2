var express = require('express');
var router = express.Router();
var Dogs_dal = require('../model/Dogs_dal.js');
var Shelter_dal = require('../model/Shelter_dal.js');


// View All shelters
router.get('/all', function(req, res) {
    Shelter_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('Shelter/ShelterViewAll', { 'result':result });
        }
    });

});

// View the shelter for the given id
router.get('/', function(req, res){
    if(req.query.SName == null) {
        res.send('SName is null');
    }
    else {
        Shelter_dal.getById(req.query.ShelterID, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('Shelter/ShelterViewById', {'result': result});
           }
        });
    }
});

// Return the add a new shelter form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    Dogs_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('Shelter/ShelterAdd', {'Shelter': result});
        }
    });
});

// insert a shelter record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.SName == null) {
        res.send('Shelter Name must be provided.');
    }
    else if(req.query.Street == null) {
        res.send('A Street must be entered');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        Shelter_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Shelter/all');
            }
        });
    }
});

// Delete a shelter for the given ShelterID
router.get('/delete', function(req, res){
    if(req.query.ShelterID == null) {
        res.send('ShelterID is null');
    }
    else {
        Shelter_dal.delete(req.query.ShelterID, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Shelter/all');
            }
        });
    }

});


router.get('/edit/', function(req, res){
    if(req.query.ShelterID == null) {
        res.send('ShelterID is null');
    }
    else {
        res.render('Shelter/edit', {'result':req.query.ShelterID});
    }
});

router.get('/update/', function(req, res) {
    if (req.query.SName == null || req.query.Street == null || req.query.Zip == null || req.query.ShelterID == null)
        res.send('These cannot be null. GO BACK.');
    else {
        Shelter_dal.update(req.query, function (err, result) {
            res.redirect(302, '/Shelter/all');

        });
    }
});

module.exports = router;
