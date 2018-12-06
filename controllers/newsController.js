
const Image = require('../models/imageModel');
const News = require('../models/newsModel');
const ImageHelper = require('../helper/ImageHelper');

/*
  newsType - food','sports','business','entertainment','politics'
*/
exports.addNews = (req,res) => {
  var title = req.body.title;
  var description = req.body.description;
  var longDescription = req.body.longDescription;
  var reporterId = req.reporterId;
  var imageUrl = req.body.imageUrl;
  var newsType = req.body.newsType;

  if( title != null && description != null && longDescription != null && imageUrl != null && newsType != null &&
      typeof title == 'string' && typeof description == 'string' && typeof longDescription == 'string' &&
      typeof imageUrl == 'string' && typeof newsType == 'string'
  ){
    News.create({
      'title' : title,
      'description' : description,
      'longDescription' : longDescription,
      'postedBy' : reporterId,
      'imageUrl' : imageUrl,
      'newsType' : newsType,
      'createdOn' : new Date(Date.now())
    }, function(err,response){
          if(err){
            console.log(err);
            res.status(500).json({'status' : 500, 'detail' : 'Internal server error'});
          }
          else if(response != null){
            console.log('News Successfully added');
            res.status(201).json({'status' : 201, 'detail' : 'news addedd successfully'});
          }
          else{
            console.log('something went wrong');
            res.status(400).json({'status' : 400, 'detail' : 'something went wrong'});
          }
    });
  }
  else {
    console.log('Invalid json received');
    res.status(400).json({'status' : 400 , 'detail' : 'Invalid json received'});
  }
}

exports.getNews = (req,res) => {
  News.find({}, function(err,resp){
    if(err){
      console.log(err);
      res.status(500).json({'status' : 500});
    }
    else if(resp){
      console.log('Successfully fetch news');
      res.status(200).json(resp);
    }
    else {
      console.log('No news found');
      res.status(404).json({'status' : 404 , 'detail' : 'No news found'});
    }
  });
}

exports.getReporterNews = (req,res) => {

  var reporterId = req.reporterId;

  News.find({'postedBy' : reporterId}, function(err,resp){
    if(err){
      console.log(err);
      res.status(500).json({'status' : 500});
    }
    else if(resp){
      console.log('Successfully fetch news');
      res.status(200).json(resp);
    }
    else {
      console.log('No news found');
      res.status(404).json({'status' : 404 , 'detail' : 'No news found'});
    }
  });
}

exports.getApprovedNews = (req,res) => {

  News.find({'isVerified' : true}, function(err,resp){
    if(err){
      console.log(err);
      res.status(500).json({'status' : 500});
    }
    else if(resp){
      console.log('Successfully fetch news');
      res.status(200).json(resp);
    }
    else {
      console.log('No news found');
      res.status(404).json({'status' : 404 , 'detail' : 'No news found'});
    }
  });
}

//admin functionality
exports.modifyNewsStatus = (req,res) => {

  var isVerified = req.body.verified;
  var newsId = req.body.newsId;
  var adminId = req.adminId;

  if(isVerified != null && newsId != null && typeof isVerified == 'boolean'){
      News.findOneAndUpdate({'_id':newsId},{'isVerified':isVerified,'verifiedBy':adminId},(err,response) => {
          if(err){
            console.log(err);
            res.status(500).json({'status' : 500, 'detail' : 'Internal server error'});
          }
          else if(response != null){
            console.log('Successfully updated news status');
            res.status(200).json({'status' : 200, 'detail' : 'news status updated'});
          }
          else{
            console.log('news not found');
            res.status(404).json({'status' : 404 , 'detail' : 'No news found for update'});
          }
      });
  }
  else{
    console.log('Invalid json received');
    res.status(400).json({'status' : 400 , 'detail' : 'Invalid json received'});
  }
};

//upload image
exports.uploadNewsImage = (req,res) => {

  var reporterId = req.reporterId;
  var adminId = req.adminId;

  ImageHelper.uploadImage(req,res, (err) => {
    if(err){
      console.log(err);
      res.status(500).json({'status' : 500, 'detail' : 'Internal server error'});
    }
    else {
      if( req.file == undefined) {
          console.log('No file selected');
          res.status(400).json({'status' : 400, 'detail' : 'No file selected'});
      }
      else {

          var imageName = req.file.filename;

          Image.create({
            'imageName' : imageName,
            'reporterId' : reporterId,
            'adminId' :   adminId
          }, function(err,response){
              if(err){
                console.log(err);
                res.status(200).json({
                  'status' : 200,
                  'detail' : 'Image uploaded but failed to save image name',
                  'imageUrl' : 'https://cityspecial.herokuapp.com/'+imageName
                 });
              }
              else{
                console.log('Image successfully uploaded and saved');
                res.status(200).json({
                  'status' : 200,
                  'detail' : 'Image uploaded and successfully saved',
                  'imageUrl' : 'https://cityspecial.herokuapp.com/'+imageName
                });
              }
          });
      }
    }
  });
}
