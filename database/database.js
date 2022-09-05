const pgp = require('pg-promise')();
require('dotenv').config();

let ssl = { rejectUnauthorized: false };

const config = {
    connectionString: process.env.POSTGRESQL_ADDON_URI,
    max: 30,
};

module.exports = pgp(config);
