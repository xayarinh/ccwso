/**
 * This file generates the Customer Schema
 * Properties:
 *  1. firstName  @String
 *  2. lastName   @String
 *
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    first_name: String,
    last_name: String
});
module.exports = mongoose.model('customer', customerSchema);