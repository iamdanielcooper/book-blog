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

const logInUser = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        const errorMessage = !req.body.username
            ? "required field 'username' missing from request body"
            : "required field 'password' missing from request body";
        res.status(400).send({ error: errorMessage });
        return;
    }
    try {
        try {
            const userVerified = await Users.login(req.body);
            if (!userVerified) {
                res.status(401).send({ error: 'User could not be verified' });
            } else {
                res.status(200).send('User successfully logged in.');
            }
        } catch (error) {
            res.status(401).send({ error: 'User could not be verified' });
        }
    } catch (error) {
        if (error) {
            console.log(error);
            // TODO -> if the error is thrown because the passwords don't match.
        } else {
            res.status(500).send({ error: error.message });
        }
    }
};

module.exports = { addUser, logInUser };
