const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


router.get('/auth', authController.login);
// router.get('/', userController.login);


module.exports = router;
