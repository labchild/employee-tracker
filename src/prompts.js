const db = require("../lib/DB");

async function getDeptList() {
    let departments = ['No department'];
    const result = await db.getAllDepartments();
    result.forEach(dept => {
        let obj = {
            id: dept.id,
            name: dept._name
        };
        departments.push(obj);
    });

    return departments;
};

async function getRoleList() {
    let roles = ['No title'];
    const result = await db.viewAllRoles();
    result.forEach(role => {
        let obj = {
            id: role.id,
            title: role.title
        };
        roles.push(obj);
    });

    return roles;
}

const menu = [
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

const departmentPrompts = [
    {
        type: 'input',
        name: '_name',
        message: "Enter the name of the department you'd like to add.",
        validate: deptInput => {
            if (!deptInput) {
                console.log('The new department still needs a name.');
                return false;
            }
            return true;
        }
    }
];

const rolePrompts = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of this new role?',
        validate: titleInput => {
            if (!titleInput) {
                console.log('You must enter a title!');
                return false;
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary (do not include commas, decimals, or $).',
        validate: salaryInput => {
            if (!salaryInput || isNaN(salaryInput)) {
                console.log('Enter a valid number (using only numbers).');
                return false;
            }
            return true;
        }
    },
    {
        type:'rawlist',
        name: 'dept_id',
        message: 'Which department does this role belong to?',
        choices: getDeptList()
    }
];

const employeePrompts = [
    {
        type: 'input',
        name: 'first_name',
        message: "Enter the new employee's first name.",
        validate: nameInput => {
            if (!nameInput) {
                console.log("Enter the new employee's first name. (Required)");
                return false;
            }
            return true;
        }
    },
    {
        type:'input',
        name:'last_name',
        message: "Enter the new employee's last name.",
        validate: nameInput => {
            if (!nameInput) {
                console.log("Enter the new employee's last name. (Required)");
                return false;
            }
            return true;
        }
    },
    {
        type:'rawlist',
        name:'role_id',
        message: "What is the employee's title?",
        choices: getRoleList
    },
    {
        type: 'rawlist',
        name: 'manager_id',
        message:"Who is the employee's manager?",
        choices: getDeptList
    }
];


module.exports = {
    menu,
    departmentPrompts,
    rolePrompts,
    employeePrompts
};