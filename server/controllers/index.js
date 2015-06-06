var models = require('../models');
var bluebird = require('bluebird');
var http = require('./http-helpers.js');


module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function (allMessages) {
        http.sendResponse(res, 200, allMessages);
      });


    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // var newMessage = JSON.parse(req.body);
      models.messages.post(req.body, function () {
        http.sendResponse(res, 201, 'message posted!');
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  },

};
