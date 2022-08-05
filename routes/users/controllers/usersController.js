const Users = require('../models/Users');

const addUser = async (req, res) => {
    //== Out of Scope
    // Email Validation.
    // Password Strength validation.
    //==

    try {
        if (await Users.emailTaken(req.body.email)) {
            res.status(400).send({ error: 'Email is already associated with another user.' });
        } else if (await Users.usernameTaken(req.body.username)) {
            res.status(400).send({ error: 'Username is already associated with another user.' });
        } else {
            const user = await Users.createUser(req.body);
            res.status(201).send(user);
        }
    } catch (error) {
        res.status(503).send({ error: 'Error adding user to database.' });
    }
};

module.exports = { addUser };
