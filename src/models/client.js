const mongoose = require('mongoose'),  
      Schema = mongoose.Schema,
      UserInfo = require('./userinfo'),
      Client = Object.assign({}, UserInfo);

Client.zodiac = {
  type: Schema.Types.String
};

const ClientSchema = new Schema(
  Client,
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Client', ClientSchema); 