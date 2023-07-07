const Question = require('../Models/question');

const questionController = {
  getAllQuestions: async (req, res) => {
    try {
      const questions = await Question.find().populate('answers');
      res.json(questions);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get questions' });
      console.log(err);
    }
  },

  getQuestionById: async (req, res) => {
    try {
      const question = await Question.findById(req.params.id).populate('answers');
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.json(question);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get the question' });
      console.log(err);
    }
  },

  createQuestion: async (req, res) => {
    const { title, description, user } = req.body;
    try {
      const question = await Question.create({ title, description, user });
      res.status(201).json(question);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create the question' });
      console.log(err);
    }
  },

  updateQuestion: async (req, res) => {
    const { description } = req.body;
    try {
      const question = await Question.findByIdAndUpdate(
        req.params.id,
        {description },
        { new: true }
      );
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.json(question);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update the question' });
    }
  },

  deleteQuestion: async (req, res) => {
    try {
      const question = await Question.findByIdAndDelete(req.params.id);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete the question' });
    }
  },
};

module.exports = questionController;
