const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const application = require('../controllers/application');
const { validateComplaint, isAuthenticated } = require('../middleware');

const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage: storage });

// router
//     .route('/register')
//     .post(
//         isAuthenticated,
//         upload.single('screenshot'),
//         validateComplaint,
//         catchAsync(complaints.register)
//     );

// router.route('/fetch').get(isAuthenticated, catchAsync(complaints.fetch));

// router.route('/reset').delete(isAuthenticated, catchAsync(complaints.reset));

router.route('/form_1').post(isAuthenticated, catchAsync(application.form_1));

module.exports = router;
