
const mongoose = require('mpngoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  userEmailId : {
    type : String,
    required : true
  },
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  }
});

module.exports = mongoose.model('Feddback', feedbackSchema, 'feedbackCollection');
