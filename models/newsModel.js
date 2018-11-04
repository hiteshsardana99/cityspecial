
const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema({
  title : {
    type : String,
    required : true
  },
  description : {
    type :  String,
    required : true
  },
  isVerified : {
    type : Boolean,
    default : false
  },
  longDescription : String,
  postedBy : mongoose.Schema.Types.ObjectId,
  verifiedBy : mongoose.Schema.Types.ObjectId,
  imageUrl : String,
  newsType : {
    type : String,
    enum : ['food','sports','business','entertainment','politics','education'],
    required : true
  },
  createdOn : {
    type : Date,
    default : new Date(Date.now())
  }
});

module.exports = mongoose.model('News',newsSchema,'newsCollection');
