'use strict';

describe('Controller: CreateGameCtrl', function () {



  beforeEach(module('tictactoeApp'));
  var CreateGameCtrl, scope, httpBackend, location;

  beforeEach(function () {
    module(function ($provide) {
      $provide.value('guid', function () {
        return '1337'
      });
    });

  });


  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location) {
    httpBackend = $httpBackend;
    location = $location;
    scope = $rootScope.$new();
    CreateGameCtrl = $controller('CreateGameCtrl', {
      $scope: scope
    });
  }));


  it('should post variables from scope for guid, name and userName and process resulting events, and assign me to X', function () {
    httpBackend.expectPOST('/api/createGame/', {
      id: '1337',
      cmd: 'CreateGame',
      user: {
        userName: 'Jesus',
        side: 'X'
      },
      name: 'RiseOfTheDead',
      timeStamp:'2014-12-02T00:00:01'
    }).respond([
        {
          id: '1337',
          event: 'GameCreated',
          user: {
            userName: 'Jesus',
            side: 'X'
          }
        }
      ]
    );

    scope.name = 'RiseOfTheDead';

    scope.userName = 'Jesus';

    scope.createGame();
    httpBackend.flush();

    expect(location.search()['gameId']).toBe('1337');
    expect(location.search()['gameSymbol']).toBe('X');

  });
});
