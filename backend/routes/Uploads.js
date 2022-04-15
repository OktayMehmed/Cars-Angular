const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }

})

function checkFileType(file, cb) {
  const fieltypes = /jpg|jpeg|png/
  const extname = fieltypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fieltypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

router.post('/', upload.single("image"), (req, res) => {
  res.json(`/${req.file.path}`)
})

module.exports = router