const config = require("config");
const mysql = require("mysql2/promise");

const con = mysql.createConnection({
  connectionLimit: 50,
  host: config.get("dbHost"),
  user: config.get("dbUser"),
  password: config.get("dbPWD"),
  database: config.get("database"),
});

module.exports = con;
