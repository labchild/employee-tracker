const Department = require('../lib/Department');

// check that Dept class creates a dept obj
test('check Department class create obj with properties', () => {
    const dept = new Department('Finance');

    expect(dept.name).toBe('Finance');
});