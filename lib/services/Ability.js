var models = require('../models');
var policies = require('../policies');
var passport = require('passport');
module.exports = [
  policies.Auth.bearer,
  function(req, res, next) {
    models.person
      .findOne({
        user: req.user.id
      })
      .populate('abilities')
      .exec(function(err, person) {
        if (err) return next(err);
        res.json(person.abilities);
      });
  }
];
