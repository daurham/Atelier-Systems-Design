
const getPhotos = require('./queries').getPhotos;

// DOES NOT WORK

const getReviews = (result, req, responseCallback) => {
  let error;
  let base = {};
  base.page = Number(req.query.page) || 1;
  base.count = Number(req.query.count) || 5;
  result = result.rows;
  base.product = req.query.product_id;
  console.log('Restructuring data: ', result);
  base.results = []
  result.forEach((result) => {
      let review = {
        "review_id": result.id,
        "rating": result.rating,
        "summary": result.summary,
        "recommend": result.recommend,
        "response": result.response,
        "body": result.body,
        "date": result.date,
        "reviewer_name": result.reviewer_name,
        "helpfulness": result.helpfulness,
        "photos": []
      };
      getPhotos(review.review_id, (err, photoData) => {
        if (err) {
          console.log('[getPhoto] Err: ', err);
          error = err;
        } else {
          console.log('pic: ', photoData)
          review.photos.push(...photoData);
          base.results.push(review);
        }
      })

    })
};

const getMeta = (result) => {
  return result;
}

module.exports = { getReviews, getMeta }