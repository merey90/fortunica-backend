const mongoose = require('mongoose'),  
      Schema = mongoose.Schema,
      Message = require('./message'),
      Question = Object.assign({}, Message);

Question.client = {
  type: Schema.Types.ObjectId, ref: 'Client'
};

const QuestionSchema = new Schema(
  Question,
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Question', QuestionSchema); 