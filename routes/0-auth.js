var settings = require('leport-settings');
var lepassSettings = require('lepass-settings');
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var request = require('request');
var models = require('../lib/models');
module.exports = [{
  verb: 'get',
  path: settings.auth.endpoints.lepass,
  routes: [
    passport.authenticate('lepass', {
      scope: '*'
    })
  ]
}, {
  verb: 'get',
  path: settings.auth.endpoints.lepassCallback,
  routes: [
    passport.authenticate('lepass', {
      failurRedirect: settings.auth.endpoints.lepass
    }),
    function(req, res) {
      var target = req.session.returnTo || '/';
      delete req.session.returnTo;
      res.redirect(target);
    }
  ]
}, {
  verb: 'get',
  path: settings.auth.endpoints.signout,
  routes: [
    function(req, res) {
      req.logout();
      delete req.user;
      var target = req.session.returnTo || '/';
      delete req.session.returnTo;
      res.redirect(target);
    }
  ]
}];

passport.use('lepass', new OAuth2Strategy({
  authorizationURL: _url(lepassSettings.oauth.endpoints.authorize),
  tokenURL: _url(lepassSettings.oauth.endpoints.token),
  clientID: settings.client.id,
  clientSecret: settings.client.secret,
  callbackURL: settings.app.url + settings.auth.endpoints.lepassCallback
}, function(act, rft, profile, done) {
  request({
    url: lepassSettings.app.url + lepassSettings.oauth.endpoints.tokenInfo,
    auth: {
      bearer: act
    },
    json: true
  }, function(err, res, body) {
    if (err) {
      return done(err);
    }
    var userId = body.user_id.toString();
    models.user.findOne({
      userId: userId
    }, function(err, user) {
      if (err) return done(err);
      if (!user) {
        models.user.create({
          userId: userId,
          email: body.email,
          verifedEmail: Boolean(body.verified_email)
        }, done);
      } else {
        done(null, user);
      }
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, 'This is a user');
});
passport.deserializeUser(function(id, done) {
  done(null, {
    slogan: 'This is a user'
  });
});



function _url(path) {
  return lepassSettings.app.url + path;
}
