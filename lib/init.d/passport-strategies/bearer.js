var lepass = require('lepass-settings');
var settings = require('leport-settings');
var passport = require('passport');
var BearerStartegy = require('passport-http-bearer').Strategy;
var request = require('request');
var models = require('../../models');
var common = require('./common');
passport.use(new BearerStartegy(function(act, done) {
  request({
    uri: lepass.app.url + lepass.oauth.endpoints.tokenInfo,
    auth: {
      bearer: act
    },
    json: true
  }, function(err, res, body) {
    if (err) return done(err);
    common.ensureUser(act, null, body, done);
  });
}));
