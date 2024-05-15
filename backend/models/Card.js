//Modelo de datos de las Cards

const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['to-do', 'doing', 'done'],
    default: 'to-do'
  }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;