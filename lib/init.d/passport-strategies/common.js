var extend = require('extend');
var models = require('../../models');
var passport = require('passport');
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  models.user.findOne(id, done);
});

exports.ensureUser = function(act, rft, ti, done) {
  if (ti.expires_in === 'expired') return done(new Error('Token expired'));
  var model = {
    userId: ti.user_id,
    email: ti.email,
    verifedEmail: Boolean(ti.verified_email),
    accessToken: act,
    refreshToken: rft,
    scope: ti.scope,
    expiresAt: new Date(Date.now() + ti.expires_in * 1000)
  };
  models.user.findOne({
    userId: ti.user_id
  }, function(err, user) {
    if (err) return done(err);
    if (!user) {
      models.user.create(model, function(err, user) {
        if (err) return done(err);
        done(null, user);
      });
    } else {
      extend(user, model);
      user.save(function(err) {
        if (err) return done(err);
        done(null, user);
      });
    }
  });
}
function nop() {}