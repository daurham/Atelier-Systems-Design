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
    // query = `SELECT json_agg(json_build_object('review_id',reviews.id,'rating', reviews.rating,'summary', reviews.summary,'recommend', reviews.recommend,'response', reviews.response,'body', reviews.body,'date', reviews.date,'reviewer_name', reviews.reviewer_name,'helpfulness', reviews.helpfulness,'photos', (SELECT coalesce(photos, '[]'::json) FROM (SELECT json_agg(json_build_object( 'id', reviews_photos.id,'url', reviews_photos.url) ) AS photos from reviews_photos WHERE reviews_photos.review_id = reviews.id) AS photos))) AS results FROM reviews WHERE product_id = $1`;
    // query = `SELECT r.id AS review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, json_agg( json_build_object( 'id', p.id, 'url', p.url ) ) AS photos FROM reviews AS r JOIN reviews_photos AS p ON r.id = p.review_id WHERE product_id = $1 GROUP BY r.id`;
  }
  return query;
};
const meta = (req, res, endpoint, time, test) => {
  // DOES NOT WORK
  let query;
  if (time) {
    query = 'explain (analyze, timing, format json) ';
  } else if (test) {
    query = ''
  } else {
    query = ''
  }
  return query;
};
const post = (req, res, endpoint, time, test) => {
  // DOES NOT WORK
  let query;
  if (time) {
    query = 'explain (analyze, timing, format json) ';
  } else if (test) {
    query = ''
  } else {
    query = `
    insert into reviews (product_id, rating, summary, body, recommend, name, email)
      values ($1, $2, $3, $4, $5, $6, $7);

    insert into reviews_photos (url, review_id)
      values ();

    insert into characteristic_reviews (characteristic_id, value, review_id)
      values (req.body.characteristics.characteristic_id, req.body.characteristics.value);

    insert into characteristics (product_id, name, characteristic_id)
      values ($1, );`;
  }
  return query;
};
const helpful = (req, res, endpoint, time, test) => {
  // DOES NOT WORK
  // create a new table name meta with helpfulness col and add up all the helpfulness ratings per thing.
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

const getPhotos = (id, callback) => {
  // DOES NOT WORK
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
