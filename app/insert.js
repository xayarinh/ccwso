const mongoose = require('mongoose');
const config = require('./config.js');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB_URL, { useNewUrlParser: true });
function insertDocument(Model, data, response){
    console.log('inside insertDocument');
    let newDocument = new Model(data);
    newDocument.save(function(err, newDocument){
        if(err) console.log(err);
        response.send('Successful Save');
    });
}
module.exports = {insertDocument};