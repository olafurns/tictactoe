/**
 * Created by olafurns on 3.12.2014.
 */

var _ = require('lodash');

module.exports = function(history){
  var gameFull = false;
  var spotTaken = false;
  var gameBoard = ['','','','','','','','',''];

  var lastPlayer;

  _.each(history, function(event){
    if(event.event === "GameJoined"){
      gameFull = true;
    }

    if(event.event === "MoveMade")
    {
      //lastPlayer = event.user.userName;
    }

  });

  function notPlayerTurn(event)
  {
    if(history[history.length-1].event === 'MoveMade')
      var lastPlayer = history[history.length-1].user.userName;

    return lastPlayer === event.user.userName;

  }

  return{
    gameFull: function(){
      return gameFull;
    },
    gameBoard: function(){
      return gameBoard;
    },
    spotTaken: function() {
      return spotTaken;
    },
    notPlayerTurn: function(move) {

      return notPlayerTurn(move);
    }
  }
};
