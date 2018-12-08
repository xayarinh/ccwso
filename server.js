try {
    // Load express app
    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser'); // this will parse the body of request
    const config = require('./app/config.js');
    const insert = require('./app/insert.js');
    const Customer = require('./app/data_model/customer_model.js'); // User Data Model
    const path = require('path');
    const seatRoute = require('./app/routes/seatRoute.js');
    const app = express();
    const port = process.env.PORT || config.APP_PORT || 5000;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, '/public'))); // Return static files from the public directory
    app.use('/api', seatRoute);
    app.listen(port, function () {
        console.log('Node app is running at localhost:' + port);
    });
    app.get('/', function (request, response) {
        response.sendFile('./public/index.html');
    });
} catch(error){
    console.log('error', error);
}
