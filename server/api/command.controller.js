/**
 * Created by olafurns on 9.12.2014.
 */


'use strict'

var _ = require('lodash');
var boundCtx = require('../models/tictactoe/tictactoeBoundedContext');
var ticHandler = require('..models/tictactoe/tictactoe');

var app = require('../app');

exports.executeCommand = function(req, res) {
  try {

    if(!app.eventStore){
      app.eventStore = require('../eventstore/memorystore');
    }

    var storage = app.eventStore;

    var ctx = boundCtx(storage, ticHandler);

    var result = ctx.handlecommand(req.body);

    console.log(req.body);
    req.json(result);
  }

  catch(e)
  {
    res.json(e);
  }
}

