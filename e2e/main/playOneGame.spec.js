'use strict';
console.debug = console.log;

var gameDSL = require('./game.originaldsl.js');

describe('Tictactoe game play', function () {
  var createPage;
  var joinPage;

  beforeEach(function () {
    browser.get('/');
    createPage = require('./creategame.po');
    joinPage = require('./joingame.po');
  });

  function placeMove(cellElement, expected) {
    cellElement.click();
    browser.sleep(1000);
    expect(cellElement.getText()).toBe(expected);
  }

  it('should play to win', function () {
    createPage.gameName.sendKeys("Christmas ");
    createPage.userName.sendKeys("God");

    createPage.createGameButton.click();

    var tictactoe = require('./tictactoe.po');

    expect(tictactoe.board).toBeDefined();

    expect(tictactoe.x0y0).toBeDefined();

    tictactoe.x0y0.click();
    expect(tictactoe.x0y0.getText()).toBe('X');


    tictactoe.joinLink.getAttribute('href').then(function (joinHref) {

// handle of first window
      browser.getAllWindowHandles().then(function (handles) {

        var creatorHandle = handles[0];

        var joinerHandle = 'second-window';
        browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

        // switch to new window
        browser.switchTo().window(joinerHandle);

        joinPage.userName.sendKeys("BabyJesus");
        joinPage.joinGameButton.click();


        browser.driver.wait(function () {
          return browser.driver.isElementPresent(by.css('#gameboard')).then(function (el) {
            return el === true;
          });
        }).then(function () {

          tictactoe.x1y1.click();
          expect(tictactoe.x1y1.getText()).toBe('O');

          expect(tictactoe.myname.getText()).toBe("BabyJesus");

          browser.switchTo().window(creatorHandle).then(function () {
            browser.driver.wait(function () {
              return browser.driver.isElementPresent(by.css('#gameboard')).then(function (el) {
                return el === true;
              });
            }).then(function () {

              expect(tictactoe.myname.getText()).toBe("God");

              browser.sleep(1000);
              tictactoe.x1y0.click();
              expect(tictactoe.x1y0.getText()).toBe('X');

              browser.switchTo().window(joinerHandle).then(function () {
                browser.driver.wait(function () {
                  return browser.driver.isElementPresent(by.css('#gameboard')).then(function (el) {
                    return el === true;
                  });
                }).then(function () {

                  expect(tictactoe.myname.getText()).toBe("BabyJesus");

                  tictactoe.x1y2.click();
                  browser.sleep(1000);
                  expect(tictactoe.x1y2.getText()).toBe('O');

                  browser.switchTo().window(creatorHandle).then(function () {
                    browser.driver.wait(function () {
                      return browser.driver.isElementPresent(by.css('#gameboard')).then(function (el) {
                        return el === true;
                      });
                    }).then(function () {

                      expect(tictactoe.myname.getText()).toBe("God");

                      placeMove(tictactoe.x2y0, 'X');

                      browser.sleep(500);

                      expect(tictactoe.winner).toBeDefined();

                    });
                  });
                });
              });
            });
          });

        });

        // do something within context of new window


      });

    });


  });
});
