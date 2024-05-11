const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Admin', 'User'],
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
