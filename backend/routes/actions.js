const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const action = require('../controllers/actions');
const { isAuthenticated } = require('../middleware');

router
    .route('/eventDates')
    .get(isAuthenticated, catchAsync(action.getEventDates));

module.exports = router;
