/**
 * Created by olafurns on 17.12.2014.
 */

'use strict';

angular
  .module('tictactoeApp')
  .config(function ($stateProvider){

    $stateProvider
      .state('createGame',{
        url: '/createGame',
        templateUrl:'app/createGame/createGame.html',
        controller: 'CreateGameCtrl'
      });

  });
