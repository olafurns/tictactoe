var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')

describe('create game command', function() {


  it('should emit game created event', function(){

    var given = [];
    var when =
    {
      id:"123987",
      cmd: "CreateGame",
      user: {
        userName: "Gulli"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };
    var then = [
      {
        id:"123987",
        event: "GameCreated",
        user: {
          userName: "Gulli"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }
    ];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);

    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  })



});
