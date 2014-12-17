var should = require('should');
var _ = require('lodash');
var tictactoe = require('./tictactoe.js');

var createGameEvent = {
  event: "GameCreated",
  user:{
    userName:"Jesus"
  },
  name:"RiseOfTheDead",
  timeStamp:"2014-01-01T03:06:00"
}

function joinGameEvent(user) {

  return {
    event: "GameJoined",
    user: {
      userName: user
    },
    name: "RiseOfTheDead",
    timeStamp: "2014-01-01T03:06:00"
  }
}
function moveMadeEvent(user, gridPos, symb){
  return    {
    event:"MoveMade",
    user:{
      userName:user
    },
    move:{
      grid:gridPos,
      symbol:symb
    },
    name:"RiseOfTheDead",
    timeStamp:"2014-01-01T03:12:00"
  }
}

function makeMoveEvent(user, gridPos, symb)
{
  return {
    cmd:"MakeMove",
    user:{
      userName:user
    },
    move: {
      grid:gridPos,
      symbol:symb
    },
    name:"RiseOfTheDead",
    timeStamp:"2014-01-01T03:12:00"
  };
}

function infoEvent(message, gridPos, symb, user){
  return    {
    event:message,
    user:{
      userName:user
    },
    move:{
      grid:gridPos,
      symbol:symb
    },
    name:"RiseOfTheDead",
    timeStamp:"2014-01-01T03:12:00"
  }
}

/* jshint ignore:start */
describe('make move command', function(){

  var given, when, then;

  /*afterEach(function () {

  });*/

  it('should emit move made event', function(){
    given = [
      createGameEvent,
      joinGameEvent("God")
      ];
    when =  makeMoveEvent("Jesus","0","X");
    then = [moveMadeEvent("Jesus","0","X")];
  });

  it('should emit reject move when not player turn', function(){
    given = [
      createGameEvent, joinGameEvent("God"),moveMadeEvent("Jesus","0","X")
    ];

    when = makeMoveEvent("Jesus", "1","X");
    then = [ infoEvent("NotPlayerTurn", "1", "X","Jesus") ];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));

  });

  it('should emit reject move when position not free', function(){
    given = [
      createGameEvent,
      joinGameEvent("God"),
      moveMadeEvent("Jesus","0","X")
      ];

    when = makeMoveEvent("God","0","0");

    var then = [
      infoEvent("SpotTaken","0","0","God")
     ];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit player one wins with top row', function(){
    var given = [
      createGameEvent,
      joinGameEvent("God"),
      moveMadeEvent("Jesus","0","X"),
      moveMadeEvent("God","3","0"),
      moveMadeEvent("Jesus","1","X"),
      moveMadeEvent("God","4","0")
    ];

    var when = makeMoveEvent("Jesus","2","X");
    var then = [infoEvent("GameWon","2","X","Jesus")];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
  it('should emit player one wins with top row', function(){
    var given = [
      createGameEvent,
      joinGameEvent("God"),
      moveMadeEvent("Jesus","0","X"),
      moveMadeEvent("God","3","0"),
      moveMadeEvent("Jesus","1","X"),
      moveMadeEvent("God","4","0")
    ];

    var when = makeMoveEvent("Jesus","2","X");
    var then = [infoEvent("GameWon","2","X","Jesus")];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
  it('should emit game ends with draw', function(){
    var given = [
      createGameEvent,
      joinGameEvent("God"),
      moveMadeEvent("Jesus","0","X"),
      moveMadeEvent("God","1","0"),
      moveMadeEvent("Jesus","2","X"),
      moveMadeEvent("God","4","0"),
      moveMadeEvent("Jesus","3","X"),
      moveMadeEvent("God","6","0"),
      moveMadeEvent("Jesus","5","X"),
      moveMadeEvent("God","8","0")
    ];

    var when = makeMoveEvent("Jesus","7","X");

    var then = [
      infoEvent("GameDraw","7","X","Jesus")
     ];
    var actualEvents = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));

  });



});

/* jshint ignore:end */
