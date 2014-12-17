module.exports = function(history){

  var states = require('./gameStates');
  var gameState = states(history);

  return {
    executeCommand: function(cmd){

      var cmdHandler = {
        "CreateGame": function(cmd){
          return [{
            id: cmd.id,
            event: "GameCreated",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }]
        },
        "JoinGame": function(cmd){
          if(gameState.gameFull()) {
            return [{
              id: cmd.id,
              event: "FullGameJoinAttempted",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          }
          return [{
            id: cmd.id,
            event:"GameJoined",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }]

        },
        "MakeMove": function(cmd){
          if(gameState.spotTaken(cmd))
          {
            return [{
              id: cmd.id,
              event: "SpotTaken",
              user: cmd.user,
              move: cmd.move,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          }
          if(gameState.notPlayerTurn(cmd))
          {
            return [{
              id: cmd.id,
              event: "NotPlayerTurn",
              user: cmd.user,
              move: cmd.move,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          }
          gameState.makeMove(cmd);
          if(gameState.gameWon())
          {
            return [{
              id: cmd.id,
              event: "GameWon",
              user: cmd.user,
              move: cmd.move,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          }
          if(gameState.gameDraw())
          {
            return [{
              id: cmd.id,
              event: "GameDraw",
              user: cmd.user,
              move: cmd.move,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          }
          return[{
            id: cmd.id,
            event:"MoveMade",
            user: cmd.user,
            move: cmd.move,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }]
        }
      }
      return cmdHandler[cmd.cmd](cmd);
    }
  }
}
