const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const complaints = require('../controllers/complaints');
const { validateComplaint, isAuthenticated } = require('../middleware');

router
    .route('/register')
    .post(isAuthenticated, validateComplaint, catchAsync(complaints.register));

router.route('/fetch').get(isAuthenticated, catchAsync(complaints.fetch));

module.exports = router;
