module.exports = function(app){
    var express = require('express');
    var router = express.Router({strict: true});
    require('../app/default-routes')(router);

    app.use('/auth', router);
};