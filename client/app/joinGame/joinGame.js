/**
 * Created by olafurns on 17.12.2014.
 */


'use strict';

angular
  .module('tictactoeApp')
  .config(function($stateProvider){

    $stateProvider
      .state('joinGame', {
        url:'/joinGame',
        templateUrl:'app/joinGame/joinGame.html',
        controller:'JoinGameCtrl'
      });
  });
