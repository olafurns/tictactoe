/**
 * Created by olafurns on 17.12.2014.
 */

'use strict';

describe('Controller: TictactoeControllerCtrl', function() {


  beforeEach(module('tictactoeApp'));

  var TictactoeControllerCtrl, scope, httpBackend, http;


  beforeEach(inject(function($injector, $controller, $rootScope, $http){
      http = $http;
      httpBackend = $injector.get('$httpBackend');

      scope = $rootScope.new();

      TictactoeControllerCtrl = $controller('TictactoeController', {
        $scope: scope
      });
    }));


  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  })


  it('should post vars from scope for name and userName and process resulting events', function() {
    ///
    httpBackend.expectPOST('/api/createGame/', {
      id: "1337",
      cmd: "CreateGame",
      user: {
        userName: "Jesus"
      },
      name:"RiseOfTheDead2",
      timeStamp: "2014-12-02T01:01:01"
    })
      .respond({
        response: [
          {}
        ]
      });

    scope.name = "RiseOfTheDead2";
    scope.userName = "Jesus";


    scope.createGame();
    httpBackend.flush();

    expect(scope.processedEvents.length).toBe(1);
  });



});
