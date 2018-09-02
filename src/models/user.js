const mongoose = require('mongoose'),  
      Schema = mongoose.Schema,
      UserInfo = require('./userinfo'),
      User = Object.assign({}, UserInfo);

User.rating = {
  type: Schema.Types.Number,
  default: 0
};

const UserSchema = new Schema(
  User,
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema); 