const { Pool } = require('pg')
const dbPassword = require('../../config.js').dbPassword;
const dbIP = require('../../config.js').dbIP;
const dbUser = require('../../config.js').dbUser;
const dbName = require('../../config.js').dbName;

const pool = new Pool({
  host: `${dbIP}`,
  user: `${dbUser}`,
  database: `${dbName}`,
  port: 5432,
  password: `${dbPassword}`,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const reviews = function (query, data, callback) {
  pool.query(query, [data], callback);
};
const meta = function (query, data, callback) {
  pool.query(query, [data], callback);
};
const post = function (query, data, callback) {
  pool.query(query, [data], callback);
};
const helpful = function (query, data, callback) {
  pool.query(query, [data], callback);
};
const report = function (query, data, callback) {
  pool.query(query, [data], callback);
};
const getPhotos = function (query, id, callback) {
  pool.query(query, [id], callback);
};

module.exports = { reviews, meta, post, helpful, report, getPhotos };