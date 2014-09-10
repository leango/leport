var request = require('request');
var settings = require('leport-settings');
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var common = require('./common');
passport.use('lepass', new OAuth2Strategy({
  authorizationURL: _url(settings.routeTables.lepass.authorization.get),
  tokenURL: _url(settings.routeTables.lepass.token.post),
  clientID: settings.client_id,
  clientSecret: settings.client_secret,
  callbackURL: settings.root_url + settings.auth_prefix + '/lepass/callback'
}, function(act, rft, profile, done) {
  request({
    uri: settings.lepass_root_url + settings.routeTables.lepass.token.get,
    auth: {
      bearer: act
    },
    json: true
  }, function(err, res, body) {
    if (err) return done(err);
    common.ensureUser(act, rft, body, done);
  });
}));

function _url(path) {
  return settings.lepass_root_url + path;
}
