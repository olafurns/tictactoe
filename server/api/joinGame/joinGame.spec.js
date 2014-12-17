/**
 * Created by olafurns on 15.12.2014.
 */

'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/joinGame', function() {


  it('should respond with event in JSON array', function(done){
    var command = {
      id: "1337",
      cmd: "JoinGame",
      user: {
        userName: "Jesus"
      },
      name: "RiseOfTheDead",
      timeStamp: "2014-12-02T01:01:01"
    };

    var req = request(app);

    req
      .post('/api/joinGame')
      .type('json')
      .send(command)
      .end(function(err,res){
        if(err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });



  })

})

