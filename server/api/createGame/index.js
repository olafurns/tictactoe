/**
 * Created by olafurns on 16.12.2014.
 */

'use strict';

var express = require('express');
var controller = require('../command.controller');

module.exports = function(app) {

  var router = express.Router();


  router.post('/', controller.executeCommand);

  return {
    router:router
  }
};
