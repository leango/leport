
module.exports = function(app){
    var express = require('express');
    var router = express.Router({strict: true});

    require('./org')(router);

    app.use('/m', router);
};