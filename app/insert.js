const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
function insertDocument(Model, data, response){
    console.log('inside insertDocument');
    let newDocument = new Model(data);
    newDocument.save(function(err, newDocument){
        if(err) console.log(err);
        response.send('Successful Save');
    });
}
module.exports = {insertDocument};