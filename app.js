const express = require("express");
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

app.listen(4000, function () {
    console.log(" Your server started listening");
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use('/stylesheets', express.static(path.join(__dirname, "stylesheets")));