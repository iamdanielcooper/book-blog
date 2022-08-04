const Database = require('../models/Database');

const initDatabase = async (req, res) => {
    try {
        await Database.initDatabase();
        res.status(201).send('Database successfully initialized.');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
const seedDatabase = async () => {};

module.exports = { initDatabase, seedDatabase };
