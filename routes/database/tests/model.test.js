const Database = require('../models/Database');

describe('Database setup', () => {
    it('When .initDatabase is called all sub methods are also called', () => {
        Database.initUsers = jest.fn();
        const spy = jest.spyOn(Database, 'initUsers');

        Database.initUsers.mockResolvedValueOnce('added');

        Database.initDatabase();
        expect(spy).toHaveBeenCalled();
    });

    it('When .initDatabase is called but one of the sub methods throws an error .initDatabase throws and error', async () => {
        Database.initUsers = jest.fn().mockRejectedValue(new Error('Async error message'));

        const result = await Database.initDatabase();

        await expect(result).rejects;
    });
});
