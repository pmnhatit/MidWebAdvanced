const cardModel = require('./card');

module.exports.getCardById = async (id, type) =>{
    const result = await cardModel.find({'id_board': id, 'type': type});
    return result;
}

module.exports.createCard = async (id, type, content) => {
    const newCard = new cardModel({id_board: id, type: type, content: content});
    return newCard.save();
} 

module.exports.deleteCard = async (id) =>{
    await cardModel.findOneAndDelete({'_id': id});
}

module.exports.deleteAllCardByIDBoard = async(id)=>{
    await cardModel.deleteMany({id_board:id});
}

module.exports.editCard = async (id, content) =>{
    const result = await cardModel.updateOne({ '_id': id }, { $set: { 'content': content} }, (err, doc) => {
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    });
}