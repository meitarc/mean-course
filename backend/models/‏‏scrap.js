const mongoose = require('mongoose');

const scrapSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  summery: {
    type: String,
    required: false
  },
  len: {
    type: String,
    required: false
  },
  director: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Scrap', scrapSchema)
