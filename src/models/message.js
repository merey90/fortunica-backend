const mongoose = require('mongoose'),  
        Schema = mongoose.Schema;

const Message = {
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: Schema.Types.String,
    required: true
  },
  opened: {
    type: Schema.Types.Boolean,
    default: false
  }
};

module.exports = Message; 