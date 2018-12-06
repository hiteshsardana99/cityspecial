
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema({
  imageName : {
    type : String,
    required : true
  },
  reporterId : mongoose.Schema.Types.ObjectId,
  adminId : mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Image', ImageSchema, 'imageCollection');
