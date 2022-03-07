
const getPhotos = require('./queries').getPhotos;

const getReviews = (result, req, responseCallback) => {
  result = result.rows;
  console.log('Restructuring data: ', result);
  let base = {};
  base.product = result.product_id;
  base.page = req.query.page || 1;
  base.count = req.query.count || 5;
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
        responseCallback(err);
      } else {
        console.log('pic: ', photoData)
        review.photos.push(...photoData);
        base.results.push(review);
        responseCallback(null, base);
      }
    })
  })
  // if (err) {
  //   console.log('[getPhoto] Err: ', err);
  //   responseCallback(err);
  // } else {
  //   review.photos.push(...photoData);
  //   base.results.push(review);
  //   responseCallback(null, base);
  // }
};

const getMeta = (result) => {
  return result;
}

module.exports = { getReviews, getMeta }