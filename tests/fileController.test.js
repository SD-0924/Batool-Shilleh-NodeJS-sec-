const fs = require('fs')
const path = require('path')
const { createFile, getFileContent } = require('../controllers/fileController')
jest.mock('fs')
jest.mock('crypto')

describe('FileController', () => {
    const dataDir = path.join(__dirname, '../data')
    const testFileName = 'testFile.txt'
    const testFilePath = path.join(dataDir, testFileName)
    const testContent = 'Hello, world!'

    beforeEach(() => {
        fs.writeFile.mockClear()
        fs.readFile.mockClear()
    })

    test('createFile - should create a new file', (done) => {
        const req = { body: { filename: testFileName, content: testContent } }
        const res = {
            redirect: jest.fn(() => done())
        }

        fs.writeFile.mockImplementation((filePath, content, callback) => {
            expect(filePath).toBe(testFilePath)
            expect(content).toBe(testContent)
            callback(null)
        })

        createFile(req, res)
    })

    test('getFileContent - should return file content', (done) => {
        const req = { params: { filename: testFileName } }
        const res = {
            render: jest.fn((view, data) => {
                expect(data.content).toBe(testContent)
                done()
            })
        };

        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            expect(filePath).toBe(testFilePath)
            expect(encoding).toBe('utf-8')
            callback(null, testContent)
        })

        getFileContent(req, res)
    })
    
})
