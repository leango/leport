module.exports = {
  schema: true,
  connection: 'mongo',
  attributes: {
    userId: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    verifedEmail: {
      type: 'boolean',
      defaultsTo: false
    },
    accessToken: {
      type: 'string'
    },
    refreshToken: {
      type: 'string'
    },
    scope: {
      type: 'string'
    },
    expiresAt: {
      type: 'date'
    }
  },
  afterCreate: function(user, cb) {
    var models = require('./');
    models.person.create({
      user: user
    }, cb);
  }
};
