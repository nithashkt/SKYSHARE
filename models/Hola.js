const mongoose = require('mongoose');

const HolaSchema = new mongoose.Schema({
  name_disp: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Hola = mongoose.model('Hola', HolaSchema);

module.exports = Hola;
