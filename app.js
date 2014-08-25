// require settings to setup enviroment
require('lepass-settings');
var settings = require('leport-settings');


var path = require('path');
var express = require('express');
var engines = require('consolidate');

// set applications
var app = express();
app.set('port', process.env.PORT);
app.set('bindip', process.env.BINDIP);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engines.ejs);

// use routes
app.use(require('./routes'));

// export app
module.exports = app;


