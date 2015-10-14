var pmx = require('pmx');
var shelljs = require('shelljs');

module.exports = function refreshVersion(metrics) {
  shelljs.exec('nginx -v', {async: true, silent: true}, function (err, out) {
    if(err){
      return pmx.notify("Couldn't get Nginx version: " + err);
    }

    var matches = out.match(/nginx version: (.+)/);
    if(matches){
      metrics.version.set(matches[1]);
    }
  });
};