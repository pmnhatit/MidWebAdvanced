const boardsModel = require('./boards');
const cardService = require('../card/cardService');

// module.exports.getAllBoards = async () =>{
//     const result = await boardsModel.find({});
//     console.log(result);
//     return result;
// }

module.exports.getBoardsById = async (id) =>{
    const result = await boardsModel.find({user_id: id});
    return result;
}

module.exports.createBoardByIdUser = async (id, name) => {
    const newBoard = new boardsModel({user_id: id, name: name});
    return newBoard.save();
} 

module.exports.deleteBoard = async (id) =>{
    await cardService.deleteAllCardByIDBoard(id);
    await boardsModel.findOneAndDelete({'_id': id});
}

module.exports.editBoard = async (id, name) => {
    const result = await boardsModel.updateOne({ '_id': id }, { $set: { 'name': name} }, (err, doc) => {
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    });
}