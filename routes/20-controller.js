var settings = require('leport-settings');
var cases = require('change-case');
var controllers = require('../lib/controllers');
var verbs = ['get', 'put', 'delete', 'post'];
module.exports = [];
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
    } else {
      // iterate over verbs, export methods of each verb
      verbs.forEach(function(verb) {
        var routes = service[verb];
        if (!routes) return;
        var route = {};
        route.verb = verb;
        route.path = path;
        if (!Array.isArray(routes))
          routes = [routes];
        route.routes = routes;
        module.exports.push(route);
      });
      setup(service, path);
    }
  });
})(controllers, '/c');
