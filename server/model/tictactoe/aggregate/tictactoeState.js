var _ = require('lodash');

module.exports = function(history){
  var gridSize = 3;
  var gameFull = false;
  var gameGrid = [['','',''],['','',''],['','','']];
  var gameScore = [0,0,0,0,0,0,0,0,0];
  var moveCount=0;

  function processEvent(event) {
    if (event.event === "GameJoined") {
      gameFull = true;
    }
    if (event.event === "MovePlaced") {
      var point = event.move.side==='X'? 1 : -1;
      var row = event.move.coordinates[0];
      var col = event.move.coordinates[1];

      gameScore[row] += point; // where point is either +1 or -1

      gameScore[gridSize + col] += point;

      if (row === col) gameScore[2*gridSize] += point;

      if (gridSize - 1 - col === row) gameScore[2*gridSize + 1] += point;

      moveCount ++;

      gameGrid[event.move.coordinates[0]][event.move.coordinates[1]] = event.move.side;
    }
  }

  function gameWon(){

    return _.reduce(gameScore, function(won, score){
      return won || score === 3 || score === -3;

    }, false);
  }

  function processEvents(history){
    _.each(history, processEvent);
  }

  processEvents(history);

  return {
    processEvents : processEvents,
    gameFull : function(){
      return gameFull;
    },
    gameWon : gameWon,
    gameDraw: function(){
      if(gameWon()) return false;
      return moveCount === gridSize*gridSize;
    },
    occupied: function(coords){
      return !!gameGrid[coords[0]][coords[1]];
    }
  }
};
