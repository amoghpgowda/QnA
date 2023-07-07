const express = require('express');
const router = express.Router();
const questionController = require('../Controllers/QuestionController');
const answerController = require('../Controllers/AnswerController');

router.get('/questions', questionController.getAllQuestions);
router.get('/questions/:id', questionController.getQuestionById);
router.post('/questions', questionController.createQuestion);
router.put('/questions/:id', questionController.updateQuestion);
router.delete('/questions/:id', questionController.deleteQuestion);

router.get('/questions/:questionId/answers', answerController.getAllAnswers);
router.post('/questions/:questionId/answers', answerController.createAnswer);
router.put('/questions/:questionId/answers/:answerId', answerController.updateAnswer);
router.delete('/questions/:questionId/answers/:answerId', answerController.deleteAnswer);

module.exports = router;
