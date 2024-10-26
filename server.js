const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { logRequist, handle404 } = require('./middleware/loggingMiddleware')
const fileRoutes = require('./routes/fileRoutes')

const app= express()
const PORT = 5000 

app.use(logRequist);
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', fileRoutes)
app.use(handle404)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});