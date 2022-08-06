const Users = require('../models/Users');

describe('Create new user', () => {
    it('The users password is hashed when the constructor is called.', () => {
        const testUser = {
            username: 'im new',
            email: 'andme@example.com',
            password: '12345',
            isAdmin: true,
        };

        const spy = jest.spyOn(Users, 'hashPassword');

        const result = Users.create(testUser);
        expect(result.password).not.toBe(testUser.password);
        expect(spy).toHaveBeenCalled();
    });

    it('Users.createUser calls the Users.hashPassword method', () => {
        Users.emailTaken = jest.fn();
        Users.usernameTaken = jest.fn();
        Users.createUser = jest.fn();

        Users.emailTaken.mockReturnValue(false);
        Users.usernameTaken.mockReturnValue(false);
        Users.createUser.mockReturnValue('User successfully added.');
        const spy = jest.spyOn(Users, 'hashPassword');

        const testUser = {
            username: 'im new',
            email: 'andme@example.com',
            password: '12345',
            isAdmin: true,
        };

        Users.createUser(testUser);
        expect(spy).toHaveBeenCalled();
    });

    it('The hash function returns a different password to what is passed in', () => {
        const plainTextPassword = 'ILoveTests';
        const result = Users.hashPassword(plainTextPassword);
        expect(result).not.toBe(plainTextPassword);
    });
});
