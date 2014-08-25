var policies = require('../policies');
var models = require('../models');
module.exports = [
  policies.Auth.ensureLogin,
  function(req, res, next) {
    var page = req.query.p || 1;
    models.person.findOne()
      .where({
        user: req.user.id
      })
      .populate('courses', {
        limit: 7,
        skip: (page - 1) * 7,
        sort: {
          createdAt: 'desc'
        }
      })
      .exec(function(err, person) {
        if (err) return next(err);
        res.render('timeline.ejs', {
          courses: person.courses,
          page: page
        });
      })
  }
];