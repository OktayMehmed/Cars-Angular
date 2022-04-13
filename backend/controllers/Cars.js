const Cars = require('../models/Cars.js')

const getAllCars = (req, res) => {
  Cars.find({}).then(cars => res.json(cars))
}

const getCarById = (req, res) => {
  Cars.findById(req.params.id)
    .then(car => res.json(car))
    .catch(() => res.status(404).json({ message: "Car not found!" }))
}

const getUserCars = (req, res) => {
  Cars.find({ user: req.user._id })
    .then(cars => res.json(cars))
}

const createCar = (req, res) => {
  const { make, model, image, price, year, fuel, color, power, description } = req.body;

  const car = new Cars({
    user: req.user._id,
    make: make,
    model: model,
    image: image,
    price: price,
    year: year,
    fuel: fuel,
    color: color,
    power: power,
    description: description
  })

  car.save()
    .then((createdCar) => res.status(201).json(createdCar))
    .catch(() => res.status(400).json({ message: "Please enter all fields" }))
}

module.exports = { getAllCars, getCarById, getUserCars, createCar }