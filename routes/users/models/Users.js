const database = require("'../../../database/database");

class Users {
    constructor(data) {
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
        this.isAdmin = data.isAdmin;
        this.emailConfirmed = false;
    }

    static async createUser(data) {
        try {
            const newUser = new Users(data);
            await database.none(
                'INSERT INTO users(username, password, email, is_admin, email_confirmed) VALUES ($1, $2, $3, $4, $5);',
                [newUser.username, newUser.password, newUser.email, newUser.isAdmin, newUser.emailConfirmed]
            );
            return 'User successfully added.';
        } catch (error) {
            console.log(error);
        }
    }

    static async getByUsername(username) {
        const result = await database.oneOrNone('SELECT * FROM users WHERE username = $1', username);
        return result ? true : false;
    }

    static async getByEmail(email) {
        const result = await database.oneOrNone('SELECT * FROM users WHERE email = $1', email);
        return result ? true : false;
    }

    static async emailTaken(email) {
        return await this.getByEmail(email);
    }

    static async usernameTaken(username) {
        return await this.getByUsername(username);
    }
}

module.exports = Users;
