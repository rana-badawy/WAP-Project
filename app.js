const express = require("express");
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");

const userRouter = require('./routes/user_router');
const cartRouter = require('./routes/cart_router');

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
    database: "e_commerce"
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
                    //console.log("Result: ", result);
                    setOutput(result);
                }

            });
            connection.query('select * from product', //['admin'],
            function (err, result) {
                if (err) {
                    console.log('Error executing the query - ${err}')
                }
                else {
                   // console.log("Result: ", result);
                    setProduct(result);
                }

            });
    }
});

app.get('/', function (req, res, next) {
    res.cookie('email', '');
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.use(userRouter);
app.use(cartRouter);


// app.post('/', function (req, res, next) {
//     console.log(req.body);
//     let username = req.body.email;
//     let pass = req.body.password;
//     let auth = false;
//     console.log(output);
//     for(let obj of output){
//         if(obj.name == username && obj.password == pass){
//             auth = true;
//         }
//     }
//     if(auth){
//         res.render('products', {products});
//     }else{
//         res.sendFile(path.join(__dirname, "views", "login.html"));
//     }
// });

app.get('/ajaxProducts',function(req,res){
    res.send({products})
})
