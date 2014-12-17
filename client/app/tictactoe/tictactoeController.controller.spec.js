'use strict';

describe('Controller: TictactoeControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  beforeEach(function(){
    module(function($provide){
      $provide.value('guid', function() {
        return '0001';
      });
    });

  });

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
  it('should post variables from scope for guid, name and userName and process resulting events and assign me to X', function () {
    httpBackend.expectPOST('/api/createGame/', {
      id : '0001',
      cmd: 'CreateGame',
      user: {
        userName: 'Jesus',
        symbol: 'X'
      },
      name: 'RiseOfTheDead',
      timeStamp:'2014-12-02T00:00:01'
    }).respond([
      {
        id: '0001',
        event: 'GameCreated',
        user: {
          userName: 'Jesus',
          symbol: 'X'
        }
    }]);

    scope.name = 'RiseOfTheDead';
    scope.userName = 'Jesus';

    scope.createGame();
    httpBackend.flush();

    expect(scope.gameState.created).toBe(true);
    expect(scope.gameState.me.symbol).toBe('X');
    expect(location.search().gameId).toBe('0001');
    expect(scope.joinUrl).toBe(location.absUrl() + '?joinGame=true');
  });

  it('showJoinGame should be true if set as parameter', function () {

    location.search('joinGame', true);
    location.search('gameId', '1337');
    expect(scope.showJoinGame()).toBe(true);

  });

  it('should ask to join game if game id already in scope, and assign me to 0', function() {
    httpBackend.expectPOST('/api/joinGame/', {
      id: '1337',
      cmd: 'JoinGame',
      user: {
        userName: 'Satan',
        symbol: '0'
      },
      timeStamp:'2014-12-02T00:00:01'
    }).respond([
      {
        event: 'GameCreated'
      }
    ]);

    scope.gameState.id = '1337';
    scope.name = 'RiseOfTheDead';
    scope.userName = 'Satan';

    scope.joinGame();
    httpBackend.flush();


    expect(scope.gameState.created).toBe(true);
    expect(scope.gameState.me.symbol).toBe('0');

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

