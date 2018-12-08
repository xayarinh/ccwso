const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const seatSchema = new Schema({
    label: String,
    price: Number,
    customer: {type: Schema.Types.ObjectId, ref: 'customer'},
    section: {type: Schema.Types.ObjectId, ref: 'section'},
    available: Boolean,

});
module.exports = mongoose.model('seat', seatSchema);
