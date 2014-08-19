require('lepass-settings');
var settings = require('leport-settings');


var path = require('path');
var extend = require('extend');
var express = require('express');
var engines = require('consolidate');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
app.set('port', process.env.PORT);
app.set('bindip', process.env.BINDIP);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engines.ejs);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(settings.app.cookieSecret));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'build')));

var SessionStore = require(settings.app.sessionStore)(session);
var sessionStore = new SessionStore(settings.app.sessionStoreSetting);
app.use(session(extend({
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}, settings.app.sessionSettings)));

app.use(passport.initialize());
app.use(passport.session());
app.use(require('./routes'));
app.use(function(req, res, next) {
  res.redirect('/');
});
module.exports = app;


