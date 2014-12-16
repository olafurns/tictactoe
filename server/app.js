/**
 * Main application file
 */

'use strict';

console.debug = console.log;

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);


// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

app.eventStore = require('./eventstore/memorystore')();
console.debug("Instantiated app");

app.appName ="TicTacToe";

// Expose apsp
exports = module.exports = app;
