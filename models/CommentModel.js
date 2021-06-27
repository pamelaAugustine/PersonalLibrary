const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Comment Schema
const CommentSchema = new Schema({
  text: {
      type: String,
      required: true
  },
  reference: {
      type: String,
      required: true
  }
})

// Create Comment Model
const CommentModel = mongoose.model('comment', CommentSchema);
module.exports = CommentModel