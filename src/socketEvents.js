const Question = require('./models/question'),
      Answer = require('./models/answer');

const ConversationsController = require('./controllers/conversations.controller'),
      QuestionsController = require('./controllers/questions.controller'),
      AnswersController = require('./controllers/answers.controller');

const persons = {};

exports = module.exports = function(io) {  
  // Set socket.io listeners.
  io.on('connection', (socket) => {
    console.log('a user connected');

    // Save persons sockets
    socket.on('joinSocket', (person) => {
      console.log('person joined: ', person);
      persons[person] = {socket};
    });

    socket.on('postQuestion', async (question) => {
      
      console.log('postQuestion: ', question);
      if(!question.user) {
        socket.emit('handleError', { error: 'Please choose a valid expert for your message.' });
        return;
      }
      if(!question.client) {
        socket.emit('handleError', { error: 'Please provide client id.' });
        return;
      }
      if(!question.title) {
        socket.emit('handleError', { error: 'Please enter a title.' });
        return;
      }
      if(!question.content) {
        socket.emit('handleError', { error: 'Please enter a message.' });
        return;
      }

      try {
        const newConversation = await ConversationsController.saveConversation(question);
        if(!newConversation._id){
          socket.emit('handleError', { error: 'Can\'t save new conversation.' });
          return;
        }
        question.conversation = newConversation._id;
        const newQuestion = await QuestionsController.saveQuestion(question);
        if(!newQuestion._id){
          socket.emit('handleError', { error: 'Can\'t save the question.' });
          return;
        }

        const filter = {
          user: question.user,
          client: question.client
        };
        const conversationsResultAns = await ConversationsController.getConversationsByUsers(filter, Answer);
        const conversationsResultQue = await ConversationsController.getConversationsByUsers(filter, Question);
        if(!!conversationsResultAns.error || !!conversationsResultQue.error){
          //emit error
          socket.emit('handleError', { error: 'Can\'t get conversations list.' });
          return;
        } else if(!!persons[question.user].socket){
          persons[question.user].socket.emit('getConversations', conversationsResultQue.conversations);
          persons[question.user].socket.emit('newNotification', {
            message: 'You have new Question',
            person: question.client,
            conversation: newConversation._id
          });
        }
        socket.emit('getConversations', conversationsResultAns.conversations);
        
      } catch (error) {
        socket.emit('handleError', { error });
      }

    });

    socket.on('postAnswer', async (answer) => {
      console.log('postAnswer: ', answer);
      if(!answer.client) {
        socket.emit('handleError', { error: 'Please choose a valid client for your message.' });
        return;
      }
      if(!answer.user) {
        socket.emit('handleError', { error: 'Please provide user id.' });
        return;
      }
      if(!answer.conversation) {
        socket.emit('handleError', { error: 'Please choose a valid conversation.' });
        return;
      }
      if(!answer.content) {
        socket.emit('handleError', { error: 'Please enter a message.' });
        return;
      }

      try {
        const newAnswer = await AnswersController.saveAnswer(answer);
        if(!newAnswer._id){
          socket.emit('handleError', { error: 'Can\'t save the answer.' });
          return;
        } 
        
        const filter = {
          user: answer.user,
          client: answer.client
        };
        // conversations with marked new Answers
        const conversationsResultAns = await ConversationsController.getConversationsByUsers(filter, Answer);
        // conversations with marked new Questions
        const conversationsResultQue = await ConversationsController.getConversationsByUsers(filter, Question);
        if(!!conversationsResultAns.error || !!conversationsResultQue.error){
          //emit error
          socket.emit('handleError', { error: 'Can\'t get conversations list.' });
          return;
        } else if(!!persons[answer.client].socket){
          persons[answer.client].socket.emit('getConversations', conversationsResultAns.conversations);
          persons[answer.client].socket.emit('newNotification', {
            message: 'You have new Answer',
            person: answer.user,
            conversation: answer.conversation
          });
        }
        socket.emit('getConversations', conversationsResultQue.conversations);
        
      } catch (error) {
        console.log(error);
        socket.emit('handleError', { error });
      }
    });
  });
}