var async = require('async');
var passport = require('passport');
var settings = require('leport-settings');
var ensure = require('connect-ensure-login');

module.exports.Passport = function(opts) {
  var initialize = passport.initialize(opts)
  var session = passport.session(opts)
  return function passport(req, res, next) {
    async.series([
      function(cb) {
        initialize(req, res, cb);
      },
      function(cb) {
        session(req, res, cb);
      }
    ], next);
  }
};
module.exports.bearer = passport.authenticate('bearer', {
  session: false
});
module.exports.ensureLogin = ensure.ensureLoggedIn('/');
