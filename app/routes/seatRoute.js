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

// router.route('/getPurchaseForm/').get(function(req, res){
//     var url = path.join(__dirname + '../../../public/purchase_form.html');
//     console.log(url);
//     res.sendFile(path.resolve(url));
//
// });


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
        Seat.find({'section': sectionId}).sort({label: '1'}).exec(function(error, seats){
            if(error) console.log('ERROR: Could net retrieve seats!', error);
            res.json(seats);
        });
    });
}
