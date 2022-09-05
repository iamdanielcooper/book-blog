const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database Controls
if (process.env.ENV === 'DEV') {
    const databaseRoutes = require('./routes/database/databaseRoutes');
    app.use('/database', databaseRoutes);
}

// Users
const usersRoutes = require('./routes/users/usersRoutes');
app.use('/users', usersRoutes);

module.exports = app;
