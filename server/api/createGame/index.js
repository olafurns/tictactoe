/**
 * Created by olafurns on 12.12.2014.
 */

'use strict'

var express = require('express');

var controller = require('./createGame.controller');

module.exports = function(app) {

  var router = express.Router();

  console.debug("Adding post to router");

  router.post('/', controller.createGame);

  return {

    router: router
  }
}