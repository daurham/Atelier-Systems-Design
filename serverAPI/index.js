const express = require('express');
const path = require('path');
const controller = require('./controller/index.js');
// const recordTime = require('../speed_test.js');
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();
const app = express();
const PORT = 3000 || porcess.env.PORT;
const directory = 'client/dist';
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


const reviews = '/reviews/'; // query: page, count, sort, product_id
const meta = '/reviews/meta'; // param: product_id
const post = '/reviews'; // body: product_id, rating, summary, body, recommend, name, email, photos, characteristics
const helpful = '/reviews/:review_id/helpful'; // param: r_id
const report = '/reviews/:review_id/report'; // param: r_id

// Main Listeners:
app.get(reviews, (req, res) => controller.reviews(req, res, reviews));
app.get(meta, (req, res) => controller.meta(req, res, meta));
app.post(post, (req, res) => controller.meta(req, res, post));
app.put(helpful, (req, res) => controller.helpful(req, res, helpful));
app.put(report, (req, res) => controller.report(req, res, report));

// Testing
app.get(reviews + 'test', (req, res) => controller.reviews(req, res, null, null, true));
app.get(meta + '/test', (req, res) => controller.meta(req, res, null, null, true));
app.post(post + '/test', (req, res) => controller.post(req, res, null, null, true));
app.put(helpful + '/test', (req, res) => controller.helpful(req, res, null, null, true));
app.put(report + '/test', (req, res) => controller.report(req, res, null, null, true));

// Timeing
app.get(reviews + 'time', (req, res) => controller.reviews(req, res, reviews, window.performance.now()));
app.get(meta + '/time', (req, res) => controller.meta(req, res, meta, widnow.performance.now()));
app.post(post + '/time', (req, res) => controller.post(req, res, post, widnow.performance.now()));
app.put(helpful + '/time', (req, res) => controller.helpful(req, res, helpful, widnow.performance.now()));
app.put(report + '/time', (req, res) => controller.report(req, res, report, widnow.performance.now()));


app.listen(PORT, () => console.log(`listening to port ${PORT}`));
app.use(express.static(`${directory}`))

module.exports = { app };
