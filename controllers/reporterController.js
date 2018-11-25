

const Reporter = require('../models/reporterModel');


exports.viewReporterProfileById = function(req,res) {

  var reporterId = req.params.id;

  if(reporterId != null && typeof reporterId == 'string') {

      Reporter.findOne({'_id' : reporterId},{'reporterPassword' : 0}).then( (existingReporter) => {
          if(existingReporter){
            console.log('Reporter profile Successfully found');
            res.status(200).json({'status' : 200 , 'detail' : existingReporter});
          }
          else{
            console.log('Reporter profile not found');
            res.status(404).json({'status' : 404 , 'detail' : 'Reporter profile not found'});
          }
      });
  }
  else{
    console.log('Invalid parameters received');
    res.status(400).json({'status' : 400 , 'detail' : 'Invalid parameters received'});
  }
}


exports.viewReporterProfile = function(req,res) {

  var reporterId = req.reporterId;

  if(reporterId != null) {

      Reporter.findOne({'_id' : reporterId},{'reporterPassword' : 0}).then( (existingReporter) => {
          if(existingReporter){
            console.log('Reporter profile Successfully found');
            res.status(200).json({'status' : 200 , 'detail' : existingReporter});
          }
          else{
            console.log('Reporter profile not found');
            res.status(404).json({'status' : 404 , 'detail' : 'Reporter profile not found'});
          }
      });
  }
  else{
    console.log('Invalid parameters received');
    res.status(400).json({'status' : 400 , 'detail' : 'Invalid parameters received'});
  }
}


exports.viewAllReporters = function(req,res) {

      Reporter.find({},{'reporterPassword' : 0}).then( (existingReporter) => {
          if(existingReporter){
            console.log('Reporter profile Successfully found');
            res.status(200).json({'status' : 200 , 'detail' : existingReporter});
          }
          else{
            console.log('Reporter profile not found');
            res.status(404).json({'status' : 404 , 'detail' : 'Reporter profile not found'});
          }
      });
}
