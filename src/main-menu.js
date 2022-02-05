const mainMenu = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: [
            {
                name: 'View All Departments',
                value: 'allDept',
                short: 'Showing all departments'
            },
            {
                name: 'View All Roles',
                value: 'allRoles',
                short: 'Showing all roles'
            },
            {
                name: 'View All Employees',
                value: 'allEmployees',
                short: 'Showing all employees'
            },
            {
                name: 'Add a Department',
                value: 'addDept',
                short: 'Adding a new department'
            },
            {
                name: 'Add a Role',
                value: 'addRole',
                short: 'Adding a new role',
            },
            {
                name: 'Add an Employee',
                value: 'addEmployee',
                short: 'Adding a new employee'
            },
            {
                name: "Update an Employee's Role",
                value: 'updateEmployeeRole',
                short: 'Updatng an employee'
            },
            {
                name: 'Exit',
                value: 'exitApp',
                short: 'Bye!'
            }
        ]
    }
];

module.exports = mainMenu;