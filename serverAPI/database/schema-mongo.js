const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  id: Number,
  project_id: Number,
  rating: Number,
  summary: String,
  recommended: Number,
  body: String,
  response: String,
  date: new Date(),
  reviewer_name: String,
  helpfullness: Number,
  photos: [
    id: Number,
    url: String
  ],
});
const metaSchema = new mongoose.Schema({
  project_id: Number,
  recommended: {
    true: String,
    false: String,
  },
  ratings: {
    id: Number,
  }
});
const characteristicSchema = new mongoose.Schema({
  project_id: Number,
  characteristic: {
    type: String,
    char_id: Number,
    value: String,
  },
});

const review = mongoose.model('Review', reviewSchema)
const meta = mongoose.model('Review', reviewSchema)
const characteristic = mongoose.model('Review', reviewSchema)

module.exports = { review, meta, characteristic };