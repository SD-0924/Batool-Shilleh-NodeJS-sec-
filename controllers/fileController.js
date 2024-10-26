const fs = require('fs')
const path = require('path')

const dataDir = path.join(__dirname, '../data')

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
    console.log('Request body:', req.body);
    const {filename, content} = req.body
    const filePath = path.join(dataDir, filename)

    fs.writeFile(filePath, content, (err) => {
        if (err) return res.status(500).send("Error creating file")
        res.redirect('/')
    })
}

module.exports = {listFiles, createFile, createFileForm}