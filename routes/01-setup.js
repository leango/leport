var settings = require('leport-settings');
var extend = require('extend');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var SessionStore = require(settings.app.sessionStore)(session);
var policies = require('../lib/policies');

module.exports = [{
  use: bodyParser.json()
}, {
  use: bodyParser.urlencoded({
    extended: false
  })
}, {
  use: cookieParser(settings.app.cookieSecret)
}, {
  use: session(extend({
    resave: false,
    saveUninitialized: true,
    store: new SessionStore(settings.app.sessionStoreSetting)
  }, settings.app.sessionSettings))
}, {
  use: policies.Views.render
}, {
  use: policies.Auth.Passport()
}];
