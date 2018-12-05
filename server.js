// Load express app
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000)); // set the port
//app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.send('Hello World!');
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

