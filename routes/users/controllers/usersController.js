const Users = require('../models/Users');

const addUser = (req, res) => {
    //== Error handling
    // Check if username is available.
    // Check email is available.
    // Status code 400.
    //==

    //== Out of Scope
    // Email Validation.
    // Password Strength validation.
    //==

    // Add user to the database.
    // Status code 201.

    const user = Users.createUser(req.body);

    res.status(201).send(user);
};

module.exports = { addUser };
