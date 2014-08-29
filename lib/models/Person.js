var extend = require('extend');
var skills = [
  "计算机", "数学", "自然科学", "文学历史", "乐器", "唱歌"
];
module.exports = {
  schema: true,
  connection: 'mongo',
  types: {
    name: function(name) {
      name = {
        family: name.family,
        given: name.given
      };
      return name.family && name.given;
    }
  },
  attributes: {
    name: {
      type: 'json',
      name: true
    },
    user: {
      model: 'user',
      required: true
    },
    abilities: {
      collection: 'ability',
      via: 'owner',
      dominant: true
    },
    courses: {
      collection: 'course',
      via: 'student',
      dominant: true
    },
    preferences: {
      type: "json"
    },
    learn: function(course) {
      var self = this;
      this.courses.add(course);
      var skill = course.skill;
      this.abilities.some(function(ability) {
        if (ability.skill !== skill) return;
        if (100 - ability.score) {
          ability.lastScore = ability.score;
          var prefer = self.preferences[skill];
          var _prefer = prefer * (2 - prefer);
          var rnd = Math.random() * 0.2 + 0.8;
          ability.score += Math.ceil((100 - ability.score) * _prefer * rnd);
        }
        return true;
      });
    }
  },
  afterCreate: function(person, next) {
    var models = require('./');
    models.person
      .findOne(person.id)
      .populate('abilities')
      .exec(function(err, person) {
        if (err) return next(err);
        var prefers = {};
        skills.forEach(function(skill) {
          var rndPerfer = Math.random();
          var initScore = Math.floor(91 * rndPerfer) + 10;
          prefers[skill] = rndPerfer;
          person.abilities.add({
            skill: skill,
            owner: person,
            score: initScore,
            lastScore: initScore
          });
        });
        person.preferences = prefers;
        person.save(next);
      });
  }
};

function rndi(n) {
  return Math.floor(Math.random() * (n + 1));
}

function rnda(arr) {
  return arr[rndi(arr.length - 1)];
}