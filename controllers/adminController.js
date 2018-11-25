
const Reporter = require('../models/reporterModel');
const Admin    = require('../models/adminModel');

exports.viewAdminProfile = function(req,res) {

  var adminId = req.adminId;

  Admin.findOne({'_id' : adminId},{'adminPassword' : 0}).then( existingAdmin => {
      if(existingAdmin) {
          console.log('Successfully fetch admin profile');
          res.status(200).json({'status' : 200, 'detail' : existingAdmin});
      }
      else{
        console.log('Admin profile not found');
        res.status(404).json({'status' : 404 , 'detail' : 'Admin profile not found'});
      }
  });
}
