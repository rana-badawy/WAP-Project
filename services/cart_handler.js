const path = require('path');

const connection = require('./db_config');

let cartItems = [];

async function getCartAsync(user_id) {
    let query = "select temp.cart_id, temp.item_id, " +
    "product.product_id, product.product_name, product.quantity_available, product.price, product.img, temp.quantity from product " +
    "inner join (select cart.cart_id, item.item_id, item.product_id, item.quantity from cart inner join item " +
    "on cart.cart_id = item.cart_id where user_id = '" + user_id + "') as temp on temp.product_id = product.product_id;"

    return new Promise((resolve) => {
        connection.query(query,
            function (err, result) {
                if (err) {
                    console.log('Error executing the query - ${err}')
                }
                else {
                    resolve(JSON.parse(JSON.stringify(result)));
                }
            }
        );
    });
}

function getCartMiddleware(req, res, next){
    getCartAsync(req.cookies.user).then((val) => {
        cartItems = val;
        next();
    });
}


function cart(req, res, next) {
    res.render('cart', {items: cartItems});
}

function checkout(req, res, next) {
    res.sendFile(path.join(__dirname, "../views", "order.html"));
}

module.exports = {cart, getCartMiddleware, checkout};