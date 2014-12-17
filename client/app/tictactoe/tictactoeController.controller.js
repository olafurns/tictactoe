
(function() {
  /* jshint ignore:start */
  'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeController', TictactoeController)
  .factory('gameState', gameState);

  TictactoeController.$inject = ['$scope', '$http',  '$location' , 'guid', 'gameState'];


function TictactoeController ($scope, $http, $location, guid, gameState  ) {



  $scope.gameState = gameState;

  $scope.makeMove = makeMove;
  $scope.processEvents = processEvents;
  $scope.thenHandleEvents = thenHandleEvents;
  $scope.showJoinGame = showJoinGame;


  $scope.$watch(function(){
    return $location.search()['gameId']
  }, function(){
    $scope.joinUrl = $location.absUrl() + '?joinGame=true';
  });

  function showJoinGame(){
    return !!$location.search()['joinGame'];
  }

  function makeMove(coords) {
    var user = $scope.gameState.me;

    var makeMovePromise = $http.post('/api/makeMove/', {
      'id': $scope.gameState.id,
      'cmd': 'MakeMove',
      'user': user,
      'timeStamp':'2014-12-02T00:00:01',
      'move' : {
        'grid': coords,
        'symbol': 'X'
      }
    });

    $scope.thenHandleEvents(makeMovePromise);

    $scope.gameState.me = user;
  }
  function processEvents(events){
      $scope.processedEvents = events;
    }

  function thenHandleEvents(postPromise)
  {
    postPromise.then(function (data) {
      $scope.gameState.mutate(data.data);
    })
  }
  }//End controller

  function gameState(){
    var gameState = {
      me: {},
      created: false,
      board: ["","","","","","","","",""],
      myTurn: false,
      mutate: function(events) {
        console.debug("Mutation", events);

        var handlers = {
          'GameCreated': function(event, gameState){
            gameState.created = true;
            gameState.id = event.id;
          },
          'GameJoined': function(event, gameState){
          gameState.otherPlayer = event.user;
        },
          'MoveMade': function(event, gameState) {
            var coord = event.move.grid;
            gameState.board[coord] = event.move.symbol;
            gameState.myTurn = event.move.symbol !== gameState.me.symbol;
          }
        };
        _.each(events, function(ev){
          handlers[ev.event] && handlers[ev.event](ev, gameState)
        })
      }
    };

    return gameState;

  }

  /* jshint ignore:end */
})();

