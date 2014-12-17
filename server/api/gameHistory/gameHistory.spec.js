/**
 * Created by olafurns on 17.12.2014.
 */



'use strict';

var should = require('should');
var app = require('../../app');

var request = require('supertest');

describe('GET /api/gameHistory', function() {


  it('should respond with JSON array with created events for game', function(done) {
    //
    request(app)
      .get('/api/gameHistory/1337')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end(function (err, res) {

        if(err) return done(err);
        res.body.should.be.instanceof(Array);
        should(res.body).eql(
          [{
            'event': 'GameCreated',
            'id': '1337',
            'user': {
              'userName':'Jesus'
            },
            'name': 'RiseOfTheDead',
            'timeStamp': '2014-12-02T01:01:01'

          }]);
        done();

      })

  })

});
