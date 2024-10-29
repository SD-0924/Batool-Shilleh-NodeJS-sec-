const fs = require('fs')
const path = require('path')
const multer = require('multer')
const archiver = require('archiver')
const crypto = require('crypto')
const encryptionKey = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

const dataDir = path.join(__dirname, '../data')
const upload = multer({ dest: path.join(__dirname, '../data') })


function encryptFile(filePath, destPath) {
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv)
    const input = fs.createReadStream(filePath)
    const output = fs.createWriteStream(destPath)

    input.pipe(cipher).pipe(output)

    output.on('finish', () => {
        console.log('File encryption completed.')
    })

    input.on('error', (err) => {
        console.error('Error reading file:', err)
    })

    output.on('error', (err) => {
        console.error('Error writing encrypted file:', err)
    })
}


const listFiles = (req, res) => {
    fs.readdir(dataDir, (err, files) => {
        if (err) return res.status(500).send("Error reading directory")
            res.render('index', { files })
    })
}

const createFileForm = (req, res) => {
    res.render('create')
}


const createFile = (req, res) => {
    console.log('Request body:', req.body)
    const {filename, content} = req.body
    const filePath = path.join(dataDir, filename)

    fs.writeFile(filePath, content, (err) => {
        if (err) return res.status(500).send("Error creating file")
        res.redirect('/')
    })
}

const getFileContent = (req, res) => {
    const { filename } = req.params
    const filePath = path.join(dataDir, filename)

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return res.status(404).send("File not found")
        res.render('detail', { filename, content: data })
    })
}

const updateFileName = (req, res) => {
    const { filename } = req.params
    const { newFilename } = req.body
    const oldName = path.join(dataDir, filename)
    const newPath = path.join(dataDir, newFilename)

    fs.rename(oldName, newPath, (err) => {
        if (err) return res.status(500).send("Error renaming file")
        res.status(200).json({ message: "File renamed successfully" })
    })
}

const deleteFile = (req, res) => {
    const { filename } = req.params
    const filePath = path.join(dataDir, filename)

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Error deleting file")
        }
        res.redirect('/')
    })
}

const uploadPaje = (req, res) => {
    res.render('upload')
}

const uploadFile = (req, res) => {
    const file = req.file
    const compress = req.body.compress === 'on'
    const encrypt = req.body.encrypt === 'on'

    if (!file) {
        return res.status(400).send('No file uploaded')
    }

    
    if (encrypt) {
        const encryptedPath = path.join(dataDir, `${file.originalname}.enc`)
        encryptFile(file.path, encryptedPath)

        
        fs.unlink(file.path, (err) => {
            if (err) console.error('Error deleting original file:', err)
        })
        
        res.redirect('/')
    } 
    
    else if (compress) {
        const output = fs.createWriteStream(path.join(dataDir, `${file.originalname}.zip`))
        const archive = archiver('zip', { zlib: { level: 9 } })

        output.on('close', () => {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path)
            }
            res.redirect('/')
        })
        archive.on('error', (err) => {
            console.error('Archiving error:', err)
            res.status(500).send('Error during file compression')
        })

        archive.pipe(output);
        archive.file(file.path, { name: file.originalname })
        archive.finalize()
    } else {
        const destPath = path.join(dataDir, file.originalname)
        fs.rename(file.path, destPath, (err) => {
            if (err) {
                console.error('Error moving file:', err)
                return res.status(500).send('Error saving file')
            }
            res.redirect('/')
        });
    }
}

downloadFile =  (req, res) => {
    const filename = req.params.filename
    const filePath = path.join(dataDir, filename)
 
    res.download(filePath, (err) => {
         if (err) {
             res.status(404).send("File not found.")
         }
    })
 }
 
const searchFile = (req, res) => {
    const query = req.query.query.toLowerCase()
    fs.readdir(dataDir, (err, files) => {
        if (err) return res.status(500).send("Error reading directory")
        
        const filteredFiles = files.filter(file => file.toLowerCase().includes(query))
        
        res.render('search-results', { results: filteredFiles })
    })
}

const downloadCompressedFile = (req, res) => {
    const filename = req.params.filename
    const filePath = path.join(dataDir, filename)
    const zipPath = `${filePath}.zip`

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found')
    }

    if (fs.existsSync(zipPath)) {
        return res.download(zipPath, (err) => {
            if (err) {
                res.status(500).send('Error downloading compressed file')
            }
        })
    } else {
        const output = fs.createWriteStream(zipPath)
        const archive = archiver('zip', { zlib: { level: 9 } })

        output.on('close', () => {
            res.download(zipPath, (err) => {
                if (err) {
                    res.status(500).send('Error downloading compressed file')
                }
            })
        })

        archive.on('error', (err) => {
            console.error('Archiving error:', err)
            res.status(500).send('Error during file compression')
        })

        archive.pipe(output)
        archive.file(filePath, { name: filename })
        archive.finalize()
    }
}

module.exports = {listFiles, createFile, createFileForm, getFileContent, updateFileName, deleteFile,uploadPaje,uploadFile, upload, downloadFile, searchFile, downloadCompressedFile,encryptFile}