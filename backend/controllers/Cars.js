const Cars = require('../models/Cars.js')

const getAllCars = (req, res) => {
  Cars.find({}).then(cars => res.json(cars))
}

const getCarById = (req, res) => {
  Cars.findById(req.params.id)
  .then(car => res.json(car))
  .catch(() => res.status(404).json({ message: "Car not found!"}))
}

module.exports = { getAllCars, getCarById }