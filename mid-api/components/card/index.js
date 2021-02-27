const express = require('express');
const router = express.Router();

const cardController = require('./cardController');

/* GET boards listing. */

router.get('/',cardController.getAllCardType);

router.post('/add',cardController.addCard);

router.post('/delete',cardController.deleteCard);

router.post('/edit',cardController.editCard);

module.exports = router;