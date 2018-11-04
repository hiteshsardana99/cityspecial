
//default libraries
const jwt = require('jsonwebtoken');

//custome libraries
const keys  = require('../config/keys');
const Admin = require('../models/adminModel');
const Reporter = require('../models/reporterModel');


exports.authMiddleWare  = function(req,res,next) {

  var reqUrl  = req.originalUrl.split("/")[2];

  if( req.url === '/admin/login' || req.url === '/admin/signup' || req.url === '/reporter/login') {
    //no token required for specified operations
    next();
  }
  else if(reqUrl === 'admin' ){
      var token = req.headers['authorization'];

      if(!token)  return res.status(401).json({'status' : 401});

      jwt.verify(token, keys.secretKey, function(err, decoded){
          if(err) {
            console.log('Failed to authenticate jwt token');
            res.status(401).json({'status' : 401, 'detail' : 'Failed to authenticate jwt token'});
          }
          else {
              Admin.findOne({'_id' : decoded.id}).then( admin => {
                  if(admin) {
                    req.adminId = decoded.id;
                    next();
                  }
                  else{
                    //wrong token used
                    res.status(401).json({'status' : 401});
                  }
              });
          }
      });
  }
  else if(reqUrl === 'reporter'){
    var token = req.headers['authorization'];

    if(!token)  return res.status(401).json({'status' : 401});

    jwt.verify(token, keys.secretKey, function(err, decoded){
        if(err) {
          console.log('Failed to authenticate jwt token');
          res.status(500).json({'status' : 500, 'detail' : 'Failed to authenticate jwt token'});
        }
        else {

          Reporter.findOne({'_id' : decoded.id}).then( reporter => {
              if(reporter) {
                req.reporterId = decoded.id;
                next();
              }
              else{
                //wrong token used
                res.status(401).json({'status' : 401});
              }
          });
        }
    });
  }
  else if(reqUrl === 'user') {
    //no token required for end user
    next();
  }
  else {
      res.status(400).json({'status' : 400, 'detail' : 'Invalid Request || Now your IP is under surveillance'});
  }
}
