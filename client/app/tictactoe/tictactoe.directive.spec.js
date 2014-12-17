/**
 * Created by olafurns on 13.12.2014.
 */

'use strict';

describe('Directive: tictactoe', function() {

  beforeEach(module('tictactoeApp'));

  var element, scope;

  beforeEach(inject(function($rootScope) {

    scope = $rootScope.$new();

  }));


  it('should make element visible', inject(function($compile) {
    element = angular.element('<tictactoe></tictactoe>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tictactoe directive');

  }));

});
