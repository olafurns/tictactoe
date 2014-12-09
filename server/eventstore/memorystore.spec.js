/**
 * Created by olafurns on 8.12.2014.
 */

var mem = require('./memorystore');
var should = require('should');

describe('Event stored in memory', function() {

  var createGameEvent = {
    id: "1010",
    event: "GameCreated",
    user: {
      userName: "Jesus"
    },
    name: "RiseOfTheDead",
    timeStamp:"2014-01-01T01:00:00"
  };

  var joinGameEvent = {
    id: "1011",
    event: "JoinGame",
    user: {
      userName: "God"
    },
    name: "RiseOfTheDead",
    timeStamp:"2014-01-01T01:01:00"
  };

  it('should return an empty array for unknown id', function() {

    var storage = mem();

    var loadedEvents = storage.loadEvents('0000');

    should(loadedEvents.length).be.exactly(0);
    should(loadedEvents).be.instanceOf(Array);


  });




})
