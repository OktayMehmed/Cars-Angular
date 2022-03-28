const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const Cars = require('./routes/Cars');

dotenv.config();

connectDB();

const app = express();
app.use(cors())

app.get("/", (req, res) => {
  res.send("API is running")
})

app.use('/api/cars', Cars)

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`))