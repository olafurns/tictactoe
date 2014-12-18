var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')

var createEvent = {
  event: 'GameCreated',
  user: {
    userName: 'Jesus'
  },
  name: 'TheFirstGame',
  timeStamp: '2014-12-02T11:29:29'
};

var joinEvent = {
  event: 'GameJoined',
  user: {
    userName: 'God'
  },
  name: 'TheFirstGame',
  timeStamp: '2014-12-02T11:29:29'
};

function moveEvent(coordinates, side) {
  return {
    event: 'MovePlaced',
    user: {
      userName: 'God'
    },
    name: 'TheFirstGame',
    timeStamp: '2014-12-02T11:29:29',
    move: {
      coordinates: coordinates,
      side: side
    }
  };
}

/* jshint ignore:start */

describe('place move command', function () {

  var given, when, then;

  afterEach(function () {
    var actualEvents = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });

  it('should emit MovePlaced on first game move', function () {

    given = [
      createEvent, joinEvent
    ];
    when =
    {
      cmd: 'PlaceMove',
      user: {
        userName: 'God'
      },
      name: 'TheFirstGame',
      timeStamp: '2014-12-02T11:29:29',
      move:{
        coordinates:[0,0],
        side:'X'
      }
    };
    then = [
      moveEvent([0,0],'X')
    ];
  });

  it('should emit IllegalMove when move is illegal.', function () {
    given = [
      createEvent,
      joinEvent,
      moveEvent([0,0],'X')
    ];

    when =
    {
      cmd: 'PlaceMove',
      user: {
        userName: 'God'
      },
      name: 'TheFirstGame',
      timeStamp: '2014-12-02T11:29:29',
      move:{
        coordinates:[0,0],
        side:'X'
      }
    };
    then = [
      {
        event: 'IllegalMove',
        user: {
          userName: 'God'
        },
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29',
        move:{
          coordinates:[0,0],
          side:'X'
        }
      }
    ];

  }),

  it('should emit IllegalMove when center move is illegal.', function () {
    given = [
      createEvent,
      joinEvent,
      moveEvent([0,2],'X')
    ];

    when =
    {
      cmd: 'PlaceMove',
      user: {
        userName: 'God'
      },
      name: 'TheFirstGame',
      timeStamp: '2014-12-02T11:29:29',
      move:{
        coordinates:[0,2],
        side:'X'
      }
    };
    then = [
      {
        event: 'IllegalMove',
        user: {
          userName: 'God'
        },
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29',
        move:{
          coordinates:[0,2],
          side:'X'
        }
      }
    ];
  });


  it('Should emit game won on top line fill', function () {
    given = [
      createEvent,
      joinEvent,
      moveEvent([0,0],'X'),
      moveEvent([0,1],'X')
    ];

    when =
    {
      cmd: 'PlaceMove',
      user: {
        userName: 'God'
      },
      name: 'TheFirstGame',
      timeStamp: '2014-12-02T11:29:29',
      move:{
        coordinates:[0,2],
        side:'X'
      }
    };
    then = [
      moveEvent([0,2],'X'),
      {
        event: 'GameWon',
        user: {
          userName: 'God'
        },
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
      }
    ];

  });

  it('Should emit game won on diagonal line fill', function () {
    given = [
      createEvent,
      joinEvent,
      moveEvent([0,0],'X'),
      moveEvent([1,1],'X')
    ];

    when =
    {
      cmd: 'PlaceMove',
      user: {
        userName: 'God'
      },
      name: 'TheFirstGame',
      timeStamp: '2014-12-02T11:29:29',
      move:{
        coordinates:[2,2],
        side:'X'
      }
    };
    then = [
      moveEvent([2,2],'X'),
      {
        event: 'GameWon',
        user: {
          userName: 'God'
        },
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
      }
    ];

  });

  it('Should emit game won on vertical line fill', function () {
    given = [
      createEvent,
      joinEvent,
      moveEvent([0,0],'O'),
      moveEvent([1,1],'O')
    ];

    when =
    {
      cmd: 'PlaceMove',
      user: {
        userName: 'God'
      },
      name: 'TheFirstGame',
      timeStamp: '2014-12-02T11:29:29',
      move:{
        coordinates:[2,2],
        side:'O'
      }
    };
    then = [
      moveEvent([2,2],'O'),
      {
        event: 'GameWon',
        user: {
          userName: 'God'
        },
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
      }
    ];

  });


  it('Should not emit game draw if won on last move.', function () {
    given = [
      createEvent,
      joinEvent,
      moveEvent([0,0],'X'),
       moveEvent([0,1],'O'),
        moveEvent([0,2],'O'),

      moveEvent([1,0],'O'),
       moveEvent([1,1],'O'),
        moveEvent([1,2],'X'),

      moveEvent([2,0],'X'),
       moveEvent([2,2],'X')
    ];

    when =
    {
      cmd: 'PlaceMove',
      user: {
        userName: 'God'
      },
      name: 'TheFirstGame',
      timeStamp: '2014-12-02T11:29:29',
      move:{
        coordinates:[2,1],
        side:'O'
      }
    };
    then = [
      moveEvent([2,1],'O'),
      {
        event: 'GameWon',
        user: {
          userName: 'God'
        },
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
      }
    ];

  });

  it('Should emit game draw when neither wins', function () {
    given = [
      createEvent,
      joinEvent,
      moveEvent([0,0],'X'),
      moveEvent([0,1],'O'),
      moveEvent([0,2],'O'),
      moveEvent([1,0],'O'),
      moveEvent([1,1],'O'),
      moveEvent([1,2],'X'),
      moveEvent([2,0],'X'),
      moveEvent([2,1],'X')
    ];

    when =
    {
      cmd: 'PlaceMove',
      user: {
        userName: 'God'
      },
      name: 'TheFirstGame',
      timeStamp: '2014-12-02T11:29:29',
      move:{
        coordinates:[2,2],
        side:'O'
      }
    };
    then = [
      moveEvent([2,2],'O'),
      {
        event: 'GameDraw',
        user: {
          userName: 'God'
        },
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
      }
    ];

  });



});
/* jshint ignore:end */
