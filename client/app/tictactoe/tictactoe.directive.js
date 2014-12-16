/**
 * Created by olafurns on 13.12.2014.
 */

'use strict'

angular.module('tictactoeApp')
  .directive('tictactoe', function() {
    return {

      template: '<div></div>',
      restrict: 'EA',
      link: function(scope, element) {
        element.text("this is the tictactoe directive");
      }
    }
  });


