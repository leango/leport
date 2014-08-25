var policies = require('../lib/policies');
var models = require('../lib/models');
var lebuy = require('lebuy-settings');
var request = require('request');

module.exports = [{
  verb: 'get',
  path: '/~/:view',
  routes: [
    function(req, res) {
      res.render(req.params.view);
    }
  ]
}, {
  verb: 'get',
  path: '/~study',
  routes: [
    policies.Auth.ensureLogin,
    function(req, res, next) {
      request({
        uri: lebuy.app.url + '/s/course',
        auth: {
          bearer: req.user.accessToken
        },
        json: true
      }, function(err, _, body) {
        if (err) return next(err);
        console.log(body);
        req.courses = body;
        next();
      });
    },
    function(req, res, next) {
      models.person
        .findOne()
        .where({
          user: req.user
        })
        .populate('courses')
        .exec(function(err, person) {
          if (err) return next(err);
          req.courses.forEach(function(course) {
            person.learn(course);
          });
          person.save(next);
        });
    },
    function(req, res) {
      res.render('study.ejs');
    }
  ]
}, {
  verb: 'get',
  path: '/~rst',
  routes: [
    function(req, res) {
      models.user.destroy({}).exec(nop);
      models.ability.destroy({}).exec(nop);
      models.course.destroy({}).exec(nop);
      models.person.destroy({}).exec(nop);
      req.logout();
      res.redirect('back');
    }
  ]
}];

function nop() {}