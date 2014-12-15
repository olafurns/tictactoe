var should = require('should');
var _ = require('lodash');


describe('tictactoe game context using stubs.', function() {

  it('should route command to instantiated tictactoe game with event stream from store and return generated events.', function(){

    var eventStoreStub = {
      loadEvents: function(aggregateId){
        return [];
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

    var commandHandlers = [tictactoe];

    var gameContext = require('./tictactoeBoundedContext')(eventStoreStub, commandHandlers);

    var emptyCommand = {
      id: "123"
    };

    var events = gameContext.handleCommand(emptyCommand);

    should(executedCommand.id).be.exactly("123");
    should(events.length).be.exactly(0);
  });


  it('should route command to instantiated tictactoe game with event stream from store and return generated events, using mock style tests.',function(){

    var jm = require('jsmockito').JsMockito;
    jm.Integration.importTo(global);

    var mockStore = spy({
      loadEvents : function(){
      }
    });

    when(mockStore).loadEvents('123').thenReturn([]);

    var mockTickTackToe = spy({
      executeCommand : function(){

      }
    });

    when(mockTickTackToe).executeCommand().thenReturn([]);


    var commandHandlers =[function(){
      return mockTickTackToe
    }];
    var gameContext = require('./tictactoeBoundedContext')(mockStore, commandHandlers);

    var emptyCommand = {
      id: "123"
    };

    gameContext.handleCommand(emptyCommand);

    jm.verify(mockStore).loadEvents('123');

    jm.verify(mockTickTackToe).executeCommand(emptyCommand);

  });


});
