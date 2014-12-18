var should = require('should');
var _ = require('lodash');


describe('tictactoe game context using stubs.', function() {

  it('should route command to instantiated tictactoe game with event stream from store and return and store generated events.', function(){

    var calledWithEventStoreId;
    var storedEvents;
    var eventStoreStub = {
      loadEvents: function(aggregateId){
        calledWithEventStoreId = aggregateId;
        return [];
      },
      storeEvents : function(aggregateId, events){
          storedEvents = events;
      }
    };

    var executedCommand = {};

    var tictactoe = function(history){
        return {
          executeCommand : function(cmd){
            executedCommand = cmd;
            return [];
          }
        }
    };

    var commandHandlers = tictactoe;

    var boundedContext = require('./tictactoeBoundedContext')(eventStoreStub, commandHandlers);

    var emptyCommand = {
      id: '1337'
    };

    var events = boundedContext.handleCommand(emptyCommand);

    should(executedCommand.id).be.exactly('1337');
    should(calledWithEventStoreId).be.exactly('1337');
    should(events.length).be.exactly(0);
    should(storedEvents).be.exactly(events);
  });


  it('should route command to instantiated tictactoe game with event stream from store and return generated events, using mock style tests.',function(){

    var jm = require('jsmockito').JsMockito;
    jm.Integration.importTo(global);
    /* global spy,when */

    var mockStore = spy({
      loadEvents : function(){
      },
      storeEvents : function(){
      }
    });

    when(mockStore).loadEvents('1337').thenReturn([]);

    var mockTickTackToe = spy({
      executeCommand : function(){

      }
    });

    when(mockTickTackToe).executeCommand().thenReturn([]);


    var commandHandlers =function(){
        return mockTickTackToe
    };
    var boundedContext = require('./tictactoeBoundedContext')(mockStore, commandHandlers);

    var emptyCommand = {
      id: '1337'
    };

    boundedContext.handleCommand(emptyCommand);

    jm.verify(mockStore).loadEvents('1337');
    jm.verify(mockStore).storeEvents('1337');

    jm.verify(mockTickTackToe).executeCommand(emptyCommand);

  });


});
