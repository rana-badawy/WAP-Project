const express = require('express');
const path = require('path');
const handler = require('../services/user_handler')

const router = express.Router();

router.post('/login', handler.getUsersMiddleware, handler.login);
router.get('/invalid', handler.loginError);
router.get('/register', handler.register);
router.post('/addAccount', handler.addAccount);
router.get('/logout', handler.logout);

module.exports = router;