'use strict';
/* jshint ignore:start */
describe('Controller: JoinGameCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  var JoinGameCtrl, scope;
  var httpBackend;
  var location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location, $state) {
    httpBackend = $httpBackend;
    location = $location;

    $state.params['gameId'] = '123';

    scope = $rootScope.$new();
    JoinGameCtrl = $controller('JoinGameCtrl', {
      $scope: scope
    });
  }));

  it('should ask to join game if game id already in scope, and assign me to O', function () {
    httpBackend.expectGET('/api/gameHistory/123').respond( [{
      event: 'GameCreated',
      name:'Game Number one',
      id : '123'
    }]);
    httpBackend.expectGET('app/createGame/createGame.html').respond('');

    httpBackend.flush();

    httpBackend.expectPOST('/api/joinGame/', {
      id: '123',
      cmd: 'JoinGame',
      user: {
        userName: 'Jesus',
        side: 'O'
      },
      timeStamp: '2014-12-02T11:29:29'
    }).respond([
        {event: 'GameJoined'}
      ]
    );


    scope.userName = 'Jesus';

    scope.joinGame();


    httpBackend.expectGET('app/tictactoeController/tictactoe.html').respond('');
    httpBackend.flush();


    expect(location.search()['gameSide']).toBe('O');
    expect(location.search()['gameId']).toBe('123');
    expect(location.path()).toBe('/tictactoe');

  });


});
/* jshint ignore:end */
