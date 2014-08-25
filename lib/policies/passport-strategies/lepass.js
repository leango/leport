var request = require('request');
var lepass = require('lepass-settings');
var settings = require('leport-settings');
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var common = require('./common');
passport.use('lepass', new OAuth2Strategy({
  authorizationURL: _url(lepass.oauth.endpoints.authorize),
  tokenURL: _url(lepass.oauth.endpoints.token),
  clientID: settings.client.id,
  clientSecret: settings.client.secret,
  callbackURL: settings.app.url + settings.auth.endpoints.lepassCallback
}, function(act, rft, profile, done) {
  // TODO: pass the user_id to client
  request({
    url: lepass.app.url + lepass.oauth.endpoints.tokenInfo,
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
  return lepass.app.url + path;
}
