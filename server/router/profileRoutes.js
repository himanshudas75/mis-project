const express=require('express');
const { showProfile, registerProfile } = require('../controller/routeController');
const checkAdmin = require('../middleware/checkAdmin');


const router=express.Router();

router.route('/').post(showProfile);
router.route('/register').post(checkAdmin,registerProfile);

module.exports=router;

