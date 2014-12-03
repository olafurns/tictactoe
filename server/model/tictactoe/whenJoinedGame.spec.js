/**
 * Created by olafurns on 3.12.2014.
 */


var should = require('should');
var _ = require('lodash');
var tictactoe = require('./tictactoe.js');


describe('join game command', function() {

  it('should emit game joined event', function() {

    var given = [{
      event: "GameCreated",
      user: {
        userName: "Jesus"
      },
      name: "RiseOfTheDead",
      timeStamp: "2014-01-01T01:01:01"
    }];

    var when = {
      cmd: "JoinGame",
      user: {
        userName: "God"
      },
      name: "RiseOfTheDead",
      timeStamp: "2014-01-01T01:10:01"
    };

    var then = [{
      event: "GameJoined",
      user: {
        userName: "God"
      },
      name: "RiseOfTheDead",
      timeStamp: "2014-01-01T01:10:01"
    }];


    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);

    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });

  it('should emit game full when attempting to join a full game', function(){

    var given = [{
      event: "GameCreated",
      user:{
        userName:"Jesus"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:06:00"

    },
      {
        event: "GameJoined",
        user:{
          userName:"God"
        },
        name:"GameOfLife",
        timeStamp:"2014-01-01T03:08:00"

      }];

    var when = {
      cmd: "JoinGame",
      user:{
        userName:"Satan"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:10:00"

    };

    var then = [{
      event: "FullGameJoinAttempted",
      user:{
        userName:"Satan"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:10:00"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });


})

