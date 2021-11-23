const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes'),
    expressSession = require('express-session'),
    bcrypt = require('bcryptjs');

    const app = express();

    app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(express.static(path.join(__dirname, '/public')));

const urlEncodedParser = express.urlencoded({
    extended: false
});

app.get("/", routes.home);
app.get("/signup", routes.signUp);
app.post("/signup", routes.addUser);
app.get("/login", routes.logIn);
app.post("/login", urlEncodedParser, routes.logInAction);
app.get("/testAll", routes.getAllData);

app.listen(3000);