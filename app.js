const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Users
const usersRoutes = require('./routes/users/usersRoutes');
app.use('/users', usersRoutes);

module.exports = app;
