const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const { listFiles} = require('../controllers/fileController')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', listFiles)

const mockFiles = ['file1.txt', 'file2.txt', 'file3.txt'];

jest.mock('../controllers/fileController', () => ({
    listFiles: jest.fn((req, res) => {
        res.send(`<ul>${mockFiles.map(file => `<li>${file}</li>`).join('')}</ul>`);
    }),
}));

describe('File Controller', () => {
    test('should list files', async () => {
        const response = await request(app).get('/')
        expect(response.statusCode).toBe(200)
        expect(response.text).toContain('file1.txt')     
        expect(response.text).toContain('file2.txt')
        expect(response.text).toContain('file3.txt')
    })
})