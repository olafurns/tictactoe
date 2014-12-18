'use strict'


console.debug = console.log;

describe('Main view', function() {
  var page;

  beforeEach(function(){

    browser.get('/');

    page = require('./creategame.po');
  })


  it('should accept game name and username', function() {



    page.gameName.sendKeys('Christmas');
    page.userName.sendKeys('BabyJesus');

    page.createGameButton.click();
    browser.waitForAngular();

    var tictactoe = require('./tictactoe.po');

    expect(tictactoe.board).toBeDefined();
    expect(tictactoe.x0y0).toBeDefined();
  })




});
