const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { logRequist, handle404 } = require('./middleware/loggingMiddleware');
const fileRoutes = require('./routes/fileRoutes');

const app= express()
const PORT = 3000 

app.use(logRequist);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));