/**
 * Created by olafurns on 15.12.2014.
 */

'use strict';
//
var _ = require('lodash');
var boundedCtx = require('../model/tictactoe/tictactoeBoundedContext');
var ticHandler = require('../model/tictactoe/tictactoe');


var app = require('../app');

exports.executeCommand = function(req, res) {

  try {
    if (!app.eventStore) {
      app.eventStore = require('../eventstore/memorystore');
    }


    var store = app.eventStore;

    var ctx = boundedCtx(store, ticHandler);

    var result = ctx.handleCommand(req.body);

    res.json(result);
  }
  catch(e)
  {
    res.json(e);
  }

}
