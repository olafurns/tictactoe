/**
 * Created by olafurns on 15.12.2014.
 */

'use strict';


var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/placeMove', function() {

  it('should respond with event in JSON array', function(done){
    var command = {
      id: "1337",
      cmd:"MakeMove",
      user:{
        userName:"Jesus"
      },
      name:"RiseOfTheDead",
      timeStamp: "2014-12-02T01:01:01",
      move: {
        grid:"0",
        symbol:"X"
      }
    };

    var req = request(app);

    req
      .post('api/makeMove')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if(err) return done(err)
        res.body.should.be.instanceof(Array);
        done();
      });
  });



});
