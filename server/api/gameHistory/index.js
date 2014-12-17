/**
 * Created by olafurns on 17.12.2014.
 */

'use strict';

var express = require('express');

var controller = require('./gameHistory.controller');

module.exports = function(app) {

  var router = express.Router();

  router.get('/:id', controller.index);
  return {
    router:router
  }
};
