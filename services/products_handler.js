const path = require('path');
const connection = require('../services/db_config');

let products;

const setProduct = (rows) => {
    products = rows;
    console.log(products);
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

function getItem(req, res) {
    console.log(req.query);
    let idx = req.query.id;
    let result = products.find(({ id }) => id == idx);
    res.render('item', { result });
}

module.exports = { ajaxProducts, getItem };
