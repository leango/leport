module.exports = [{
  use: function(req, res) {
    res.status(404).send('Not Found');
  }
}];