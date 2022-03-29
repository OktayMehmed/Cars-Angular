const express = require('express');
const router = express.Router()
const { getAllCars, getCarById } = require('../controllers/Cars')

router.route("/").get(getAllCars);
router.route("/:id").get(getCarById);

module.exports = router