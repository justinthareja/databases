var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = exports.connection = mysql.createConnection({

  host: 'localhost',
  port: 3306,
  database: 'chat',
  user: 'root'

});

connection.connect(function(err) {
  if (err) console.log(err);
  console.log("Successfully opened connection to MYSQL database");
});

exports.read = function () {
              return 'SELECT users.username, messages.text' +
              ' FROM users, messages' +
              ' WHERE users.id = messages.id_users;';
            };
exports.doesUserExist = function(msgObj) {
                        return "SELECT username FROM users WHERE username = '" + msgObj.username + "';";
                        };

exports.addUser = function(msgObj) {
                  return "INSERT INTO users(username) VALUES ('" + msgObj.username + "');";
                  }
exports.write = function(msgObj) {
                return "INSERT INTO messages (id_users, text) SELECT id, '" +
                msgObj.text + "' FROM users where username = '" +
                msgObj.username + "';";
                }

var query = exports.query = function (sqlString, callback) {
  connection.query(sqlString, function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    callback(results);
  });
};

