const express = require('express');
const router = express.Router()
const { authUser } = require('../controllers/User');

router.route('/login').post(authUser)

module.exports = router
