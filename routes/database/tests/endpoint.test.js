const request = require('supertest');
const server = require('../../../app');
const Database = require('../models/Database');

describe('Users Tests', () => {
    let api;

    beforeAll(() => {
        api = server.listen(0, () => console.log('Test server running on port 3000'));
    });

    afterAll(done => {
        console.log('Stopping test server');
        api.close(done);
    });

    test("successful requests to POST /database/init returns status '201 created'", done => {
        Database.initUsers = jest.fn();
        Database.initDatabase = jest.fn();

        Database.initUsers.mockReturnValue(false);
        Database.initDatabase.mockReturnValue(false);

        request(api).post('/database/init').expect(201, done);
    });

    test("unsuccessful requests to POST /database/init returns status '500 internal server error'", done => {
        Database.initUsers = jest.fn();
        Database.initDatabase = jest.fn();

        Database.initUsers.mockRejectedValue(new Error('Async error message'));
        Database.initDatabase.mockRejectedValue(new Error('Async error message'));

        request(api).post('/database/init').expect(500, done);
    });
});
