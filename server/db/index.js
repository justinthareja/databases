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


var testmsg = {
  username: 'testUser',
  text: 'some string sent from clientside'
};


// get all messages from db
var sqlRead = 'SELECT users.username, messages.text' +
              'FROM users, messages' +
              'WHERE users.id = messages.id_users;';

var doesUserExist = "SELECT username FROM users WHERE username = '" + testmsg.username + "';";
var sqlAddUser = "INSERT INTO users(username) VALUES ('" + testmsg.username + "');";
// take testmsg and insert into database (only if username exists)
var sqlWrite = "INSERT INTO messages (id_users, text) SELECT id, '" + testmsg.text + "' FROM users where username = '" + testmsg.username + "';";


connection.query(sqlWrite, function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  // TODO: send appropriate response to client;
  console.log('Results from query: ', results);
});
