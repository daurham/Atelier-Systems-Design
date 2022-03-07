const model = require('../model/index.js');
const recordTime = require('../../speed_test.js');
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();
let end;

const reviews = function (req, res, endpoint, time, test) {
  let data = {};
  let query;
  console.log(time);
  if (time) {
    query = 'explain (analyze, timing, format json) SELECT * FROM reviews where id = 5';
  } else if (test) {
    query = 'select * from reviews where id = 5'
  } else {
    query = 'select * from reviews where id = 5'
  }

  model.reviews(query, data, endpoint, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);

      if (time) {
        end = window.performance.now();
        let myData = `
      "Execution Time: Network Request": ${(Math.round((end - time) * 100) / 100)},
      "Execution Time: Query": ${result.rows[0]['QUERY PLAN'][0]['Execution Time']},
      "Net.Req. Method": "GET",
      "Enpoint": "${endpoint}",
      "Query": "${query}"
      `;
        result.rows[0]['QUERY PLAN'].push(JSON.parse(('{' + myData + '}')));
        recordTime(myData, result.rows);
      }
    }
  });
};

const meta = function (req, res, endpoint, time) {
  let data = {};
  model.meta(query, data, endpoint, (err, result) => {
    if (err) {
      res.status(500).send(err);
      // res.sendStatus(500);
    } else {
      end = window.performance.now();
      recordTime(`
      "Enpoint": "${endpoint}",
      "ExecutionTime": "${end - time} ms"
      `, result.rows);
      res.status(200).send(result);
    }
  });
};

const post = function (req, res, endpoint, time) {
  let data = {};
  model.post(query, data, endpoint, (err, result) => {
    if (err) {
      res.status(500).send(err);
      // res.sendStatus(500);
    } else {
      end = window.performance.now();
      recordTime(`
      "Enpoint": "${endpoint}",
      "ExecutionTime": "${end - time} ms"
      `, result.rows); err
      res.status(200).send(result);
    }
  });
};

const helpful = function (req, res, endpoint, time) {
  let data = {};
  model.helpful(query, data, endpoint, (err, result) => {
    if (err) {
      res.status(500).send(err);
      // res.sendStatus(500);
    } else {
      end = window.performance.now();
      recordTime(`
      "Enpoint": "${endpoint}",
      "ExecutionTime": "${end - time} ms"
      `, result.rows);
      res.status(200).send(result);
    }
  });
};

const report = function (req, res, endpoint, time) {
  let data = {};
  model.report(query, data, endpoint, (err, result) => {
    if (err) {
      res.status(500).send(err);
      // res.sendStatus(500);
    } else {
      end = window.performance.now();
      result['Query-Used'] = query;
      recordTime(`
      "Enpoint": "${endpoint}",
      "ExecutionTime": "${end - time} ms"
      `, result.rows);
      res.status(200).send(result);
    }
  });
};

const reviewsTest = (req, res) => {
  let query = 'select * from reviews where id = 5'
  model.reviews(query, null, null, (err, result) => {
    if (err) res.sendStatus(500);
    if (!err) res.status(200).send(result);
  });
}
const metaTest = () => {
  let query = 'select rating from reviews where id = 5'
  model.meta(query, data, endpoint, (err, result) => {
  });
}
const postTest = () => {
  model.post(query, data, endpoint, (err, result) => {
  });
}
const helpfulTest = () => {
  model.helpful(query, data, endpoint, (err, result) => {
  });
}
const reportTest = () => {
  model.report(query, data, endpoint, (err, result) => {
  });
}

module.exports = { reviews, meta, post, helpful, report, reviewsTest, metaTest, postTest, helpfulTest, reportTest };