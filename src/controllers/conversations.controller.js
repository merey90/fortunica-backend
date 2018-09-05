const Conversation = require('./../models/conversation');

const ConversationsController = {};

ConversationsController.getConversationsByUsers = async (filter, messageModel) => {
  try {
    const conversations = await Conversation.find(filter).sort('-createdAt').lean();
    for(let index = 0; index < conversations.length; index++){
      let message = await messageModel.findOne({conversationId: conversations[index]._id});
      
      if(!!message){
        conversations[index].hasNew = !message.opened;
      } else {
        conversations[index].hasNew = false;
      }
    }
    return { error: null, conversations };
  } catch (error) {
    return { error };
  }
};

ConversationsController.saveConversation = (conversation) => {
  const newConversation = new Conversation({
    client: conversation.client,
    user: conversation.user,
    title: conversation.title
  });
  return newConversation.save();
}

module.exports = ConversationsController;