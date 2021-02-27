const express = require('express');
const router = express.Router();

const boardsController = require('./boardsController');
const passPort = require('../../services/passport');

/* GET boards listing. */

router.get('/',passPort.authenticate('jwt', { session: false }),boardsController.getAllBoards);

router.post('/add',passPort.authenticate('jwt', { session: false }),boardsController.addBoard);

router.post('/delete',passPort.authenticate('jwt', { session: false }),boardsController.deleteBoard);

router.post('/edit',passPort.authenticate('jwt', { session: false }),boardsController.editBoard);

module.exports = router;