const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const admin = require('../controllers/admin');
const { validateUser, isAuthenticated, isAdmin } = require('../middleware');

router.route('/isAdmin').get(isAuthenticated, isAdmin, admin.isAdmin);

router
    .route('/eventDate')
    .post(isAuthenticated, isAdmin, catchAsync(admin.setEventDates))
    .delete(isAuthenticated, isAdmin, catchAsync(admin.deleteEventDate));

router
    .route('/course')
    .post(isAuthenticated, isAdmin, catchAsync(admin.addCourses))
    .delete(isAuthenticated, isAdmin, catchAsync(admin.deleteCourse));

module.exports = router;
