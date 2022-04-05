const express = require('express');
const router = express.Router()
const { authUser, getUserProfile, registerUser, updateUserProfile } = require('../controllers/User');
const protect = require('../middleware/auth');

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

module.exports = router
