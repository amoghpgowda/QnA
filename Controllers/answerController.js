const Question = require('../Models/question');
const answerController = {
  getAllAnswers: async (req, res) => {
    try {
      const question = await Question.findById(req.params.questionId).populate('answers');
      const answers = question.answers;
      res.json(answers);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get answers' });
      console.log(err);
    }
  },

createAnswer: async (req, res) => {
  const { content, user } = req.body;
  const questionId = req.params.questionId;
  console.log(content);
  console.log(user);
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    console.log(question);
    question.answers.push({content, user});
    await question.save();

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create the answer' });
    console.log(err);
  }
},

  updateAnswer: async (req, res) => {
    const { questionId, answerId } = req.params;
    const { content } = req.body;
  
    try {
      const question = await Question.findById(questionId);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      const answer = question.answers.id(answerId);
      if (!answer) {
        return res.status(404).json({ error: 'Answer not found' });
      }
  
      answer.content = content;
      await question.save();
  
      res.json(question);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update the answer' });
    }
  },
  

  deleteAnswer: async (req, res) => {
    const { questionId, answerId } = req.params;
  
    try {
      const question = await Question.findById(questionId);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      const answerIndex = question.answers.findIndex(
        (answer) => answer._id.toString() === answerId
      );
      if (answerIndex === -1) {
        return res.status(404).json({ error: 'Answer not found' });
      }
  
      question.answers.splice(answerIndex, 1);
      await question.save();
  
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete the answer' });
    }
  }
  
  
};

module.exports = answerController;
