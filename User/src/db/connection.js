var mysql = require('mysql');
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'user_db',
  port: process.env.DB_PORT || '8889',
  // host: 'localhost',
  // user: 'root',
  // password: 'root',
  // database: 'user_db',
  // port: '8889',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to DB:', err);
  } else {
    console.log('Connected to database');

  }
});

// const db = mysql.createConnection({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'root',
//   database: process.env.DB_DATABASE || 'testdb54',
//   port: process.env.DB_PORT || '8889',
// })


module.exports = db;