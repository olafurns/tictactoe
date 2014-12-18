'use strict';

module.exports = function(page){

  var tictactoe;


  function nameUser(userName){

    page.userName.sendKeys(userName);
  }
  function nameGame(gameName)
  {
    page.gameName.sendKeys(gameName);
  }

  function createGame()
  {
    page.createGameButton.click();
  }

  function waitForTictactoePage(){
    browser.waitForAngular();
    tictactoe = require('./tictactoe.po');
  }

  function expectFirstCellShowing(){

    expect(tictactoe.x0y0).toBeDefined();
  }


  function expectGameBoardShowing(){
    expect(tictactoe.x0y0).toBeDefined();
  }
  return {
    nameUser:nameUser,
    nameGame:nameGame,
    createGame:createGame,
    waitForTictactoePage:waitForTictactoePage,
    expectFirstCellShowing:expectFirstCellShowing,
    expectGameBoardShowing:expectGameBoardShowing
  }




};
