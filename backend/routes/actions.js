const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const action = require('../controllers/actions');
const { isAuthenticated, hasRoles } = require('../middleware');

router
    .route('/eventDates')
    .get(isAuthenticated, hasRoles, catchAsync(action.getEventDates));

router
    .route('/course')
    .get(isAuthenticated, hasRoles, catchAsync(action.getCourses));

router.route('/keepAlive').get(catchAsync(action.keepAlive));

module.exports = router;
