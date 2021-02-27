const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var listcardchema = new mongoose.Schema({
    id_board: String,
    type: String,
    content: String
},
    {
        collection: 'list-card'
    });

const listcard = db.useDb("mid-web-advanced").model("list-card", listcardchema);

module.exports = listcard;