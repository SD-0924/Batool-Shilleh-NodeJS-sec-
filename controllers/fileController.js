const fs = require('fs')
const path = require('path')

const dataDir = path.join(__dirname, '../data')

const listFile = (req, res) => {
    fs.readdir(dataDir, (err, files) => {
        if (err) return res.status(500).send("Error reading directory")
            res.render('index', { files })
    })
}