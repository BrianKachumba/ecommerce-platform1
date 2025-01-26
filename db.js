// db.js
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Hello_world1!', // Replace with your MySQL password
  database: 'ecommerce_platform', // Your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export a promise-based pool for cleaner code
const promisePool = pool.promise();

module.exports = promisePool;
