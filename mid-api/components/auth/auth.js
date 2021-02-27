const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var userchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    phone: String
},
    {
        collection: 'user'
    });

const user = db.useDb("mid-web-advanced").model("user", userchema);

module.exports = user;