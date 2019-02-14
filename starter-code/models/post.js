const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = Schema({
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  photoURL: String,
  picPath: String,
  picName: String,
});

const User = mongoose.model('Post', postSchema);

module.exports = User;
