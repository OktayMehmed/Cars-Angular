const express = require('express');
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const Cars = require('./routes/Cars');
const User = require('./routes/User');
const Upload = require('./routes/Uploads');

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
app.use('/api/upload', Upload);

__dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`))