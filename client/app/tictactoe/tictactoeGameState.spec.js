/**
 * Created by olafurns on 17.12.2014.
 */


'use strict'

describe('Factory: TicTacToeState', function(){

  var gameState;

  beforeEach(module('tictactoeApp'));

  beforeEach(inject(function(_gameState_){
    gameState = _gameState_

  }));


  it('Should add other player to game when joined', function() {

    gameState.mutate([{
      event: 'GameJoined',
      user: {
        userName:'Jesus',
        symbol:'0'
      },
      name: 'RiseOfTheDead',
      timeStamp:'2014-12-02T00:00:01'

    }]);

    expect(gameState.otherPlayer.userName).toBe('Jesus');
  });





});
