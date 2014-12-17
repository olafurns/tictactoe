/**
 * Created by olafurns on 17.12.2014.
 */

'use strict';

var _ = require('lodash');

var app = require('../../app');


exports.index = function(req, res) {


  console.debug("get by id", req.params.id);
  if(!app.eventStore) {
    app.eventStore = require('../eventstore/memorystore')();
  }


  res.json(app.eventStore.loadEvents(req.params.id));


};
