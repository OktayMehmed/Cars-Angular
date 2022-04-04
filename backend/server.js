const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const Cars = require('./routes/Cars');
const User = require('./routes/User');

dotenv.config();

connectDB();

const app = express();
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}))

app.get("/", (req, res) => {
  res.send("API is running")
})

app.use('/api/cars', Cars);
app.use('/api/users', User);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`))