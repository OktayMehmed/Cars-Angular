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

const deleteCar = (req, res) => {
  Cars.findById(req.params.id)
    .then((car) => {
      car.remove();
      res.json({ message: "Car was been deleted" })
    })
    .catch(() => res.status(404).json({ message: "Car not found" }));
}

const updateCar = (req, res) => {
  const { make, model, image, price, year, fuel, color, power, description } = req.body

  Cars.findById(req.params.id)
    .then((car) => {
      car.make = make;
      car.model = model;
      car.image = image;
      car.price = price;
      car.year = year;
      car.fuel = fuel;
      car.color = color;
      car.power = power;
      car.description = description;

      car.save()
        .then(updatedCar => res.json(updatedCar))
        .catch((e) => console.error(e))
    })
    .catch(() => res.status(404).json({ message: "Car not found!" }))
}

module.exports = { getAllCars, getCarById, getUserCars, createCar, deleteCar, updateCar }