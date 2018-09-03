const mongoose = require('mongoose'),  
        Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const UserInfo = {
  name: {
    type: Schema.Types.String,
    required: true,
    unique : true, // For simple authorization
    dropDups: true
  }
};

module.exports = UserInfo; 