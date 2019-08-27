const mongoose = require('mongoose');

const scrap = mongoose.Schema({
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
    required: true
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

module.exports = mongoose.model('scrap', scrap)
