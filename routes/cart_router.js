const express = require('express');
const user_handler = require('../services/user_handler')
const cart_handler = require('../services/cart_handler')

const router = express.Router();

router.get('/cart', user_handler.verify, cart_handler.getCartMiddleware, cart_handler.cart);
router.get('/checkout', cart_handler.checkout);
router.post('/cart/add/:id', cart_handler.addQuantity);

module.exports = router;