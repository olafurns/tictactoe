/**
 * Created by olafurns on 3.12.2014.
 */

  //var gameBoard = ['','','',
  //                 '','','',
  //                 '','',''];
var _ = require('lodash');

module.exports = function(grid, symbol){

    var win = false;

    for (var i = 0; i <= 6; i = i + 3) {
      if (grid[i] === symbol && grid[i + 1] === symbol && grid[i+2] === symbol)
        win = true;
        }
    for(i = 0; i < 3; i++){
      if(grid[i] === symbol && grid[i+3] === symbol && grid[i+6] === symbol){
        win = true;
      }
    }
    if(grid[0] === symbol && grid[4] === symbol && grid[8] === symbol){
      win = true;
    }
    if(grid[2] === symbol && grid[4] === symbol && grid[6] === symbol){
      win = true;
    }

  if(grid[0] ===  symbol && grid[1] === symbol && grid[2] === symbol)
    win = true;

  if(grid[0] === symbol && grid[1] === symbol && grid[2] === symbol)
    win = true;

   return win;


}
