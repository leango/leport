module.exports = [{
  path: '/routeTable',
  get: function(req, res) {
    var routeTable = req.app.get('routeTable');
    var publicTable = {};
    Object.keys(routeTable).forEach(function(endpoint) {
      if (endpoint[0] === '_') return;
      publicTable[endpoint] = routeTable[endpoint];
    });
    res.json(publicTable);
  }
}];
module.exports.baseUrl = '/.well-known';
