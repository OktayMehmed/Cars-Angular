const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const authUser = (req, res) => {
  const { email, password } = req.body

  User.findOne({ email })
    .then(user => Promise.all([user, user.matchPassword(password)]))
    .then(([user, match]) => {
      if (user && match) {
        res.json({
          _id: user._id,
          email: user.email,
          name: user.name,
          token: generateToken(user._id)
        })
      } else {
        res.status(401).json({ message: "Invalid email or password" })
      }
    }).catch(() => res.status(401).json({ message: "Invalid email or password" }))
}

const getUserProfile = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      res.json({
        _id: user._id,
        email: user.email,
        name: user.name,
      })
    })
    .catch(() => res.status(404).json({ message: "User not found" }))
}

const updateUserProfile = (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password
      }


      user.save().then(updatedUser => {
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          token: generateToken(updatedUser._id)
        })
      })
    })
    .catch(() => res.status(404).json({ message: "User not found!" }))
}

const registerUser = (req, res) => {
  const { email, name, password } = req.body

  User.findOne({ email }).then(existUser => {
    if (existUser) {
      res.status(400).json({ message: "User already exist" });
      return;
    }
  })

  User.create({
    email,
    name,
    password
  })
    .then(createdUser => {
      res.json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        token: generateToken(createdUser._id)
      })
    }).catch(() => res.status(400).json({ message: "Invalid user data" }));
}

module.exports = { authUser, getUserProfile, registerUser, updateUserProfile }