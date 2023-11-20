const path = require('path');
const connection = require('./db_config');

let users = [];

connection.query('select * from users',
    function (err, result) {
        if (err) {
            console.log('Error executing the query - ${err}')
        }
        else {
            users = JSON.parse(JSON.stringify(result));
        }
});

function verify(req, res, next) {
    if (req.cookies.email) {
        next();
    }
    else {
        res.redirect('/');
    }
}

function authenticate(email, password) {
    let isFound = false;

    for (let user of users) {
        if (user.email == email && user.user_password == password) {
            isFound = true;
            return user.email;
        }
    }

    return '';
}

function login(req, res, next) {
    console.log(req.body.email, req.body.password);
    let user = authenticate(req.body.email, req.body.password);

    res.cookie('email', user);
    
    if (!user) {
        res.redirect('/invalid');
    }
    else {
        res.redirect('/products');
    }
}

function loginError(req, res, next) {
    res.sendFile(path.join(__dirname, "../views", "login_error.html"));
}

function register(req, res, next) {
    res.sendFile(path.join(__dirname, "../views", "register.html"));
}

function addAccount(req, res, next) {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;

    console.log()

    let query = "INSERT INTO users (fname, lname, email, user_password) VALUES ('" +
    fname + "', '" + lname + "', '" + email + "', '" + password + "')";

    connection.query(query,
    function (err, result) {
        if (err) {
            console.log('Error executing the query - ${err}');
            res.redirect('/register');
        }
        else {
            console.log('Successfully added user');
            res.redirect('/products');
        }
});
}

module.exports = {login, loginError, register, addAccount, verify}