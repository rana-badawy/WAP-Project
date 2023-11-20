const express = require("express");
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");

const userRouter = require('./routes/user_router');
const cartRouter = require('./routes/cart_router');
const productRouter = require('./routes/products_router');

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

app.get('/', function (req, res, next) {
    res.cookie('email', '');
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.use(userRouter);
app.use(cartRouter);
app.use(productRouter);