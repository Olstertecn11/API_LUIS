require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'sql5.freesqldatabase.com',
    user: process.env.DB_USER || 'sql5703854',
    password: process.env.DB_PASSWORD || 'IXgEgR9uH7',
    database: process.env.DB_NAME || 'sql5703854',
  }
};

