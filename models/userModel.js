// models/userModel.js
const mysql = require('mysql2');
const db = require('../config/db');  // Import database connection

// User model - find user by email
exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

// User model - create new user
exports.create = (userData) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
                  [userData.username, userData.email, userData.password], 
                  (err, results) => {
            if (err) return reject(err);
            resolve({ id: results.insertId, ...userData });
        });
    });
};
