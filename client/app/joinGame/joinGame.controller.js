/**
 * Created by olafurns on 17.12.2014.
 */
'use strict';

angular
  .module('tictactoeApp')
  .controller('JoinGameCtrl', function($scope, $http, $location, gameState) {

    var gameId = $location.search().gameId;

    function thenHandleEvents(postPromise) {
      postPromise.then(function(data) {
        gameState.mutate(data.data);
        $location.search('gameSymbol', '0');
      });
    }

    thenHandleEvents($http.get('/api/gameHistory/' + gameId));

    $scope.joinGame = function() {

      var user = {'userName': $scope.userName, symbol:'0'};

      var joinPostPromise = $http.post('/api/joinGame/',{
        'id': gameState.id,
        'cmd':'JoinGame',
        'user':user,
        'timeStamp':'2014-12-02T00:00:01'
      });

      thenHandleEvents(joinPostPromise);

      gameState.me = user;
    };






  });
