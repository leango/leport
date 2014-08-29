var path = require('path');
var fs = require('fs');
var Waterline = require('waterline');
var extend = require('extend');
var settings = require('leport-settings');
var orm = new Waterline();
fs.readdirSync(__dirname).forEach(function(fn) {
  var match = /^([A-Z].*)\.js$/.exec(fn);
  if (match) {
    var modelName = match[1];
    var identity = toIdentity(modelName);
    var model = Waterline.Collection.extend(
      extend(require(path.join(__dirname, fn)), {
        identity: identity
      }));
    orm.loadCollection(model);   
  }
});
orm.initialize(settings.waterline_settings, function(err, models) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  extend(module.exports, models.collections);
});

function toIdentity(camel) {
  var underscore = '';
  var match;
  var wordReg = /[A-Z][a-z]*/g;
  while(match = wordReg.exec(camel)) {
    underscore += match[0].toLowerCase();
  }
  return underscore;
}
