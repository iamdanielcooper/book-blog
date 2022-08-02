const request = require('supertest');
const server = require('../../../app');

describe('Users Tests', () => {
    let api;

    beforeAll(() => {
        api = server.listen(3000, () => console.log('Test server running on port 5000'));
    });

    afterAll(done => {
        console.log('Stopping test server');
        api.close(done);
    });

    test("successful requests to POST /users/register returns status '201 created'", done => {
        request(api).post('/users/register').expect(201, done);
    });
});
