var models = require('../lib/models');
var policies = require('../lib/policies');
module.exports = [{
  verb: 'get',
  path: '/',
  routes: [
    function(req, res) {
      res.render('index.ejs');
    }
  ]
}];


var settings = require('leport-settings');
var cases = require('change-case');
var views = require('../lib/views');
(function setup(obj, prefix) {
  Object.keys(obj).forEach(function(key) {
    // if key is not start with upper case, it should be private
    if (!/^[A-Z]/.test(key)) return;

    var service = obj[key];
    var path = prefix + '/' + cases.snake(key);

    // if service is a function, it should be a route
    if (typeof service === 'function') {
      module.exports.push({
        verb: 'get',
        path: path,
        routes: [service]
      });

    // if service is an array, it should be routes
    } else if (Array.isArray(service)) {
      module.exports.push({
        verb: 'get',
        path: path,
        routes: service
      });
    }
  });
})(views, '');

