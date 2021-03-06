
const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  adminUserName : {
    type : String,
    required : true
  },
  adminPassword : {
    type : String,
    required : true
  },
  adminName : {
    type : String,
    required : true
  },
  adminAddress : {
    type : String,
    required : true
  },
  adminPhoneNum : {
    type : Number,
    required : true
  },
  adminEmailId : {
    type : String,
    required : true
  }
});

module.exports = mongoose.model('Admin',adminSchema,'adminCollection');
