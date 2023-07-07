const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  }
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  votes: {
    type: Number,
    default: 0,
  },
  answers: [answerSchema]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;