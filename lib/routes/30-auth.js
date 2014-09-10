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
  use: policies.Auth.Passport()
}, {
  name: 'signin',
  path: '/signin',
  get: function(req, res) {
    res.redirect(req.app.get('routeTable').oauth_lepass.get);
  }
}, {
  name: 'oauth_lepass',
  path: '/lepass',
  get: passport.authenticate('lepass')
}, {
  path: '/lepass/callback',
  get: [
    passport.authenticate('lepass', {
      failurRedirect: '/'
    }),
    function(req, res) {
      var target = req.session.returnTo || '/';
      req.session.returnTo = null;
      res.redirect(target);
    }
  ]
}, {
  name: 'signout',
  path: '/signout',
  get: function(req, res) {
    req.logout();
    res.redirect('/');
  }
}];

module.exports.baseUrl = settings.auth_prefix;
