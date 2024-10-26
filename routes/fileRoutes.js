const express = require('express')
const router = express.Router()

const {
    listFiles,
    createFile,
    createFileForm,
} = require('../controllers/fileController')

router.get('/', listFiles)
router.post('/create', createFile)
router.get('/create', createFileForm)

module.exports = router