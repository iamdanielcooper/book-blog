const database = require("'../../../database/database");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Users {
    constructor(data) {
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
        this.isAdmin = data.isAdmin;
        this.emailConfirmed = false;
    }

    static create(data) {
        return new Users({ ...data, password: this.hashPassword(data.password) });
    }

    static async createUser(data) {
        try {
            const newUser = this.create(data);
            await database.none(
                'INSERT INTO users(username, password, email, is_admin, email_confirmed) VALUES ($1, $2, $3, $4, $5);',
                [newUser.username, newUser.password, newUser.email, newUser.isAdmin, newUser.emailConfirmed]
            );
            return 'User successfully added.';
        } catch (error) {
            return error;
        }
    }

    static async getByUsername(username) {
        const result = await database.oneOrNone('SELECT * FROM users WHERE username = $1', username);
        return result;
    }

    static async getByEmail(email) {
        const result = await database.oneOrNone('SELECT * FROM users WHERE email = $1', email);
        return result;
    }

    static async emailTaken(email) {
        return (await this.getByEmail(email)) ? true : false;
    }

    static async usernameTaken(username) {
        return (await this.getByUsername(username)) ? true : false;
    }

    static hashPassword(password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(password, salt);
    }
}

module.exports = Users;
