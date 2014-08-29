var path = require('path');
var express = require('express');

module.exports = [{
  path: '/public',
  use: express.static(path.join(__dirname, '../../assets'))
}, {
  path: '/public',
  use: express.static(path.join(__dirname, '../../build'))
}, {
  path: '/',
  get: function(req, res) {
    res.redirect(req.app.get('routeTable').index.get);
  }
}];

