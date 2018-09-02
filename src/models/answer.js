const mongoose = require('mongoose'),  
      Schema = mongoose.Schema,
      Message = require('./message'),
      Answer = Object.assign({}, Message);

Answer.user = {
  type: Schema.Types.ObjectId, ref: 'User'
};

const AnswerSchema = new Schema(
  Answer,
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Answer', AnswerSchema); 