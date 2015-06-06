var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = exports.connection = mysql.createConnection({

  host: 'localhost',
  port: 3000,
  database: 'chat',
  user: 'root'

});

connection.connect(function(err) {
  if (err) console.log(err);
  console.log("Successfully opened connection to MYSQL database");
});


connection.query();
