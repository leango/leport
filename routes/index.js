var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
fs.readdirSync(__dirname).forEach(function(fn) {
  if (fn === 'index.js') return;
  var routes = require(path.join(__dirname, fn));
  if (Array.isArray(routes)) {
    for(var i = 0; i < routes.length; ++i) {
      var route = routes[i];
      try {
        if (route.use) {
          router.use(route.use);
          console.log('use %s', route.use.name);
        } else if (route.verb) {
          router[route.verb](route.path, route.routes);
          console.log('route %s:\t%s\t%s', fn, route.verb, route.path);
        }
      } catch(e) {
        if (e) {
          console.error('error %s:\t%s', fn, e);
        }
      }
    }
  }
});
module.exports = router;
