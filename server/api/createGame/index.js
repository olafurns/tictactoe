'use strict';

var express = require('express');

var controller = require('../command.controller.js');


module.exports = function(app){

  var router = express.Router();

  router.post('/', controller.executeCommand);

  return {
    router:router 
  }

}

