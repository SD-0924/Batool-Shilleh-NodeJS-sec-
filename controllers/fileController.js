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

const getFileContent = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(dataDir, filename);

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return res.status(404).send("File not found");
        res.render('detail', { filename, content: data });
    });
}

const updateFileName = (req, res) => {
    const { filename } = req.params;
    const { newFilename } = req.body;
    const oldName = path.join(dataDir, filename);
    const newPath = path.join(dataDir, newFilename);

    fs.rename(oldName, newPath, (err) => {
        if (err) return res.status(500).send("Error renaming file");
        res.status(200).json({ message: "File renamed successfully" });
    });
}

const deleteFile = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(dataDir, filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error deleting file");
        }
        res.redirect('/');
    });
}


module.exports = {listFiles, createFile, createFileForm, getFileContent, updateFileName, deleteFile}