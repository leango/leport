var settings = require('leport-settings');
var express = require('express');
var app = module.exports = express();

//configure application fixtures
app.set('env', app.get('env') || 'development');
app.enable('trust proxy'); //TODO: configure it by settings
//app.locals(settings.resources);//TODO: configure it later
app.set('port', process.env.PORT || settings.env.PORT);//TODO: configure it by settings
app.set('bindip', process.env.BINDIP || settings.env.BINDIP);
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-locals'));

require('../routes')(app);

var http = require('http');
var env = app.get('env');
var server = http.createServer(app).listen(app.get('port'), app.get('bindip'), function(){
    console.info('The server is listening on port ' + app.get('port') + ' in ' + env );
});