const database = require('../../../database/database');

class Database {
    constructor() {}

    static async initDatabase() {
        try {
            await this.initUsers();
        } catch (error) {
            return error;
        }
    }

    static async initUsers() {
        try {
            await database.any('DROP TABLE IF EXISTS users;');
            await database.any(
                `CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(250),
                    email VARCHAR(250),
                    password VARCHAR(250),
                    is_admin BOOLEAN,
                    email_confirmed BOOLEAN);`
            );
        } catch (error) {
            return error;
        }
    }
}

module.exports = Database;
