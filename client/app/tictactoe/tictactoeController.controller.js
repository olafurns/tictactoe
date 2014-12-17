/**
 * Created by olafurns on 17.12.2014.
 */
(function() {
  'use strict';

  angular
    .module('tictactoeApp')
    .controller('TictactoeController', TictactoeController);

  TictactoeController.$inject['$scope', '$http'];

  function TictactoeController($scope, $http)
  {
    var vm = this;

    vm.processedEvents;

    vm.createGame = createGame;
    vm.processEvents = processEvents;




    function createGame(){
      var postPromise = $http.post('/api/createGame/',
        {
          "id":"1337",
          "cmd":"CreateGame",
          "user":{"userName": vm.userName},
          "name":vm.name,
          "timeStamp":"2014-12-02T01:01:01"
        });

      postPromise.then(function(data){
        processEvents(data.data.response);
      })
    };

    function processEvents(events){
      vm.processEvents = events;
    };
  };
})();
