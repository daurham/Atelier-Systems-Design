// const controller = require('./controller/index.js');
const express = require('express');
const path = require('path');
const recordTime = require('../speed_test.js');
const dbPassword = require('../config.js');
const app = express();
const PORT = 3000 || porcess.env.PORT;
const directory = 'client/dist';
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const { JSDOM } = require("jsdom");
const { window } = new JSDOM();
var start = window.performance.now();


const { Pool } = require('pg')
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

const model = (id, endpoint, callback) => {
  let queryStr;
  if (endpoint.indexOf('meta') > -1) {
    queryStr = 'SELECT * FROM product WHERE id = $1 limit 3';
  } else {
    queryStr = 'SELECT * FROM reviews WHERE id = $1 limit 3';
  }
    pool.query(queryStr, [id], (err, data) => {
      callback(err, data, endpoint);
    })
};

const controller = (req, res, endpoint) => {
  model(req.params.id || 3, endpoint, (err, result, endpoint) => {
    if (err) {
      console.log('Err:', err);
      res.sendStatus(500);
    } else {
      res.status(200).send(result.rows);
    }
    var end = window.performance.now();

    recordTime(`
    "Enpoint": "${endpoint}",
    "ExecutionTime": "${end - start} ms"`);
  })
};

// endpoints:
const reviews = '/reviews/'
const meta = '/reviews/meta'

// Listeners:
const getReviewsFn = app.get(reviews, (req, res) => {controller(req, res, reviews)});
const getMetaFn = app.get(meta, (req, res) => {controller(req, res, meta)});


app.listen(PORT, () => console.log(`listening to port ${PORT}`));
app.use(express.static(`${directory}`))

// module.exports = getReviewsFn, getMetaFn;
