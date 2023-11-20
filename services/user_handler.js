const path = require('path');
const connection = require('./db_config');

let users = [];

async function getUsersAsync() {
    return new Promise((resolve) => {
        connection.query('select * from users',
            function (err, result) {
                if (err) {
                    console.log('Error executing the query - ${err}')
                }
                else {
                    resolve(JSON.parse(JSON.stringify(result)));
                }
            }
        )
    });
}

function getUsersMiddleware(req, res, next){
    getUsersAsync().then((val) => {
        users = val;
        next();
    });
}

function verify(req, res, next) {
    if (req.cookies.user) {
        next();
    }
    else {
        res.redirect('/');
    }
}

function authenticate(email, password) {
    for (let user of users) {
        if (user.email == email && user.user_password == password) {
            return user.user_id;
        }
    }

    return '';
}

function login(req, res, next) {    
    let user = authenticate(req.body.email, req.body.password);

    res.cookie('user', user);
    
    if (!user) {
        res.redirect('/invalid');
    }
    else {
        res.redirect('/products');
    }
}

function logout(req, res, next) {
    res.cookie('user', '');
    res.redirect('/');
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
                res.cookie('user', result.insertId);
                res.redirect('/products');
            }
        }
    );
}

module.exports = {login, loginError, register, addAccount, verify, getUsersMiddleware, logout}