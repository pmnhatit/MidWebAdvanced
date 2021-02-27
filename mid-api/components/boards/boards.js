const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var listboardschema = new mongoose.Schema({
    user_id: String,
    name: String
},
    {
        collection: 'list-board'
    });

const listboard = db.useDb("mid-web-advanced").model("list-board", listboardschema);

module.exports = listboard;