const path = require('path');

const connection = require('./db_config');

let cartItems = [];
let total = 0;

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
        total = 0;
        for (let item of cartItems) {
            total += item.price*item.quantity;
        }

        next();
    });
}


function cart(req, res, next) {
    res.render('cart', {items: cartItems, total: total});
}

function checkout(req, res, next) {
    res.sendFile(path.join(__dirname, "../views", "order.html"));
}

function addQuantity(req, res, next) {
    let item_id = req.params.id;
    let item = cartItems.filter((i) => i.item_id == item_id)[0];

    if (item.quantity_available > item.quantity) {
        item.quantity++;

        let query = "update item set quantity = quantity+1 where item_id = " + item_id;

        connection.query(query,
            function (err, result) {
                if (err) {
                    console.log('Error executing the query - ${err}');
                }
                else {
                    console.log('item updated successfully');
                }
            }
        );
    }

    getCartMiddleware(req, res, next);

    res.send({items: cartItems});
}

function removeQuantity(req, res, next) {
    let item_id = req.params.id;
    let item = cartItems.filter((i) => i.item_id == item_id)[0];

    if (item.quantity > 1) {
        item.quantity--;

        let query = "update item set quantity = quantity-1 where item_id = " + item_id;

        connection.query(query,
            function (err, result) {
                if (err) {
                    console.log('Error executing the query - ${err}');
                }
                else {
                    console.log('item updated successfully');
                }
            }
        );
    }

    else {
        let query = "delete from item where item_id = " + item_id;

        connection.query(query,
            function (err, result) {
                if (err) {
                    console.log('Error executing the query - ${err}');
                }
                else {
                    console.log('item updated successfully');
                }
            }
        );
    }

    getCartMiddleware(req, res, next);

    res.send({items: cartItems});
}

function deleteItem(req, res, next) {
    let item_id = req.params.id;
    let query = "delete from item where item_id = " + item_id;

    connection.query(query,
        function (err, result) {
            if (err) {
                console.log('Error executing the query - ${err}');
            }
            else {
                console.log('item deleted successfully');
            }
        }
    );

    res.redirect('/cart');
}

module.exports = {cart, getCartMiddleware, checkout, addQuantity, removeQuantity, deleteItem};