
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reporterSchema = new Schema({
  reporterUserName : {
    type : String,
    required : true
  },
  reporterPassword : {
    type : String,
    required : true
  },
  reporterEmailId : {
    type : String,
    required : true,
  },
  reporterName : {
    type : String,
    required : true
  },
  reporterPhoneNumber : {
    type : String,
    minlength : 10,
    maxlength : 10
  },
  reporterAddress : String,
  createdOn : {
    type : Date,
    default : new Date(Date.now())
  },
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    required : true
  }
});

module.exports = mongoose.model('Reporter',reporterSchema,'reporterCollection');
