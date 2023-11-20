const path = require('path');

users = [{fname: 'Rana', lname: 'Badawy', email: 'rb@gmail.com', password: '123'},
        {fname: 'M', lname: 'M', email: 'mm@gmail.com', password: '123'},
        {fname: 'S', lname: 'S', email: 'ss@gmail.com', password: '123'}];

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
        if (user.email == email && user.password == password) {
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

    res.redirect('/products');
}

module.exports = {login, loginError, register, addAccount, verify}