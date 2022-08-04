const request = require('supertest');
const server = require('../../../app');

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
        const testUser = {
            username: '123',
            email: '123@example.com',
            password: '12345',
            isAdmin: true,
        };
        request(api).post('/users/register').send(testUser).expect(201, done);
    });

    test("a request POST /users/register with existing username returns status '400 Bad Request'", done => {
        const testUser = {
            username: '123',
            email: '123@example.com',
            password: '12345',
            isAdmin: true,
        };

        // Add user.
        // Try to add user with the same username

        request(api).post('/users/register').send(testUser).expect(400, done);
    });
});
