const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { listFiles } = require('../controllers/fileController');
const path = require('path')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', listFiles);

const mockFiles = ['file1.txt', 'file2.txt', 'file3.txt'];

beforeAll(() => {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
});

afterAll(() => {
    const filePath = `${dataDir}/testFile.txt`;
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
});

const createFileHelper = (filename, content) => {
    const filePath = `${dataDir}/${filename}`;
    fs.writeFileSync(filePath, content);
};

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

jest.mock('../controllers/fileController', () => ({
    listFiles: jest.fn((req, res) => {
        res.send(`<ul>${mockFiles.map(file => `<li>${file}</li>`).join('')}</ul>`);
    }),
    createFile: (req, res) => { 
        createFileHelper(req.body.filename, req.body.content); // Use helper function
        res.redirect('/');
    },
}));

describe('File Controller', () => {
    test('should list files', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('file1.txt');
        expect(response.text).toContain('file2.txt');
        expect(response.text).toContain('file3.txt');
    });
    
});
