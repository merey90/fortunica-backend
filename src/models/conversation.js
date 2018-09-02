const mongoose = require('mongoose'),  
        Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'Client'},
  user: { type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Conversation', ConversationSchema); 