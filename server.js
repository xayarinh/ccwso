// const express = require('express');
// const path = require('path');
// const app = express();
//
//
// app.get('/', function(req, res){
//     res.sendFile('/index.html/');
//
//     app.listen(4000, function(){
//         console.log('Your node js server is running');
//     });
//
// });


var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.send('Hello World!');
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

