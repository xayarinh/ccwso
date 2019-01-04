try {
    // Load express app
    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser'); // this will parse the body of request
    const Customer = require('./app/data_model/customer_model.js'); // User Data Model
    const path = require('path');
    const seatRoute = require('./app/routes/seatRoute.js');
    const app = express();
    const dotenv = require('dotenv').config();

    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true}, function(error){
        if(error) console.log('Error connecting to MongoDB', error);
        else console.log('Connected to MongoDB');
    });
    const port = process.env.PORT || 5000;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, '/public'))); // Return static files from the public directory
    app.use('/api', seatRoute);

    app.get('/getPurchaseForm', function (request, response) {
        var seatsParam = request.query.seats;
        if(seatsParam === undefined){
            console.log('undefined 404');
            response.write('ERROR 404');
            return;
        }
        var seatArr = JSON.parse(request.query.seats);
        console.log('seats', seatArr);
        if(seatArr.length < 1){
            console.log('no seat selected');
            response.write('ERROR 404');
        } else {
            var pathname = path.join(__dirname, '/public/purchase_form.html');
            response.sendFile(pathname);
        }
    });
    app.listen(port, function () {
        console.log('Node app is running at localhost:' + port);
    });

} catch(error){
    console.log('error', error);
}
