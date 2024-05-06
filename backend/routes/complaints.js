const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const complaints = require('../controllers/complaints');
const {
    hasRoles,
    validateComplaint,
    isAuthenticated,
} = require('../middleware');

const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage: storage });

router
    .route('/register')
    .post(
        isAuthenticated,
        upload.single('screenshot'),
        validateComplaint,
        catchAsync(complaints.register)
    );

router
    .route('/fetch')
    .get(isAuthenticated, hasRoles, catchAsync(complaints.fetch));

router
    .route('/reset')
    .delete(isAuthenticated, hasRoles, catchAsync(complaints.reset));

module.exports = router;
