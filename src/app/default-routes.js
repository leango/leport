var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = module.exports = function(router){
    router.use(logger('dev'));
    router.use(methodOverride());
    router.use(session({ resave: true,
        saveUninitialized: true,
        secret: 'uwotm8' }));
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(multer());
};
