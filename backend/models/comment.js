const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  commentDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Comment', commentSchema)
