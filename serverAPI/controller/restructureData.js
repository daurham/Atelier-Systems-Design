
const getPhotos = require('./queries').getPhotos;

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
    // return new Promise((resolve, reject) => {
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
          // responseCallback(err);
          error = err;
          // reject(err);
        } else {
          console.log('pic: ', photoData)
          review.photos.push(...photoData);
          base.results.push(review);
          // resolve(base);
          // responseCallback(null, base);
        }
      })

    })
  // })
  // console.log('Final Base: ', base);
  // if (error) {
  //   //   console.log('[getPhoto] Err: ', err);
  //   responseCallback(error);
  // } else {
  //   //   review.photos.push(...photoData);
  //   //   base.results.push(review);
  //   responseCallback(null, base);
  // }
};

const getMeta = (result) => {
  return result;
}

module.exports = { getReviews, getMeta }