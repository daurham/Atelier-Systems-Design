const reviews = (req, res, endpoint, time, test) => {
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

module.exports = { reviews, meta, post, helpful, report };