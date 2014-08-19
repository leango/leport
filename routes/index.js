var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router({
  caseSensitive: true
});
fs.readdirSync(__dirname).forEach(function(fn) {
  if (fn === 'index.js') return;
  var routes = require(path.join(__dirname, fn));
  routes.forEach(function(route) {
    if (route.use) {
      router.use(route.use);
    } else if (route.verb) {
      router[route.verb](route.path, route.routes);
    }
  });
});
module.exports = router;
