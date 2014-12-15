
'use strict'

var _ = require('lodash');
var tictactoe = require('../../model/tictactoe/tictactoe');

var boundedCtx = require('../../model/tictactoe/tictactoeBoundedContext');
var ticHandler = require('../../model/tictactoe/tictactoe');

console.log("CreateGame");

exports.createGame = function(req, res) {

  res.json([]);

  console.debug("Game creation");

  var store = {
    loadEvents: function(id) {
      console.debug("Loading events for id", id);
      return [];
    }
  }

  var ctx = boundedCtx(store, [ticHandler]);

  var result = ctx.handleCommand(req.body);

  console.debug("Create game:", result, req.body);

  req.json(result);
}
