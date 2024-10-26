const express = require('express')
const router = express.Router()

const {
    listFiles
} = require('../controllers/fileController')

router.get('/', listFiles)

module.exports = router