/**
 * Created by olafurns on 3.12.2014.
 */

var _ = require('lodash');

module.exports = function(history){
  var gameFull = false;
  var gameBoard = ['','','','','','','','',''];
  var turns = 0;
  _.each(history, function(event){
    if(event.event === "GameJoined"){
      gameFull = true;
    }

    if(event.event === "MoveMade")
    {
      placeMarkOnBoard(event);
      turns++;
    }

  });

  function notPlayerTurn(event)
  {
    if(history[history.length-1].event === 'MoveMade')
      var lastPlayer = history[history.length-1].user.userName;

    return lastPlayer === event.user.userName;
  }

  function spotTaken(event) {
    return gameBoard[event.move] != '';
  }

  function placeMarkOnBoard(event)
  {
    if(turns % 2 === 0)
      gameBoard[event.move] = 'X';
    else
      gameBoard[event.move] = '0';

  }

  return{
    gameFull: function(){
      return gameFull;
    },
    gameBoard: function(){
      return gameBoard;
    },
    spotTaken: function(event) {
      return spotTaken(event);
    },
    notPlayerTurn: function(event) {
      return notPlayerTurn(event);
    }
  }
};
