const cardService = require('./cardService');

module.exports.getAllCardType = async (req, res, next) => {
    let value;
    
    try {
        console.log("đã vô");
        value = await cardService.getCardById(req.query.id,req.query.type);
    } catch (error) {
        next(error)
    }
    res.send(value);
}

module.exports.addCard = async (req, res, next) => {
    let value;
    try {
        const card = await cardService.createCard(req.body.id,req.body.type,req.body.content);
        
        res.json({message:"200OK", card});
        console.log(value);
    } catch (error) {
        res.status(401).json({message:"errors",error:error});
    }
}

module.exports.deleteCard = async (req, res, next) => {
    try {
        await cardService.deleteCard(req.body.id_card);
        const cards = await cardService.getCardById(req.body.id_board,req.body.type);
        console.log(cards);
        res.json({message:"200OK", cards: cards});
    } catch (error) {
        res.status(401).json({message:"errors",error:error});
    }
}

module.exports.editCard = async (req, res, next) =>{
    try {
        await cardService.editCard(req.body.id_card,req.body.content);
        const cards = await cardService.getCardById(req.body.id_board,req.body.type);
        res.json({message:"200OK", cards: cards});
    } catch (error) {
        res.status(401).json({message:"errors",error:error});
    }
}