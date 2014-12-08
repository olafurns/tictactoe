/**
 * Created by olafurns on 8.12.2014.
 */

var should = require('should');
var _ = require('lodash');

describe('tictactoe game context stubs', function() {

  it('should route command to a started tictactoe game with an event stream from storage and return from storage generated events', function () {

    var calledWithEventStoreId;
    var storedEvents;

    var eventStoreStub = {
      loadEvents: function(aggregatedID) {
        calledWithEventStoreId = aggregatedID;
        return [];
      },
      storeEvents: function (aggregatedID, events) {
        storedEvents = events;
      }

    };

    var execCommmand = {};

    var tictactoeStub = function (history) {
      return {
        executeCommand: function (cmd) {
          executedCommand = cmd;
          return [];
        }
      }
    };

    var commHandlers = tictactoeStub;

    var boundedContext = require('./tictactoeBoundedContext')(eventStoreStub,commHandlers);

    var emptyCommand = {
      id: "1010"
    };

    var events = boundedContext.handleCommand(emptyCommand);

    should(executedCommand.id).be.exactly("1010");
    should(calledWithEventStoreId).be.exactly("1010");
    should(events.length).be.exactly(0);
    should(storedEvents).be.exactly(events);


  });
});

