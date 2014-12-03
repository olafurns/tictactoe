var should = require('should');
var _ = require('lodash');

describe('make move command', function(){

  var tictactoe = require('./tictactoe.js');

  var playerTurnCheck = function(history){

    return history[history.length-1].user.userName;
  };

  it('should emit move made event', function(){

    var given = [{
      event: "GameCreated",
      user:{
        userName:"Jesus"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:06:00"

    },
      {
        event: "GameJoined",
        user:{
          userName:"God"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:08:00"

      }];

    var when = {
      cmd:"MakeMove",
      user:{
        userName:"Jesus"
      },
      move:"0",
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:12:00"
    };

    var then = [{
      event:"MoveMade",
      user:{
        userName:"Jesus"
      },
      move:"0",
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);

    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });



});
