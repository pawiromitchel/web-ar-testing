const connection = require('../config/connection').connection;

module.exports.listAll = (callback) => {
  // const connection = mysql.createConnection(activeDatabase);
  connection.query(`
        SELECT * FROM assets
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