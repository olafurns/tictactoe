
(function() {
  /* jshint ignore:start */
  'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeController', TictactoeController)
  .factory('gameState', gameState);

  TictactoeController.$inject = ['$scope', '$http',  '$location' , 'guid', 'gameState'];


function TictactoeController ($scope, $http, $location, guid, gameState  ) {

  var vm = $scope;

  vm.gameState = gameState;

  vm.createGame = createGame;
  vm.joinGame = joinGame;
  vm.makeMove = makeMove;
  vm.processEvents = processEvents;
  vm.thenHandleEvents = thenHandleEvents;
  vm.showJoinGame = showJoinGame;

  function createGame(){
    var id = guid();

    var user = {
      'userName':$scope.userName,
      'symbol': 'X'
    };
    var createPost = $http.post('/api/createGame/',{
        'id': id,
        'cmd':'CreateGame',
        'user': user,
        'name':$scope.name,
        'timeStamp':'2014-12-02T00:00:01'
      }
    );

    vm.thenHandleEvents(createPost);

    createPost.then(function(response) {
      $location.search('gameId', response.data[0].id);
    });

  vm.gameState.me = user;
  }

  vm.$watch(function(){
    return $location.search()['gameId']
  }, function(){
    vm.joinUrl = $location.absUrl() + '?joinGame=true';
  });


  function joinGame() {
    var user = {'userName': vm.userName, symbol: '0'}

    var joinPostPromise = $http.post('/api/joinGame/', {
      'id' : vm.gameState.id,
      'cmd': 'JoinGame',
      'user': user,
      'timeStamp':'2014-12-02T00:00:01'
    });

    vm.thenHandleEvents(joinPostPromise);
    vm.gameState.me = user;
  }

  function showJoinGame(){
    return !!$location.search()['joinGame'];
  }

  function makeMove(coords) {
    var user = vm.gameState.me;

    var makeMovePromise = $http.post('/api/makeMove/', {
      'id': vm.gameState.id,
      'cmd': 'MakeMove',
      'user': user,
      'timeStamp':'2014-12-02T00:00:01',
      'move' : {
        'grid': coords,
        'symbol': 'X'
      }
    });

    vm.thenHandleEvents(makeMovePromise);

    vm.gameState.me = user;
  }
  function processEvents(events){
      vm.processedEvents = events;
    }

  function thenHandleEvents(postPromise)
  {
    postPromise.then(function (data) {
      vm.gameState.mutate(data.data);
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

