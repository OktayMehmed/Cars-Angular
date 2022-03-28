const express = require('express');
const Cars = require('../models/Cars.js')

const router = express.Router()

router.get("/", (req, res) => {
  Cars.find({}).then(cars => res.json(cars))
})

router.get("/:id", (req, res) => {
  Cars.findById(req.params.id)
    .then(car => res.json(car))
    .catch(() => res.status(404).json({ message: "Car not found!" }))
})

module.exports = router