//const dotenv = require('dotenv').config();
let GET_SEAT_URL = 'http://localhost:5000/api/getSeats/';
console.log('proces',process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production'){
   GET_SEAT_URL = 'https://ccwso.herokuapp.com/api/getSeats/';
}

module.exports = {GET_SEAT_URL};