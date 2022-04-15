const express = require('express');
const router = express.Router()
const protect = require('../middleware/auth')
const { getAllCars, getCarById, getUserCars, createCar, deleteCar, updateCar } = require('../controllers/Cars')

router.route("/mycars").get(protect, getUserCars)
router.route("/").get(getAllCars).post(protect, createCar)
router.route("/:id").get(getCarById).delete(protect, deleteCar).put(protect, updateCar)

module.exports = router