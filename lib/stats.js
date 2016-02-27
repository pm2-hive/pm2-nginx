var probe = require('pmx').probe();

var refreshStubStatus = require('./stats/refreshStubStatus');
var refreshVersion = require('./stats/refreshVersion');

var metrics = {};

// Init metrics with default values
function initMetrics() {
  metrics.version = probe.metric({
    name: 'Nginx Version',
    value: 'N/A'
  });
  metrics.activeConnections = probe.metric({
    name: 'Active Conn.',
    value: 'N/A'
  });
  metrics.acceptedConnections = probe.metric({
    name: 'Accepted Conn.',
    value: 'N/A'
  });
  metrics.handledConnections = probe.metric({
    name: 'Handled Conn.',
    value: 'N/A'
  });
  metrics.clientRequests = probe.metric({
    name: 'Client Requests',
    value: 'N/A'
  });
  metrics.requestsPerHandledConnection = probe.metric({
    name: 'Req/Handled Conn.',
    value: 'N/A'
  });
  metrics.currentReading = probe.metric({
    name: 'Curr. Reading',
    value: 'N/A'
  });
  metrics.currentWriting = probe.metric({
    name: 'Curr. Writing',
    value: 'N/A'
  });
  metrics.currentWaiting = probe.metric({
    name: 'Curr. Waiting',
    value: 'N/A',
    alert: {
      mode: 'threshold-avg',
      value: 10000,
      msg: 'Too many Waiting connections',
      cmp: ">"
    }
  });
}

// Refresh metrics
function refreshMetrics(client) {
  refreshStubStatus(metrics, client);
}

function init(client, refresh_rate) {
  refresh_rate = refresh_rate || 5000; // ms
  initMetrics();
  setInterval(refreshMetrics.bind(this, client), refresh_rate);
  refreshVersion(metrics);
}

module.exports.init = init;
