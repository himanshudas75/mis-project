const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const { validateUser, isAuthenticated, hasRoles } = require('../middleware');

router.route('/register').post(validateUser, catchAsync(users.register));

router.route('/login').post(catchAsync(users.login));

router.route('/isLoggedIn').get(isAuthenticated, users.isLoggedIn);

router.route('/verify').get(catchAsync(users.verify));

router.route('/hasRoles').get(isAuthenticated, hasRoles, users.hasRoles);

router
    .route('/changePassword')
    .put(isAuthenticated, catchAsync(users.changePassword));

router
    .route('/deleteUser')
    .delete(isAuthenticated, catchAsync(users.deleteUser));

router.route('/logout').get(catchAsync(users.logout));

module.exports = router;
