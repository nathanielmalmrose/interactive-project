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

app.listen(3000);