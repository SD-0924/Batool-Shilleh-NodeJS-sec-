const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { listFiles, createFile, getFileContent, deleteFile } = require('../controllers/fileController');
const path = require('path')
const fs = require('fs')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const DATA_DIR = path.join(__dirname, '../data');

app.get('/', listFiles);
app.post('/create', createFile);
app.get('/files/:filename', getFileContent);
app.delete('/files/:filename', deleteFile);

describe('File Controller', () => {
    afterAll(async () => {
        // Clean up test file if it was created
        const fs = require('fs');
        const path = require('path');
        const testFilePath = path.join(__dirname, '../data/test.txt');
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
    });

    test('should list files', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

   /* test('should create a file', async () => {
        const response = await request(app)
            .post('/create')
            .send({ filename: 'test.txt', content: 'Hello, World!' });
        expect(response.statusCode).toBe(302);
    });

    test('should get file content', async () => {
        const response = await request(app).get('/files/test.txt');
        expect(response.statusCode).toBe(200);
    });

    it('should delete a file on POST /files/:filename', async () => {
        fs.writeFileSync(path.join(DATA_DIR, 'fileToDelete.txt'), 'Hello, world!');

        const response = await request(app).post('/files/fileToDelete.txt');
        expect(response.statusCode).toBe(302); // Check for redirect status
        expect(fs.existsSync(path.join(DATA_DIR, 'fileToDelete.txt'))).toBe(false);
    });*/
});
