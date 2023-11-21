const path = require('path');
const connection = require('../services/db_config');

let products;

const setProduct = (rows) => {
    products = rows;
    //console.log(products);
}

connection.query('select * from product', //['admin'],
    function (err, result) {
        if (err) {
            console.log('Error executing the query - ${err}')
        }
        else {
            setProduct(result);
        }

    });

function ajaxProducts(req, res) {
    return res.send({ products })
}

function ajaxAdd(req, res) {
    let user = req.cookies.user;
    let product = req.query.product_id;
    let response='';
    connection.query('insert into item(cart_id, product_id, quantity) values(?,?,?)', [user, product, 1],
    function (err, result) {
        if (err) {
            console.log('Error executing the query - ${err}'+err);
        }
        else {
            console.log(result);
        }
    });
    response = "Success.";
    return res.send({ response })
}

function getItem(req, res) {
    console.log(req.query);
    let idx = req.query.id;
    let result = products.find(({ product_id }) => product_id == idx);
    res.render('item', { result });
}

function getProducts(req, res, next) {
    res.sendFile(path.join(__dirname, '../views', 'products.html'));
}

module.exports = { ajaxProducts, getItem, getProducts, ajaxAdd};
