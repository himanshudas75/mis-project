const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const courses = require('../controllers/courses');
const { validateCourse, hasRoles, isAuthenticated } = require('../middleware');

router
    .route('/add')
    .post(
        isAuthenticated,
        hasRoles,
        validateCourse,
        catchAsync(courses.addCourses)
    );

router
    .route('/get')
    .get(isAuthenticated, hasRoles, catchAsync(courses.getUserCourses));

router
    .route('/getAll')
    .get(isAuthenticated, hasRoles, catchAsync(courses.getAllCourses));

module.exports = router;
