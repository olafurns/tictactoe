module.exports = function(history){

  var states = require('./gameStates');

  var gameState = states(history);

  return {
    executeCommand: function(cmd){

      var cmdHandler = {
        "CreateGame": function(cmd){
          return [{
            event: "GameCreated",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }]
        },
        "JoinGame": function(cmd){
          if(gameState.gameFull()) {
            return [{
              event: "FullGameJoinAttempted",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          }
          return [{
            event:"GameJoined",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }]

        },
        "MakeMove": function(cmd){
          if(gameState.spotTaken())
          {
            return [{
              event: "SpotTaken",
              user: cmd.user,
              move: cmd.move,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          };
          if(gameState.notPlayerTurn(cmd))
          {
            return [{
              event: "NotPlayerTurn",
              user: cmd.user,
              move: cmd.move,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          }
          return[{
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
