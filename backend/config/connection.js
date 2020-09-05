const mysql = require('mysql');
const settings = require('../config/settings');
const activeDatabase = settings.activeDatabase;

const connection = mysql.createPool(activeDatabase);

module.exports.connection = connection;
