const express = require('express');
const cors = require("cors")
const cars = require("./data/cars")

const app = express();
app.use(cors())

app.get("/", (req, res) => {
  res.send("okey")
})

app.get("/api/cars", (req, res) => {
  res.json(cars)
})

app.get("/api/cars/:id", (req, res) => {
  const car = cars.find((car) => car._id === req.params.id);

  res.json(car)
})

app.listen(8000, console.log("Server is ready"))