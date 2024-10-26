const express = require('express')
const router = express.Router()

const {
    listFiles,
    createFile,
    createFileForm,
    getFileContent,
    updateFileName,
    deleteFile
} = require('../controllers/fileController')

router.get('/', listFiles)
router.post('/create', createFile)
router.get('/create', createFileForm)
router.get('/files/:filename', getFileContent);
router.post('/update/:filename', updateFileName)
router.post('/files/:filename', deleteFile);
module.exports = router