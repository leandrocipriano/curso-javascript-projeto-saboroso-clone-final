const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    database: 'saboroso',
    password: '@2904SamLe'
  });

  module.exports = connection;