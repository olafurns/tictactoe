/**
 * Created by olafurns on 17.12.2014.
 */

'use strict';

describe('Controller: JoinGameCtrl', function() {

  beforeEach(module('tictactoeApp'));

  var JoinGameCtrl, scope, httpBackend, location;

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location) {

    location = $location;
    httpBackend = $httpBackend;
    scope = $rootScope.$new();

    location.search('gameId', '1337');

    JoinGameCtrl = $controller('JoinGameCtrl', {
      $scope: scope
    });


  }));


  it('should ask to join game if gameid is already in scope and assign me to 0', function () {

    httpBackend.expectGET('/api/gameHistory/1337')
      .respond([{
        event: 'GameCreated',
        name: 'RiseOfTheDead',
        id: '1337'
      }]);

    httpBackend.flush();

    httpBackend.expectPOST('/api/joinGame/', {
      id: '1337',
      cmd: 'JoinGame',
      user: {
        userName: 'Jesus',
        symbol: '0'
      },
      timeStamp: '2014-12-02T00:00:01'
    }).respond([{
      event: 'GameJoined'
    }]);


    scope.userName = 'Jesus';
    scope.joinGame();

    httpBackend.flush();
    //
    expect(location.search()['gameSymbol']).toBe('0');

  });

});
