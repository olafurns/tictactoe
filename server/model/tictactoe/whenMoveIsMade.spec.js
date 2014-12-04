var should = require('should');
var _ = require('lodash');

describe('make move command', function(){

  var tictactoe = require('./tictactoe.js');

  it('should emit move made event', function(){

    var given = [{
      event: "GameCreated",
      user:{
        userName:"Jesus"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:06:00"

    },
      {
        event: "GameJoined",
        user:{
          userName:"God"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:08:00"

      }];

    var when = {
      cmd:"MakeMove",
      user:{
        userName:"Jesus"
      },
      move: {
        grid:"0",
        symbol:"X"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:12:00"
    };

    var then = [{
      event:"MoveMade",
      user:{
        userName:"Jesus"
      },
      move:{
        grid:"0",
        symbol:"X"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);

    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit reject move when not player turn', function(){
    var given = [{
      event: "GameCreated",
      user:{
        userName:"Jesus"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:06:00"

    },
      {
        event: "GameJoined",
        user:{
          userName:"God"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:08:00"

      },
      {
        event:"MoveMade",
        user:{
          userName:"Jesus"
        },
        move:{
          grid:"0",
          symbol:"X"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      }
    ];

    var when = {
      cmd:"MakeMove",
      user:{
        userName:"Jesus"
      },
      move:{
        grid:"1",
        symbol:"X"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:12:00"
    };

    var then = [{
      event:"NotPlayerTurn",
      user:{
        userName:"Jesus"
      },
      move:{
        grid:"1",
        symbol:"X"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(actualEvent.length).be.exactly(1);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit reject move when position not free', function(){
    var given = [{
      event: "GameCreated",
      user:{
        userName:"Jesus"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:06:00"

    },
      {
        event: "GameJoined",
        user:{
          userName:"God"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:08:00"

      },
      {
        event:"MoveMade",
        user:{
          userName:"Jesus"
        },
        move:"0",
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      }
    ];

    var when = {
      cmd:"MakeMove",
      user:{
        userName:"God"
      },
      move:"0",
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:12:00"
    };

    var then = [{
      event:"SpotTaken",
      user:{
        userName:"God"
      },
      move:"0",
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:12:00"
    }];
    ////
    var actualEvent = tictactoe(given).executeCommand(when);
    should(actualEvent.length).be.exactly(1);

    console.log(actualEvent);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit player one wins with top row', function(){
    var given = [{
      event: "GameCreated",
      user:{
        userName:"Jesus"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:06:00"

    },
      {
        event: "GameJoined",
        user:{
          userName:"God"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:08:00"

      },
      {
        event:"MoveMade",
        user:{
          userName:"Jesus"
        },
        move:{
          grid:"0",
          symbol:"X"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      },
      {
        event:"MoveMade",
        user:{
          userName:"God"
        },
        move:{
          grid:"3",
          symbol:"0"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      },
      {
        event:"MoveMade",
        user:{
          userName:"Jesus"
        },
        move:{
          grid:"1",
          symbol:"X"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      },
      {
        event:"MoveMade",
        user:{
          userName:"God"
        },
        move:{
          grid:"4",
          symbol:"0"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      }
    ];

    var when = {
      cmd:"MakeMove",
      user:{
        userName:"Jesus"
      },
      move:{
        grid:"2",
        symbol:"X"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:12:00"
    };

    var then = [{
      event:"GameWon",
      user:{
        userName:"Jesus"
      },
      move:{
        grid:"2",
        symbol:"X"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(actualEvent.length).be.exactly(1);

    console.log(actualEvent);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });
  it('should emit game ends with draw', function(){
    var given = [{
      event: "GameCreated",
      user:{
        userName:"Jesus"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:06:00"

    },
      {
        event: "GameJoined",
        user:{
          userName:"God"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:08:00"

      },
      {
        event:"MoveMade",
        user:{
          userName:"Jesus"
        },
        move:{
          grid:"0",
          symbol:"X"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      },
      {
        event:"MoveMade",
        user:{
          userName:"God"
        },
        move:{
          grid:"1",
          symbol:"0"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      },
      {
        event:"MoveMade",
        user:{
          userName:"Jesus"
        },
        move:{
          grid:"2",
          symbol:"X"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      },
      {
        event:"MoveMade",
        user:{
          userName:"God"
        },
        move:{
          grid:"4",
          symbol:"0"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      },{
        event:"MoveMade",
        user:{
          userName:"Jesus"
        },
        move:{
          grid:"3",
          symbol:"X"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      },
      {
        event:"MoveMade",
        user:{
          userName:"God"
        },
        move:{
          grid:"6",
          symbol:"0"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      },
      {
        event:"MoveMade",
        user:{
          userName:"Jesus"
        },
        move:{
          grid:"5",
          symbol:"X"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      },
      {
        event:"MoveMade",
        user:{
          userName:"God"
        },
        move:{
          grid:"8",
          symbol:"0"
        },
        name:"RiseOfTheDead",
        timeStamp:"2014-01-01T03:12:00"
      }
    ];

    var when = {
      cmd:"MakeMove",
      user:{
        userName:"Jesus"
      },
      move:{
        grid:"7",
        symbol:"X"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:12:00"
    };

    var then = [{
      event:"GameDraw",
      user:{
        userName:"Jesus"
      },
      move:{
        grid:"7",
        symbol:"X"
      },
      name:"RiseOfTheDead",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(actualEvent.length).be.exactly(1);

    console.log(actualEvent);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });



});
