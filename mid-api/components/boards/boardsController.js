const boardsService = require('./boardsService');

module.exports.getAllBoards = async (req, res, next) => {
    let value;
    try {
        console.log("đã vô");
        value = await boardsService.getBoardsById(req.query.user);
        
    } catch (error) {
        next(error)
    }
    res.send(value);
}
module.exports.addBoard = async (req, res, next) => {
    try {
        const board=await boardsService.createBoardByIdUser(req.body.user_id,req.body.name);
        console.log(board);
        res.json({message:"200OK", board});
    } catch (error) {
        res.status(401).json({message:"errors",error:error});
    }
}
module.exports.deleteBoard = async (req, res, next) => {
    try {
        console.log("user id: "+req.body.user_id);
        console.log("id: "+req.body.id);
        await boardsService.deleteBoard(req.body.id);
        const boards = await boardsService.getBoardsById(req.body.user_id); 
        console.log(boards);
        res.json({message:"200OK", boards: boards});
    } catch (error) {
        res.status(401).json({message:"errors",error:error});
    }
}
module.exports.editBoard = async (req, res, next) => {
    try {
        await boardsService.editBoard(req.body.id,req.body.name);
        const boards = await boardsService.getBoardsById(req.body.user_id);
        res.json({message:"200OK", boards});
    } catch (error) {
        res.status(401).json({message:"errors",error:error});
    }
}