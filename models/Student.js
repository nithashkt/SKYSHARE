const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({

  id_user_value: {
    type: String,
    required: true
  },
  code_title: {
    type: String,
    required: true
  },
  code_desc: {
    type: String,
    //required: true
  },
  code_new: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Shop = mongoose.model('Student', StudentSchema);

module.exports = Shop;
