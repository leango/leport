var settings = require('leport-settings');
module.exports = [{
  verb: 'get',
  path: '/~/:view',
  routes: [
    function(req, res) {
      res.render(req.params.view, {
        title: settings.app.name
      });
    }
  ]
}];
