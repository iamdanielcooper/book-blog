class Users {
    constructor(data) {
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
        this.isAdmin = data.isAdmin;
        this.emailConfirmed = false;
    }

    static createUser(data) {
        return new Users(data);
    }

    static getByUsername(username) {
        // TODO => return user from database.
    }

    static usernameTaken() {
        // TODO => call database. Return true/false
    }

    static emailTaken() {
        // TODO => call database. Return true/false
    }
}

module.exports = Users;
