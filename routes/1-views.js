var settings = require('leport-settings');
var ensure = require('connect-ensure-login');

module.exports = [{
  verb: 'get',
  path: '/',
  routes: [
    function(req, res) {
      res.render('index.ejs', {
        title: settings.app.name,
        user: req.user
      });
    }
  ]
}, {
  verb: 'get',
  path: '/me',
  routes: [
    ensure.ensureLoggedIn(settings.auth.endpoints.lepass),
    function(req, res) {
      res.render('me.ejs', {
        title: settings.app.name,
        user: req.user
      });
    }
  ]
}];
