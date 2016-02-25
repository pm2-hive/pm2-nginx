var pmx = require('pmx');
var nginxClientFactory = require('./lib/clientFactory.js');
var nginxStats = require('./lib/stats.js');
var nginxActions = require('./lib/actions.js');

pmx.initModule({

  pid: pmx.resolvePidPaths(['/var/run/nginx.pid']),

  // Options related to the display style on Keymetrics
  widget: {

    // Logo displayed
    logo: 'http://nginx.org/nginx.png',

    // Module colors
    // 0 = main element
    // 1 = secondary
    // 2 = main border
    // 3 = secondary border
    theme: ['#1B2228', '#1B2228', '#009900', '#009900'],

    // Section to show / hide
    el: {
      probes: true,
      actions: true
    },

    // Main block to show / hide
    block: {
      actions: true,
      issues: true,
      meta: true,

      // Custom metrics to put in BIG
      main_probes: ['Accepted Conn.','Active Conn.','Curr. Reading','Curr. Writing','Curr. Waiting']
    }

  }

}, function (err, conf) {
  var refresh_rate = process.env.PM2_NGINX_REFRESH_RATE || conf.refresh_rate;

  var nginxClient = nginxClientFactory.build(conf);

  // Init metrics refresh loop
  nginxStats.init(nginxClient, refresh_rate);

  // Init actions
  nginxActions.init(nginxClient);
});
