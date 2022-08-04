const express = require('express');
const router = express.Router();

const databaseController = require('./controllers/databaseController');
router.post('/init', databaseController.initDatabase);
router.post('/seed', databaseController.seedDatabase);

module.exports = router;
