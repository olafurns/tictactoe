/**
 * Created by olafurns on 8.12.2014.
 */

var _ = require('lodash');

module.exports = function(eventStore, commandHandler){

  return {
    handleCommand : function(cmd) {
      var eventStream = eventStore.loadEvents(cmd.id);

      var resultingEvents = [];

      _.each(commandHandler, function(handler){


        var items = handler(eventStream).executeCommand(cmd);
        console.debug("items", items);

        resultingEvents = resultingEvents.concat(items);
        console.debug("resulting events", resultingEvents);
      });

      return resultingEvents;
    }
  }

};
