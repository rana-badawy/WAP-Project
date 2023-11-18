const express = require("express");
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");
const mysql = require('mysql');

const app = express();

app.listen(80, function () {
    console.log(" Your server started listening");
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use('/stylesheets', express.static(path.join(__dirname, "stylesheets")));

//database connection

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "admin123",
    database: "mysql"
});

// Connecting to database admin123
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
//flush privileges;
connection.connect(function (err) {
    if (err) {
        console.log("Error in the connection")
        console.log(err)
    }
    else {
        console.log('Database Connected');
        connection.query('select * from users', //['admin'],
            function (err, result) {
                if (err) {
                    console.log('Error executing the query - ${err}')
                }
                else {
                    console.log("Result: ", result);
                    setOutput(result);
                }

            });
    }
});

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

let output;

const setOutput = (rows) => {
    output = rows;
    console.log(output);
}

function getColour(username, roomCount) {
    return new Promise((resolve, reject) => {
        connection.query(
            "select * from users where name = ?",
            [username],
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

app.post('/', function (req, res, next) {
    console.log(req.body);
    let username = req.body.username;
    let pass = req.body.password;
    //console.log(output);
    if(username == "admin" && pass == "admin123"){
        //res.sendFile(path.join(__dirname, "views", "products.html"));
        res.render('products', {output});
    }else{
        res.sendFile(path.join(__dirname, "views", "login.html"));
    }
});
