"use strict";

//default libraries
const express = require('express');
const router = express.Router();

//custome libraries
const userRoutes = require('./allroutes/userRoutes');
const adminRoutes = require('./allroutes/adminRoutes');
const reporterRoutes = require('./allroutes/reporterRoutes');
const MiddleWare  = require('../helper/middleware');

router.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin' , '*');
  res.header('Access-Control-Allow-Methods' , 'GET, POST');
  res.header('Access-Control-Allow-Headers' ,'Content-Type, authorization, Content-Length, X-Requested-With');
  next();
});


//use middleware
router.use('/', MiddleWare.authMiddleWare );

//handle routes
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/reporter', reporterRoutes);



module.exports = router;
