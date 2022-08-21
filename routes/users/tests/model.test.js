const Users = require('../models/Users');
// const database = require('../../../database/database');

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

    const testUsers = [
        { email: '123@example.com', username: '123', password: 'password', isAdmin: false },
        { email: 'abcd@example.com', username: 'abcd', password: 'Password', isAdmin: false },
        { email: 'ABCD@example.com', username: 'ABCD', password: 'pASSssword', isAdmin: false },
        { email: 'aBcD123@example.com', username: 'AbcD', password: 'passwordONE', isAdmin: false },
        { email: 'AbCd@ExAmPlE18.cOm', username: 'AbcD', password: 'password1234', isAdmin: false },
    ];

    it.each(testUsers)('When creating a new user the users email and username are converted to lowercase', testUser => {
        const newUser = new Users(testUser);
        expect(newUser.username).toBe(testUser.username.toLowerCase());
        expect(newUser.email).toBe(testUser.email.toLowerCase());
    });

    it.each(testUsers)('When creating a new user the users password is not converted to lowercase', testUser => {
        const newUser = new Users(testUser);
        expect(newUser.password).toBe(testUser.password);
    });

    it.each(testUsers)('When user requests GET /login their username is converted to lowercase', testUser => {
        Users.getByUsername = jest.fn();
        Users.getByUsername.mockReturnValue({ mock: 'mock' });

        Users.verifyPassword = jest.fn();
        Users.verifyPassword.mockReturnValue(true);

        const spy = jest.spyOn(Users, 'getByUsername');

        Users.login(testUser);
        expect(spy).toHaveBeenCalledWith(testUser.username.toLowerCase());
    });
});
