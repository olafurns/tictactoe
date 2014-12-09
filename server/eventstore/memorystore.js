/**
 * Created by olafurns on 8.12.2014.
 */
module.exports = function() {
  var store = {};
  return {
    loadEvents: function(id){

      return store[id] || [];

    },

    storeEvents: function(id, events) {
      store[id] = (store[id] || []).concat(events);
    }
  }
};
