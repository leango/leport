var app = require('../../app');
module.exports = [{
  use: function(req, res, next) {
    if (req.user) next();
    var target = req.app.get('routeTable').auth_signin;
    req.session.returnTo = req.originalUrl;
    res.redirect(target);
  }
}, {
  name: 'person',
  get: function(req, res) {
  },
  post: function(req, res) {

  }
}];
module.exports.baseUrl = '/person'
