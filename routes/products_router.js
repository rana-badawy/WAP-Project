const express = require('express');
const path = require('path');
const handler = require('../services/products_handler')

const router = express.Router();

router.get('/ajaxProducts', handler.ajaxProducts);
router.get('/item', handler.getItem);

module.exports = router;