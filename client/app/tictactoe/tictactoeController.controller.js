'use strict';
(function() {

angular.module('tictactoeApp')
  .controller('TictactoeController', TictactoeController);

  TictactoeController.$inject = ['$scope', '$http'];


function TictactoeController ($scope, $http) {

  var vm = $scope;

  vm.createGame = createGame;
  vm.processEvents = processEvents

  function createGame(){
      var postPromise = $http.post('/api/createGame/',{
          "id":"1337",
          "cmd":"CreateGame",
          "user":
          {
            "userName":$scope.userName
          },
          "name":$scope.name,
          "timeStamp":"2014-12-02T0:0:01"}
      );

      postPromise.then(function(data){
        $scope.processEvents(data.data.response);
      })
    };


  function processEvents(events){
      vm.processedEvents = events;
    }



  };

})();
