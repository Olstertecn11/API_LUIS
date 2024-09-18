
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/client', authController.login);

router.post('/logout', authController.logout);

module.exports = router;



