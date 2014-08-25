var path = require('path');
var express = require('express');

module.exports = [{
  use: express.static(path.join(__dirname, '../assets'))
}, {
  use: express.static(path.join(__dirname, '../build'))
}];
