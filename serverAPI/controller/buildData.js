/* This file is strictly for processing a data structre for my timed testing endpoint. To test, add "/time" at the end of the endpoint and the speed will be logged at the top of  speed_records.txt file and the bottom of speed_records.json. */

const recordTime = require('../../speed_test.js');
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();
let end;

const reviews = (req, res, endpoint, time, result, query) => {
  end = window.performance.now();
  let myData = `
      "Execution Time: Network Request": ${(Math.round((end - time) * 100) / 100)},
      "Execution Time: Query": ${result.rows[0]['QUERY PLAN'][0]['Execution Time']},
      "Net.Req. Method": "GET",
      "Enpoint": "${endpoint}",
      "Query": [${JSON.stringify(query.replace(/\s/g, ''), null, 0)}]
      `;
  result.rows[0]['QUERY PLAN'].push(JSON.parse(('{' + myData + '}')));
  recordTime(myData, result.rows);
};

const meta = (req, res, endpoint, time, result, query) => {
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
};

const post = (req, res, endpoint, time, result, query) => {
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
};
const helpful = (req, res, endpoint, time, result, query) => {
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
};

const report = (req, res, endpoint, time, result, query) => {
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
};

module.exports = { reviews, meta, post, helpful, report };