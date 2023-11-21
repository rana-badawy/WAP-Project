const express = require('express');
const user_handler = require('../services/user_handler')
const cart_handler = require('../services/cart_handler')

const router = express.Router();

router.get('/cart', user_handler.verify, cart_handler.getCartMiddleware, cart_handler.cart);
router.get('/checkout', cart_handler.checkout);
router.get('/cart/add/:id', cart_handler.addQuantity);
router.get('/cart/remove/:id', cart_handler.removeQuantity);
router.get('/cart/delete/:id', cart_handler.deleteItem);

module.exports = router;