const { Pool } = require('pg')
const dbPassword = require('../../config.js');

// local:
// const pool = new Pool({
//   host: 'localhost',
//   user: 'daurham',
//   database: 'ratings_reviews',
//   port: 5432,
//   password: `${dbPassword}`,
//   max: 10,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// remote
const pool = new Pool({
  host: '3.95.11.89',
  user: 'daurham',
  database: 'ratings_reviews',
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