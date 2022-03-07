const model = require('../model/index.js');

const reviews = (req, res, endpoint, time, test) => {
  let query;
  if (time) {
    query = 'explain (analyze, timing, format json) SELECT * FROM reviews where id = 5';
  } else if (test) {
    query = 'select * from reviews where id = 5'
  } else {
    query = 'select * from reviews where product_id = $1'
  }
  return query;
};
const meta = (req, res, endpoint, time, test) => {
  let query;
  if (time) {
    query = 'explain (analyze, timing, format json) SELECT * FROM reviews where id = 5';
  } else if (test) {
    query = 'select * from reviews where id = 5'
  } else {
    query = 'select * from reviews where id = 5'
  }
  return query;
};
const post = (req, res, endpoint, time, test) => {
  let query;
  if (time) {
    query = 'explain (analyze, timing, format json) SELECT * FROM reviews where id = 5';
  } else if (test) {
    query = 'select * from reviews where id = 5'
  } else {
    query = 'select * from reviews where id = 5'
  }
  return query;
};
const helpful = (req, res, endpoint, time, test) => {
  let query;
  if (time) {
    query = 'explain (analyze, timing, format json) SELECT * FROM reviews where id = 5';
  } else if (test) {
    query = 'select * from reviews where id = 5'
  } else {
    query = 'select * from reviews where id = 5'
  }
  return query;
};
const report = (req, res, endpoint, time, test) => {
  let query;
  if (time) {
    query = 'explain (analyze, timing, format json) SELECT * FROM reviews where id = 5';
  } else if (test) {
    query = 'select * from reviews where id = 5'
  } else {
    query = 'select * from reviews where id = 5'
  }
  return query;
};

const getPhotos = (id, callback) => {
  let query = 'select * from reviews_photos where review_id = $1'
  model.getPhotos(query, id, (err, result) => {
    if (err) {
      console.log('[model.getPhotos] Err: ', err);
      callback(err);
    } else {
      console.log('photos data: ', result.rows);
      res = [];
      result.rows.forEach((obj) => res.push({ "id": obj.id, "url": obj.url }));
      callback(null, res);
    }
  });
}

module.exports = { reviews, meta, post, helpful, report, getPhotos };