'use strict';

describe('Controller: TictactoeControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  beforeEach(function(){
    module(function($provide){
      $provide.value('guid', function() {
        return '0001'
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
    expect(location.search()['gameId']).toBe('0001');
    expect(scope.joinUrl).toBe(location.absUrl() + '?joinGame=true');
  });

  it('showJoinGame should be true if set as parameter', function () {

    location.search('joinGame', true);
    location.search('gameId', '1337');
    expect(scope.showJoinGame()).toBe(true);

  });




});

