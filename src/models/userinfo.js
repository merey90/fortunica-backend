const mongoose = require('mongoose'),  
        Schema = mongoose.Schema;

const UserInfo = {
  name: {
    type: Schema.Types.String,
    required: true
  }
};

module.exports = UserInfo; 