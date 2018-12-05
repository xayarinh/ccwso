const express = require('express');
const path = require('path');
const app = express();


app.get('/', function(req, res){
    res.sendFile('/index.html/');

    app.listen(4000, function(){
        console.log('Your node js server is running');
    });

});
