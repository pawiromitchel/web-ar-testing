const connection = require('../config/connection').connection;

// JWT
const SecretKey = require("../config/jwt.json").secretKey;
const jwt = require('jsonwebtoken');

module.exports.FillUsers = (callback) => {
  // const connection = mysql.createConnection(activeDatabase);
  connection.query(`
        SELECT * FROM users
    `, (error, results, fields) => {
    if (error) {
      throw error;
    } else if (results.length > 0) {
      // connection.end();
      callback(false, results);
    } else {
      // connection.end();
      callback(false, null);
    }
  });
}

module.exports.authenticate = (data, callback) => {
  // const connection = mysql.createConnection(activeDatabase);		
  connection.query(`SELECT user_id, role_id, username, fullname, type_id, auto_assign, active FROM user WHERE username = ? and password = SHA2(?, 224)`, [
    data.username,
    data.password
  ], (error, results, fields) => {
    if (error) {
      throw error;
    } else if (results.length > 0) {
      /* Create the JWT */
      jwt.sign({
        results
      }, SecretKey, {
        // lifetime of 8 hours
        expiresIn: '28800s'
      }, (err, token) => {
        // set the token in the object
        results[0].token = token
        callback(false, results);
      });
    } else {	
      callback(false, null);
    }
  });
}