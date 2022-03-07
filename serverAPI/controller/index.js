const model = require('../model/index.js');
const setQuery = require('./queries');
const recordTime = require('./buildData');
const response = require('./response');


const reviews = function (req, res, endpoint, time, test) {
  let data = {};
  let query = setQuery.reviews(req, res, endpoint, time, test);

  model.reviews(query, data, endpoint, (err, result) => {
    response.get(req, res, err, result);
    if (time) {
      recordTime.reviews(req, res, endpoint, time, test);
    }
  });
};

const meta = function (req, res, endpoint, time) {
  let data = {};
  let query = setQuery.meta(req, res, endpoint, time, test);

  model.meta(query, data, endpoint, (err, result) => {
    response.get(req, res, err, result);
    if (time) {
      recordTime.meta(req, res, endpoint, time);
    }
  });
};

const post = function (req, res, endpoint, time) {
  let data = {};
  let query = setQuery.post(req, res, endpoint, time, test);

  model.post(query, data, endpoint, (err, result) => {
    response.post(req, res, err, result)
    if (time) {
      recordTime.post(req, res, endpoint, time);
    }
  });
};

const helpful = function (req, res, endpoint, time) {
  let data = {};
  let query = setQuery.helpful(req, res, endpoint, time, test);

  model.helpful(query, data, endpoint, (err, result) => {
    response.put(req, res, err, result)
    if (time) {
      recordTime.helpful(req, res, endpoint, time);
    }
  });
};

const report = function (req, res, endpoint, time) {
  let data = {};
  let query = setQuery.report(req, res, endpoint, time, test);

  model.report(query, data, endpoint, (err, result) => {
    response.put(req, res, err, result)
    if (time) {
      recordTime.report(req, res, endpoint, time);
    }
  });
};

module.exports = { reviews, meta, post, helpful, report };