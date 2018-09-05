const Answer = require('./../models/answer');

const AnswersController = {};

AnswersController.saveAnswer = (answer) => {
  const newAnswer = new Answer({
    conversationId: answer.conversation,
    content: answer.content,
    user: answer.user
  });

  return newAnswer.save();
}

module.exports = AnswersController;