var lepassSettings = require('lepass-settings');
var leportSettings = require('leport-settings');
var http = require('http');
var url = require('url');
var qs = require('querystring');
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
    }
  }
};
