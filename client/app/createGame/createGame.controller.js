/**
 * Created by olafurns on 17.12.2014.
 */

'use strict';

/*

angular.module('tictactoeApp')
  .controller('CreateGameCtrl', function($scope, $http, $location, guid){


    $scope.createGame = function() {

      var user = {'userName': $scope.userName, 'symbol': 'X'};
      var id = guid();

      var createPostPromise = $http.post('/api/createGame/', {
        'id':id,
        'cmd':'CreateGame',
        'user':user,
        'name':$scope.name,
        'timeStamp':'2014-12-02T00:00:01'
      });

      createPostPromise.then(function(response){
        $location.search('gameId', response.data[0].id);
        $location.search('gameSide','X');
      });


    }






  });
*/
