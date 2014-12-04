/**
 * Created by olafurns on 3.12.2014.
 */

var _ = require('lodash');

var win  = require('./isGameWon');

module.exports = function(history){
  var gameFull = false;
  var gameBoard = ['','','','','','','','',''];
  var turns = 0;
  var spotOccupied = false;
  var notYourTurn = false;
  var winner = false;

  _.each(history, function(event){
    if(event.event === "GameJoined"){
      gameFull = true;
    }

    if(event.event === "MoveMade")
    {
      gameBoard[event.move.grid] = event.move.symbol;
    }

  });

  function notPlayerTurn(event)
  {
    if(history[history.length-1].event === 'MoveMade')
      var lastPlayer = history[history.length-1].user.userName;

    return lastPlayer === event.user.userName;
  }

  function spotTaken(event) {

    return gameBoard[event.move.grid] !== '';
  }

  function makeMove(event) {
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
      return turns === 8;
    },
    makeMove: function(cmd)
    {
      makeMove(cmd);
    }

  };
};
