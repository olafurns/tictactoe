/**
 * Created by olafurns on 3.12.2014.
 */

var _ = require('lodash');

var win  = require('./isGameWon');

module.exports = function(history){
  var gameFull = false;
  var gameBoard = ['','','','','','','','',''];
  var winner = false;
  var turns = 0;

  _.each(history, function(event){
    if(event.event === "GameJoined"){
      gameFull = true;
    }

    if(event.event === "MoveMade")
    {
      gameBoard[event.move.grid] = event.move.symbol;
      turns++;
    }

  });

  function notPlayerTurn(event)
  {
    var lastPlayer;
    if(history[history.length-1].event === 'MoveMade')
      lastPlayer = history[history.length-1].user.userName;

    return lastPlayer === event.user.userName;
  }

  function spotTaken(event) {

    return gameBoard[event.move.grid] !== '';
  }

  function makeMove(event) {

    turns++;
    gameBoard[event.move.grid] = event.move.symbol;
    winner = win(gameBoard, event.move.symbol);
  }

  return{
    gameFull: function(){
      return gameFull;
    },
    spotTaken: function(event) {
      return spotTaken(event);

    },
    notPlayerTurn: function(event) {

      return notPlayerTurn(event);

    },
    gameWon: function()
    {
      return winner;
    },
    gameDraw: function()
    {
      return turns === 9 && !winner;
    },
    makeMove: function(cmd)
    {
      makeMove(cmd);
    }

  };
};
