var db = require('../db');


module.exports = {
  messages: {
    get: function (callback) {
      db.query(db.read(), function (messages) {
        console.log('mesasge in models callback', messages);
        callback(messages);
      });
    }, // a function which produces all the messages
    post: function (messageObj, callback) {
      db.query(db.doesUserExist(messageObj), function (username) {
        console.log('username exists:', !!username.length);
        if (!username.length) {
          db.query(db.addUser(messageObj), function (table) {
            if (table.affectedRows > 0) {
              console.log('successfully added username to db');
              db.query(db.write(messageObj), function(result) {
                if (result.affectedRows > 0) {
                  console.log('successfully wrote message to db');
                  callback();
                }
                else {
                  console.log('error, no rows affected when writing message')
                }
              });
            }
            else {
              console.log('error, no rows affected in table when adding username');
            }
          });
        }
        else {
          db.query(db.write(messageObj), function(result) {
            if (result.affectedRows > 0) { console.log('successfully wrote message to db'); }
            else { console.log('error, no rows affected when writing message') }
          });
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

// module.exports.messages.get();
