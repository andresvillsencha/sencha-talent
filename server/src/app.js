const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Node.js API is running'
    });
});

app.use('/api', routes);

app.use(
    '/files',
    express.static(path.join(__dirname, '../files'))
);

app.use(notFound);
app.use(errorHandler);

module.exports = app;