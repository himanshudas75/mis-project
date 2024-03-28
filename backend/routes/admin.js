const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const admin = require('../controllers/admin');
const { validateUser, isAuthenticated, isAdmin } = require('../middleware');

router.route('/verify').get(isAuthenticated, isAdmin, admin.verify);

router
    .route('/eventDate')
    .post(isAuthenticated, isAdmin, catchAsync(admin.setEventDates))
    .delete(isAuthenticated, isAdmin, catchAsync(admin.deleteEventDate));

module.exports = router;
