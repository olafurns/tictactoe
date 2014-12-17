'use strict';

angular.module('tictactoeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('join', {
      url: '/join/:gameId',
      templateUrl:'/app/joinGame/joinGame.html'})
      .state('create', {
        url: '/',
        templateUrl:'/app/createGame/createGame.html'
      });


    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  }).value('guid', function(){


    function s4() {
      return Math.floor((1+ Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

    }

    function calc() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +  s4() + '-' + s4() + s4() + s4();
    }

    console.debug('guid', calc());

    return calc();
  });
