const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sectionSchema = new Schema({
        name: String,
        label: String,
        available_seats: Number,
        unavailable_seats: Number,
        total_seats: Number
});
module.exports = mongoose.model('section', sectionSchema);