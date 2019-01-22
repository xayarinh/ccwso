const express = require('express');
const Seat = require('../data_model/seat_model.js');
const Section = require('../data_model/section_model');
const path = require('path');
const router = express.Router();

// ./api/getSeats/
router.route('/getSeats/').get(function(req, res){
    let sectionName = req.query.section_data;
    getSeats(sectionName, res);  // return seats for this section
});

router.route('/submitSeats/').post(function(req, res){
    var selectedSeatsArr = req.body.selectedSeats;
    console.log('selectedSeats ' + selectedSeatsArr.length, selectedSeatsArr);
    submitSeats(selectedSeatsArr, res);
});

module.exports = router;

/**
 * This function returns all seats based on the section name passed to it
 * @param sectionName
 * @returns {Array}
 */
function getSeats(sectionName, res){
    Section.find({name: sectionName}).exec(function (error, section){
        if(error) console.error('ERROR: Could not retrieve section!', error);
        if(section.length > 1) console.error('ERROR: There were more than one section retrieve with ');
        let sectionId = section[0]._id;
        Seat.find({'section': sectionId}).populate('section').sort({label: '1'}).exec(function(error, seats){
            if(error) console.log('ERROR: Could net retrieve seats!', error);
            console.log('seats',seats);
            res.json(seats);
        });
    });
}

function submitSeats(selectedSeatsArr, res){
    // Loop through the selected seats and set available to false
    for(let i = 0; i < selectedSeatsArr.length; i++){
        let seatId = selectedSeatsArr[i]._id;
        Seat.updateOne({_id: seatId}, {$set: {available: false}}, function(error, result){
            if(error) console.log('Error Submitting Seat ' + seatId, error);
            console.log('result', result);
        })
    }
    res.json({error: false});
}

