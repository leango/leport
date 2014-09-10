var extend = require('extend');
var settings = require('leport-settings');
module.exports.render = function render(req, res, next) {
  var realRender = res.render.bind(res);
  res.render = function(view, data) {
    data = extend({}, {
      routes: req.app.get('routeTable'),
      title: req.app.get('title'),
      user: req.user || null
    }, data);
    realRender(view, data);
  }
  next();
}