var request = require('request');
var pmx = require('pmx');

function build(conf) {
  var client = {},
    opts = {},
    statusUrl;

  statusUrl = conf.protocol + "://" + conf.hostname + ":" + conf.port + conf.statusPath;

  if (conf.username) {
    opts.auth = {
      'user': conf.username,
      'pass': conf.password
    }
  }

  client.query = function (cb) {
    request(statusUrl, opts, cb);
  };

  return client;
}

module.exports.build = build;