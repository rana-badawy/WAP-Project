const express = require('express');
const path = require('path');
const user_handler = require('../services/user_handler');
const handler = require('../services/products_handler');

const router = express.Router();

router.get('/products', user_handler.verify, handler.getProducts);
router.get('/ajaxProducts', handler.ajaxProducts);
router.get('/item', handler.getItem);
router.get('/ajaxAdd', handler.ajaxAdd);

module.exports = router;