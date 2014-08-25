var policies = require('../policies');
var models = require('../models');
module.exports = [
  policies.Auth.ensureLogin,
  function(req, res, err) {
    models.person.findOne()
      .where({
        user: req.user.id
      })
      .populate('abilities')
      .exec(function(err, person) {
        if (err) return next(err);
        res.render('skills.ejs', {
          abilities: person.abilities
        });
      });
  }
];
