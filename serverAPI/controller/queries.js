const model = require('../model/index.js');

const reviews = (req, res, endpoint, time, test) => {
  let query;
  if (time) {
    query = `explain (analyze, timing, format json) SELECT reviews.*, json_agg(
      json_build_object(
        'id', reviews_photos.id,
        'url', reviews_photos.url
      )
    ) AS photos FROM reviews JOIN reviews_photos
    ON reviews.id=reviews_photos.review_id WHERE reviews.product_id=$1 GROUP BY reviews.id`;
  } else if (test) {
    query = `SELECT reviews.*, json_agg(
      json_build_object(
        'id', reviews_photos.id,
        'url', reviews_photos.url
      )
    ) AS photos FROM reviews JOIN reviews_photos
    ON reviews.id=reviews_photos.review_id WHERE reviews.product_id=$1 GROUP BY reviews.id`;
  } else {
    query = `SELECT reviews.*, json_agg(
      json_build_object(
        'id', reviews_photos.id,
        'url', reviews_photos.url
        )
        ) AS photos FROM reviews JOIN reviews_photos
        ON reviews.id=reviews_photos.review_id WHERE reviews.product_id=$1 GROUP BY reviews.id`;
  }
  return query;
};
const helpful = (req, res, endpoint, time, test) => {
  let query;
  if (time) {
    query = `explain (analyze, timing, format json)
    update meta
      set helpfulness = helpfulness + 1
    where review_id = $1`;
  } else if (test) {
    query = `
    update meta
      set helpfulness = helpfulness + 1
    where review_id = $1`;
  } else {
    query = `
    update meta
      set helpfulness = helpfulness + 1
    where review_id = $1`;
  }
  return query;
};
const report = (req, res, endpoint, time, test) => {
  let query;
  if (time) {
    query = `explain (analyze, timing, format json)
             UPDATE reviews SET reported = NOT reported WHERE review_id = $1`;
  } else if (test) {
    query = `UPDATE reviews SET reported = NOT reported WHERE review_id = $1`;
  } else {
    query = `UPDATE reviews SET reported = NOT reported WHERE review_id = $1`;
  }
  return query;
};

module.exports = { reviews, meta, post, helpful, report, getPhotos };
