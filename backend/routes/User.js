const express = require('express');
const router = express.Router()
const { authUser, getUserProfile } = require('../controllers/User');
const protect = require('../middleware/auth');

router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile)

module.exports = router
