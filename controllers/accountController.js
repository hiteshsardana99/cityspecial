
//default libraries
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//custome libraries
const Admin = require('../models/adminModel');
const Reporter = require('../models/reporterModel');
const keys =  require('../config/keys');

//-------------------- Login Section--------------------------


exports.adminLogin = (req,res) => {

    var userName = req.body.userName;
    var password = req.body.password;

    if(userName != null && password != null && typeof userName == 'string' && typeof password == 'string') {
        Admin.findOne({'adminUserName' : userName}, (err,resp) => {
          if(err) {
            console.log(err);
            res.status(500).json({'status' : 500, 'detail' : 'Internal server error'});
          }
          else if(resp != null) {

            bcrypt.compare(password,resp.adminPassword, function(err,response){
              if(err){
                console.log('bcrypt password compare error');
                res.status(401).json({'status' : 401, 'detail': 'password mismatch'});
              }
              else{
                console.log('admin Successfully login');

                let token = jwt.sign({id : resp._id}, keys.secretKey,{ expiresIn : 10*3600 }); //10 hours
                //need to return jwt token
                res.status(200).json({'status' : 200, 'detail' : 'Successfully login','token' : token});
              }
            });
          }
          else{
            console.log('Incorrect userName for admin login');
            res.status(404).json({'status' : 404, 'detail': 'Incorrect username'});
          }
        });
    }
    else {
      console.log('Invalid request body details');
      res.status(400).json({'status' : 400, 'detail' : 'Invalid request body details'});
    }
};


exports.reporterLogin = (req,res) => {

    var userName = req.body.userName;
    var password = req.body.password;

    if(userName != null && password != null && typeof userName == 'string' && typeof password == 'string') {
        Reporter.findOne({'reporterUserName' : userName}, (err,resp) => {
          if(err) {
            console.log(err);
            res.status(500).json({'status' : 500, 'detail' : 'Internal server error'});
          }
          else if(resp != null) {

            bcrypt.compare(password,resp.reporterPassword,function(err,response){
              if(err) {
                console.log('bcrypt password compare error');
                res.status(401).json({'status' : 401, 'detail': 'password mismatch'});
              }
              else{
                console.log('reporter successfully login');
                let token = jwt.sign({id : resp._id}, keys.secretKey,{ expiresIn : 10*3600 }); //10 hours
                //need to return jwt token
                res.status(200).json({'status' : 200, 'detail' : 'Reporter successfully login','token' : token});
              }
            });
          }
          else{
            console.log('Incorrect userName for reporter login');
            res.status(404).json({'status' : 404, 'detail': 'Incorrect username'});
          }
        });
    }
    else {
      console.log('Invalid request body details');
      res.status(400).json({'status' : 400, 'detail' : 'Invalid request body details'});
    }
};


//----------------------------------------------  CREATE ACCOUNT --------------------------------------------------------------

exports.createAdminAccount = (req,res) => {

  var adminUserName = req.body.adminUserName;
  var password = req.body.password;
  var adminName = req.body.adminName;
  var emailId = req.body.emailId;
  var address = req.body.address;
  var phoneNum = req.body.phoneNum;

  if( adminUserName != null && password != null && adminName != null && emailId != null && address != null && phoneNum != null
    && typeof adminUserName == 'string' && typeof password == 'string' && typeof adminName == 'string' && typeof emailId == 'string' && typeof address == 'string', typeof phoneNum == 'number'){

      //encrypt password before storing in database
      bcrypt.hash(password,10, function(err, encryptedPassword) {
        if(err){
          console.log('Error while encrypted password');
          res.status(500).json({'status' : 500, 'detail' : 'Internal server error while encrypted password'});
        }
        else {
            //store encrypted password
                Admin.create({
                  'adminUserName' : adminUserName ,
                  'adminPassword' : encryptedPassword,
                  'adminName' : adminName,
                  'adminEmailId' : emailId,
                  'adminAddress' : address,
                  'adminPhoneNum' : phoneNum
                }, function(err,response) {
                  if(err){
                    console.log(err);
                    res.status(500).json({'status' : 500, 'detail' : 'Internal server error'});
                  }
                  else if (response != null){
                    console.log('admin account successfully created');
                    //need to return jwt token
                    res.status(201).json({'status' : 201, 'detail' : 'Successfully created','token' : 'coming'});
                  }
                  else{
                    console.log('Something went wrong while creating admin account');
                    res.status(400).json({'status' : 400, 'detail': 'Something went wrong'});
                  }
                });
        }
      });
  }
  else {
    console.log('Invalid request body details');
    res.status(400).json({'status' : 400, 'detail' : 'Invalid request body details'});
  }

};


exports.createReporterAccount = (req,res) => {

  var userName = req.body.userName;
  var password = req.body.password;
  var name = req.body.name;
  var emailId = req.body.emailId;
  var address = req.body.address;
  var phoneNum = req.body.phoneNum;
  var adminId = req.adminId;


  if( userName != null && password != null && name != null && emailId != null && adminId != null && address != null && phoneNum != null &&
    typeof userName == 'string' && typeof password == 'string' && typeof name == 'string' && typeof emailId == 'string' && typeof address == 'string'
    && typeof phoneNum == 'string' && phoneNum.length == 10
   ){

      Reporter.findOne({'reporterUserName' : userName}).then( existingReporter => {
        if(existingReporter) {
          //reporter already exist with this user name
          console.log('Reporter already exist with : ',existingReporter.reporterName);
          res.status(400).json({'status' : 601, 'detail' : 'Data already exist','reporterName' : existingReporter.reporterName});
        }
        else{
          //reporter not exist -> successfully you can create new reporter
           bcrypt.hash(password,10,function(err, encryptedPassword) {

                   Reporter.create(
                     { 'reporterUserName' : userName ,
                       'reporterPassword' : encryptedPassword,
                       'reporterName' : name,
                       'reporterEmailId' :  emailId,
                       'createdOn' : new Date(Date.now()),
                       'reporterPhoneNumber' : phoneNum,
                       'reporterAddress' : address,
                       'createdBy' : adminId },
                         function(err,response) {
                     if(err){
                       console.log(err);
                       res.status(500).json({'status' : 500, 'detail' : 'Internal server error'});
                     }
                     else if (response != null){
                       console.log('reporter account successfully created');
                       //need to return jwt token
                       res.status(201).json({'status' : 201, 'detail' : 'Successfully created','token' : 'coming'});
                     }
                     else{
                       console.log('Something went wrong while creating reporter account');
                       res.status(400).json({'status' : 400, 'detail': 'Something went wrong'});
                     }
                   });
           });
        }
      });
  }
  else {
    console.log('Invalid request body details');
    res.status(400).json({'status' : 400, 'detail' : 'Invalid request body details'});
  }

};
