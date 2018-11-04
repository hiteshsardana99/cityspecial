'use strict';

const express = require('express');
const router  = express.Router();


const NewsController = require('../../controllers/newsController');

//Map routes to controllers
router.get('/fetchNews', NewsController.getApprovedNews );


module.exports = router;
