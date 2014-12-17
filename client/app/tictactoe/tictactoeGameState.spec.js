/**
 * Created by olafurns on 17.12.2014.
 */


'use strict';

describe('Factory: TicTacToeState', function(){

  var gameState;

  beforeEach(module('tictactoeApp'));

  beforeEach(inject(function(_gameState_){
    gameState = _gameState_;

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

  it('Should store game id from created in game state', function() {

    gameState.mutate( [{
      event: 'GameCreated',
      id: '5812345',
      user: {
        userName:'Jesus',
        symbol: '0'
      },
      name: 'RiseOfTheDead',
      timeStamp:'2014-12-02T00:00:01'

    }]);


    expect(gameState.id).toBe('5812345');
  });


  it('Should add move 1 to board', function() {

    gameState.mutate([{
      event:'MoveMade',
      user: {
        userName: 'Jesus'
      },
      name: 'RiseOfTheDead',
      timeStamp:'2014-12-02T00:00:01',
      move: {
        grid: 1,
        symbol: 'X'
      }
    }]);

    expect(gameState.board[1]).toBe('X');

  });

  it('Should add move 5 to board', function() {

    gameState.mutate([{
      event:'MoveMade',
      user: {
        userName: 'Jesus'
      },
      name: 'RiseOfTheDead',
      timeStamp:'2014-12-02T00:00:01',
      move: {
        grid: 5,
        symbol: 'X'
      }
    }]);

    expect(gameState.board[5]).toBe('X');

  });


  it('Should mark myTurn true if last event was from other side.', function() {
   gameState.me = {symbol:'0'};
    gameState.mutate([{
      event: 'MoveMade',
      user: {
        userName: 'Jesus'
      },
      name: 'RiseOfTheDead',
      timeStamp:'2014-12-02T00:00:01',
      move: {
        grid: 5,
        symbol: 'X'
      }

    }]);

    expect(gameState.myTurn).toBe(true);

  });

  it('Should mark myTurn false if last event was from my side.', function() {
    gameState.me = {symbol:'X'};
    gameState.mutate([{
      event: 'MoveMade',
      user: {
        userName: 'Jesus'
      },
      name: 'RiseOfTheDead',
      timeStamp:'2014-12-02T00:00:01',
      move: {
        grid: 5,
        symbol: 'X'
      }

    }]);

    expect(gameState.myTurn).toBe(false);

  });





});
