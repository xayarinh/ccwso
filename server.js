try {
    // Load express app
    const express = require('express');
    const path = require('path');
    const app = express();

    app.set('port', (process.env.PORT || 5000)); // set the port

    app.get('/', function (request, response) {
        response.sendFile(path.join(__dirname + '/index.html'));
    });

    app.listen(app.get('port'), function () {
        console.log("Node app is running at localhost:" + app.get('port'));
    });
} catch(error){
    console.log('error', error);
}

