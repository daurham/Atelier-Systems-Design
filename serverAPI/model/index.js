const { Pool } = require('pg')
const dbPassword = require('../../config.js');

const pool = new Pool({
  host: 'localhost',
  user: 'daurham',
  database: 'ratings_reviews',
  port: 5432,
  password: `${dbPassword}`,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const reviews = function (query, data, endpoint, callback) {
  pool.query(query, callback);
};
const meta = function (data, endpoint, callback) {
  pool.query(query, [data], callback);
};
const post = function (data, endpoint, callback) {
  pool.query(query, [data], callback);
};
const helpful = function (data, endpoint, callback) {
  pool.query(query, [data], callback);
};
const report = function (data, endpoint, callback) {
  pool.query(query, [data], callback);
};

module.exports = { reviews, meta, post, helpful, report };