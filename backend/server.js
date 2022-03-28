const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const cars = require("./data/cars");

dotenv.config();

connectDB();

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

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`))