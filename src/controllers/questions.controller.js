const Conversation = require('./../models/conversation'),
      Question = require('./../models/question');


const QuestionsController = {};

QuestionsController.saveQuestion = (question) => {
  const newQuestion = new Question({
    conversationId: question.conversation,
    content: question.content,
    client: question.client
  });

  return newQuestion.save();
}


module.exports = QuestionsController;