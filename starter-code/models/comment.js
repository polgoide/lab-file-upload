const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = Schema({
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  photoURL: String,
  picPath: String,
  picName: String,
});

module.exports = mongoose.model('Comment', commentSchema);
