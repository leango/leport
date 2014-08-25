module.exports = [{
  use: function _404(req, res) {
    res.send('无法显示该页，<a href="/">返回首页</a>');
  }
}];
