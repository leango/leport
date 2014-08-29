var extend = require('extend');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var settings = require('leport-settings');
var policies = require('../policies');

var SessionStore = require(settings.session_store)(session);

module.exports = [{
  use: bodyParser.json()
}, {
  use: bodyParser.urlencoded({
    extended: false
  })
}, {
  use: cookieParser(settings.cookie_secret)
}, {
  use: session({
    name: settings.session_name,
    secret: settings.session_secret,
    resave: false,
    saveUninitialized: true,
    store: new SessionStore(settings.session_store_settings)
  })
}, {
  use: policies.Views.render,
}, {
  use: policies.Auth.Passport()
}, {
  use: function(req, res, next) {
    console.log('use this');
    next();
  }
}, {
  use: require('require-routes')('../controllers')
}];
module.exports.baseUrl = settings.controller_prefix;
