const express = require('express');
const router = express.Router();

const usersController = require('./controllers/usersController');

router.post('/register', usersController.addUser);
router.post('/login', usersController.logInUser);

module.exports = router;
