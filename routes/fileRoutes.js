const express = require('express')
const router = express.Router()

const {
    listFiles,
    createFile,
    createFileForm,
    getFileContent,
    updateFileName,
    deleteFile,
    uploadPaje,
    uploadFile,
    upload,
    downloadFile,
    searchFile,
    downloadCompressedFile
} = require('../controllers/fileController')

router.get('/', listFiles)
router.post('/create', createFile)
router.get('/create', createFileForm)
router.get('/files/:filename', getFileContent)
router.post('/update/:filename', updateFileName)
router.post('/files/:filename', deleteFile)
router.get('/upload', uploadPaje)
router.post('/upload', upload.single('file'), uploadFile)
router.get('/download/:filename', downloadFile)
router.get('/search', searchFile)
router.get('/download/compressed/:filename', downloadCompressedFile)

module.exports = router