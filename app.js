const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database Controls
const databaseRoutes = require('./routes/database/databaseRoutes');
app.use('/database', databaseRoutes);

// Users
const usersRoutes = require('./routes/users/usersRoutes');
app.use('/users', usersRoutes);

module.exports = app;
