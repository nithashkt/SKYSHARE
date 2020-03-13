const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dist: {
    type: String,
    required: true
  },
  mobno: {
    type: String,
    required: true
  },
  madrasa_id: {
    type: String,
    required: true
  },
  madrasa_name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
