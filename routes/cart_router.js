const express = require('express');
const path = require('path');
const handler = require('../services/cart_handler')

const router = express.Router();

router.get('/cart', handler.getCart);

module.exports = router;