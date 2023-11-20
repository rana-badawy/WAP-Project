const mysql = require('mysql');

//database connection

// Connecting to database admin123
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
//flush privileges;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    //password: "admin123",
    password: "admin",
    database: "e_commerce"
});

connection.connect(function (err) {
    if (err) {
        console.log("Error in the connection")
        console.log(err)
    }
    else {
        console.log('Database Connected');
    }
});

module.exports = connection;

// let output;
// let products;

// connection.query('select * from users', //['admin'],
//     function (err, result) {
//         if (err) {
//             console.log('Error executing the query - ${err}')
//         }
//         else {
//             console.log("Result: ", result);
//             setOutput(result);
//         }
// });

// connection.query('select * from product', //['admin'],
//     function (err, result) {
//         if (err) {
//             console.log('Error executing the query - ${err}')
//         }
//         else {
//             console.log("Result: ", result);
//             setProduct(result);
//         }
// });

// const setOutput = (rows) => {
//     output = rows;
//     console.log(output);
// }

// const setProduct = (rows) => {
//     products = rows;
//     console.log(products);
// }