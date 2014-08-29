var settings = require('leport-settings');
var request = require('request');
var routeTables = settings.routeTables = {};

// request lepass route table
request({
  uri: settings.lepass_root_url + '/.well-known/routeTable',
  json: true
}, function(err, res, body) {
  if (err) { 
    throw err;
  }
  if (res.statusCode !== 200) {
    throw 'GET http://localhost:3080/.well-known/routeTable ' + res.statusCode;
  }
  routeTables.lepass = body;
});
