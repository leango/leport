var path = require('path');
var engines = require('consolidate');
var settings = require('leport-settings');

var app = require('../../app.js');

app.set('title', settings.title);
app.set('port', process.env.PORT);
app.set('bindip', process.env.BINDIP);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../views'));
app.engine('ejs', engines.ejs);

var router = require('require-routes')('../routes');
app.set('routeTable', router.routeTable);
settings.routeTables.leport = router.routeTable;
app.use(router);
