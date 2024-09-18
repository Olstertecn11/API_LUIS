const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'sql5.freesqldatabase.com',
  user: process.env.DB_USER || 'sql5703854',
  password: process.env.DB_PASSWORD || 'IXgEgR9uH7',
  database: process.env.DB_NAME || 'sql5703854',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
