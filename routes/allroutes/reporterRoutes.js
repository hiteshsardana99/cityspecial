'use strict';

const express = require('express');
const router  = express.Router();

const NewsController      = require('../../controllers/newsController');
const AccountController   = require('../../controllers/accountController');
const ReporterController  = require('../../controllers/reporterController');


//--------------------------- News -----------------------------------
router.get('/fetchNews', NewsController.getApprovedNews );
router.get('/fetchMyNews', NewsController.getReporterNews );
router.post('/addNews', NewsController.addNews );

//------------------------- Account ----------------------------------
router.post('/login', AccountController.reporterLogin);

//------------------------- Reporter ---------------------------------
router.get('/viewMyProfile', ReporterController.viewReporterProfile);


module.exports = router;
