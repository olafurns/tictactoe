'use strict';


console.debug = console.log;

var gameDSL = require('./game.dsl');

describe('Tictactoe gameplay', function() {
  var game;
  var page;

  beforeEach(function(){

    browser.get('/');

    page = require('./creategame.po');
    game = gameDSL(page);
  })


  it('should accept game name and username', function() {

    game.nameGame('Christmas');
    game.nameUser('BabyJesus');

   game.createGame();

    game.waitForTictactoePage();
    game.expectGameBoardShowing();
    game.expectFirstCellShowing();
  })




});
