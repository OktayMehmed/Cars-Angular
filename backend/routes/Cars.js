const express = require('express');
const router = express.Router()
const protect = require('../middleware/auth')
const { getAllCars, getCarById, getUserCars, createCar } = require('../controllers/Cars')

router.route("/mycars").get(protect, getUserCars)
router.route("/").get(getAllCars).post(protect, createCar)
router.route("/:id").get(getCarById);

module.exports = router