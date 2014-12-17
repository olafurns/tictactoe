'use strict';

var _ = require('lodash');

var app = require('../../app');

// Get list of gameHistorys
exports.index = function(req, res ) {
  if(!app.eventStore){
    app.eventStore = require('../../eventstore/memorystore')();
  }

  res.json(app.eventStore.loadEvents(req.params.id));
};
