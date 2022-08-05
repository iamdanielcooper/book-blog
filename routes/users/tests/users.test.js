const request = require('supertest');
const server = require('../../../app');
const Users = require('../models/Users');

describe('Users Tests', () => {
    let api;

    beforeAll(() => {
        api = server.listen(3000, () => console.log('Test server running on port 3000'));
    });

    afterAll(done => {
        console.log('Stopping test server');
        api.close(done);
    });

    test("successful requests to POST /users/register returns status '201 created'", done => {
        Users.emailTaken = jest.fn();
        Users.usernameTaken = jest.fn();
        Users.createUser = jest.fn();

        Users.emailTaken.mockReturnValue(false);
        Users.usernameTaken.mockReturnValue(false);
        Users.createUser.mockReturnValue('User successfully added.');

        const testUser = {
            username: 'im new',
            email: 'andme@example.com',
            password: '12345',
            isAdmin: true,
        };
        request(api).post('/users/register').send(testUser).expect(201, done);
    });

    test("request to POST /users/register with existing username returns status '400 Bad Request'", done => {
        Users.usernameTaken = jest.fn();
        Users.usernameTaken.mockReturnValue(true);

        const testUser = {
            username: '123',
            email: '123@example.com',
            password: '12345',
            isAdmin: true,
        };

        request(api).post('/users/register').send(testUser).expect(400, done);
    });

    test("request to POST /users/register with existing email returns status '400 Bad Request'", done => {
        Users.emailTaken = jest.fn();
        Users.emailTaken.mockReturnValue(true);

        const testUser = {
            username: '123',
            email: '123@example.com',
            password: '12345',
            isAdmin: true,
        };

        request(api).post('/users/register').send(testUser).expect(400, done);
    });

    test("if createUser returns an error the client receives '503 status code'", done => {
        Users.emailTaken = jest.fn();
        Users.usernameTaken = jest.fn();
        Users.createUser = jest.fn();

        Users.emailTaken.mockReturnValue(false);
        Users.usernameTaken.mockReturnValue(false);
        Users.createUser.mockRejectedValue(new Error('Async error message'));

        const testUser = {
            username: '123',
            email: '123@example.com',
            password: '12345',
            isAdmin: true,
        };

        request(api).post('/users/register').send(testUser).expect(503, done);
    });
});
