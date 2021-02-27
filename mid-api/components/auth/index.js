const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authController = require('./authController');
const passPort = require('../../services/passport');

/* GET boards listing. */

router.post('/signin',passPort.authenticate('local', { session: false }),authController.signIn);

router.post('/signup',authController.signUp);

router.post('/edit',passPort.authenticate('jwt', { session: false }),authController.updateUser);

router.post('/google',authController.signInGoogle);

router.post('/facebook',authController.signInFacebook);

module.exports = router;