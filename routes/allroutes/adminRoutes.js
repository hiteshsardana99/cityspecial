
'use strict';

const express = require('express');
const router  = express.Router();

const NewsController      = require('../../controllers/newsController');
const AccountController   = require('../../controllers/accountController');
const ReporterController  = require('../../controllers/reporterController');
const AdminController     = require('../../controllers/AdminController');

//--------------------------- News -----------------------------------
router.get('/fetchNews', NewsController.getApprovedNews );
router.get('/fetchAllNews', NewsController.getNews );
router.post('/addNews', NewsController.addNews );
router.post('/modifyNewsStatus', NewsController.modifyNewsStatus );


//------------------------- Account ----------------------------------
router.post('/login', AccountController.adminLogin);
router.post('/signup', AccountController.createAdminAccount);
router.post('/createReporter', AccountController.createReporterAccount);


//------------------------- Reporter ----------------------------------

router.get('/viewAllReporters', ReporterController.viewAllReporters);
router.get('/viewReporter/:id', ReporterController.viewReporterProfileById);

//------------------------- Admin --------------------------------------

router.get('/viewAdminProfile', AdminController.viewAdminProfile);

module.exports = router;
