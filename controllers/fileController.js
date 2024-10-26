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

    const { filename, content } = req.body; 
    if (!filename || !content) {
        return res.status(400).send('Filename and content are required.');
    }

    try {
        const filePath = path.join(dataDir, filename);
        fs.writeFileSync(filePath, content);
        res.redirect('/'); 
    } catch (error) {
        console.error('Error creating file:', error);
        res.status(500).send('Error creating file');
}

module.exports = {listFiles, createFile, createFileForm}