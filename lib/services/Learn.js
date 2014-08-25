var policies = require('../policies');
var models = require('../models');
module.exports = {
  post: [
    policies.Auth.bearer,
    function(req, res, next) {
      models.person
        .findOne()
        .where({
          user: req.user.id
        })
        .populate('abilities')
        .populate('courses')
        .exec(function(err, person) {
          person.learn(req.body);
          person.save(next);
        });
    },
    function(req, res, next) {
      res.json({});
    }
  ]
};
