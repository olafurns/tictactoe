'use strict';

describe('Controller: TictactoeControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  var TictactoeControllerCtrl, scope, httpBackend, http;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope, $http) {
    http = $http;
    httpBackend = $injector.get('$httpBackend');

    scope = $rootScope.$new();
    TictactoeControllerCtrl = $controller('TictactoeController', {
      $scope: scope
    });
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should post variables from scope for name and userName and process resulting events', function () {
    httpBackend.expectPOST('/api/createGame/', {
      id : "1337",
      cmd: "CreateGame",
      user: {
        userName: "Jesus"
      },
      name: "RiseOfTheDead",
      timeStamp:"2014-12-02T0:0:01"
    }).respond({
      response: [
        {}
      ]
    });

    scope.name ="RiseOfTheDead";
    scope.userName = "Jesus";

    scope.createGame();
    httpBackend.flush();

    expect(scope.processedEvents.length).toBe(1);

  });
});

