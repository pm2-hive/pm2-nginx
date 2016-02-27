var request = require('request');
var pmx = require('pmx');
var URL = require('url');

function build(conf) {
  var client = {},
    opts = {},
    statusUrl;

  statusUrl = URL.format({
    protocol: process.env.PM2_NGINX_PROTOCOL || conf.protocol,
    hostname: process.env.PM2_NGINX_HOSTNAME || conf.hostname,
    port: process.env.PM2_NGINX_PORT || conf.port,
    pathname: process.env.PM2_NGINX_STATUS_PATH || conf.statusPath
  });

  if (process.env.PM2_NGINX_USERNAME || conf.username) {
    opts.auth = {
      user: process.env.PM2_NGINX_USERNAME || conf.username,
      pass: process.env.PM2_NGINX_PASSWORD || conf.password
    }
  }

  client.query = function (cb) {
    request(statusUrl, opts, cb);
  };

  return client;
}

module.exports.build = build;