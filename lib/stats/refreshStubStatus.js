var pmx = require('pmx');

module.exports = function refreshStubStatus(metrics, client) {
  client.query(function (error, response, body) {
    if (error) {
      return pmx.notify("Nginx Connection Error: " + error);
    }

    if (response.statusCode == 403 || response.statusCode == 401) {
      return pmx.notify("Nginx Authentification Error: Make sure the path/user/password are valid");
    }

    if (response.statusCode == 404) {
      return pmx.notify("Nginx Status Page not found: Make sure the status stub module is properly installed/configured");
    }

    var regex = /^Active connections: (\d+)\s+[\w ]+\n\s+(\d+)\s+(\d+)\s+(\d+)(\s+(\d+)|)\s+Reading:\s+(\d+)\s+Writing:\s+(\d+)\s+Waiting:\s+(\d+)/;
    var matches = body.match(regex);

    if (matches) {
      var activeConnections = matches[1],
        acceptedConnections = matches[2],
        handledConnections = matches[3],
        clientRequests = matches[4],
        requestsPerHandledConnection,
        currentReading = matches[7],
        currentWriting = matches[8],
        currentWaiting = matches[9];

      metrics.activeConnections.set(activeConnections);
      metrics.acceptedConnections.set(acceptedConnections);
      metrics.handledConnections.set(handledConnections);
      metrics.clientRequests.set(clientRequests);

      if (parseInt(handledConnections) > 0) {
        requestsPerHandledConnection = (parseInt(clientRequests) / parseInt(handledConnections)).toFixed(2);
        metrics.requestsPerHandledConnection.set(requestsPerHandledConnection);
      }

      metrics.currentReading.set(currentReading);
      metrics.currentWriting.set(currentWriting);
      metrics.currentWaiting.set(currentWaiting);
    }
  });
};