'use strict';

describe('Controller: TictactoeControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));


  var TictactoeControllerCtrl, scope, httpBackend, http, location;


  beforeEach(inject(function ($injector, $controller, $rootScope, $http, $location) {
    http = $http;
    httpBackend = $injector.get('$httpBackend');
    location = $location;

    scope = $rootScope.$new();
    TictactoeControllerCtrl = $controller('TictactoeController', {
      $scope: scope
    });
  }));

  /* jshint ignore:start */
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  /* jshint ignore:end */


  it('showJoinGame should be true if set as parameter', function () {

    location.search('joinGame', true);
    location.search('gameId', '1337');
    expect(scope.showJoinGame()).toBe(true);

  });




  it('should post move', function () {
    httpBackend.expectPOST('/api/makeMove/', {
      id:'0101',
      cmd:'MakeMove',
      user: {
        userName: 'Jesus',
        symbol: 'X'
      },
      timeStamp:'2014-12-02T00:00:01',
      move: {
        grid:6,
        symbol:'X'
      }
    }).respond([
      {
        event: 'MoveMade',
        user: {
          userName: 'Jesus'
        },
        move: {
          grid: 6,
          symbol: 'X'
        }
      }
    ]);


    scope.gameId = '1321';
    scope.name = 'RiseOfTheDead';

    scope.gameState.me = { userName: 'Jesus', symbol: 'X'};

    scope.gameState.id = '0101';

    scope.makeMove(6);
    httpBackend.flush();

    expect(scope.gameState.myTurn).toBe(false);

  });


});

