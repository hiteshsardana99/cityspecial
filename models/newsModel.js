
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
  imageUrl : {
    type : String,
    default : 'https://images.pexels.com/photos/285814/pexels-photo-285814.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
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
