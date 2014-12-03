/**
 * Created by olafurns on 3.12.2014.
 */

var should = require('should');
var _ = require('lodash');
var tictactoe = require('./tictactoe.js');


describe('create game command', function()
{
  it('should emit game create event', function() {
    var given = [];

    var when = {
      cmd: "CreateGame",
      user: {
        userName: "Jesus"
      },
      name: "RiseOfTheDead",
      timeStamp: "2014-01-01T01:01:01"
    };

    var then = [{
      event: "GameCreated",
      user: {
        userName: "Jesus"
      },
      name: "RiseOfTheDead",
      timeStamp: "2014-01-01T01:01:01"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);

    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));

  });


});
///


