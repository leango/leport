var settings = require('leport-settings');
var passport = require('passport');

module.exports = [{
  verb: 'get',
  path: settings.auth.endpoints.lepass,
  routes: [
    passport.authenticate('lepass')
  ]
}, {
  verb: 'get',
  path: settings.auth.endpoints.lepassCallback,
  routes: [
    passport.authenticate('lepass', {
      failurRedirect: settings.auth.endpoints.failure
    }),
    function(req, res) {
      var target = req.session.returnTo || '/';
      req.session.returnTo = null;
      res.redirect(target);
    }
  ]
}, {
  verb: 'get',
  path: settings.auth.endpoints.signout,
  routes: [
    function(req, res) {
      req.logout();
      res.redirect('/');
    }
  ]
}, {
  verb: 'get',
  path: settings.auth.endpoints.failure,
  routes: [
    function(req, res) {
      res.redirect('/');
    }
  ]
}];


