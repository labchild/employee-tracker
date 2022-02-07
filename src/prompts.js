const inquirer = require("inquirer");
const db = require("../lib/DB");

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

const departmentPrompts = () => {
    return inquirer.prompt([
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
    ]);
};

const rolePrompts = async () => {
    // get depts from db
    let result = await db.getAllDepartments();
    let depts = result.map(dept => {
        let obj = {
            value: dept.dept_id,
            name: dept._name
        };
        return obj;
    });

    let prompts = [
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
            type: 'list',
            name: 'dept_id',
            message: 'Which department does this role belong to?',
            choices: depts
        }
    ];

    return inquirer.prompt(prompts);
};

const employeePrompts = async () => {
    // get roles from db, makes roles arr for role choices
    const titles = await db.getAllRoles();
    let roles = titles.map(role => {
        let obj = {
            value: role.role_id,
            name: role.title
        };
        return obj;
    });

    // get employees from db, create managers arr for manager choices
    const people = await db.getAllEmployees();
    let managers = people.filter(person => person.title === 'Manager').map(manager => {
        let obj = {
            value: manager.employee_id,
            name: `${manager.first_name} ${manager.last_name}`
        };
        return obj;
    });

    managers.push({
        value: null,
        name: 'N/A'
    });

    // create employee questions
    let prompts = [
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
            type: 'input',
            name: 'last_name',
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
            type: 'list',
            name: 'role_id',
            message: "What is the employee's title?",
            choices: roles
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Who is the employee's manager?",
            choices: managers
        }
    ];

    return inquirer.prompt(prompts);
}

const updateEmpRolePrompts = async () => {
    // get employees for update choices
    const people = await db.getAllEmployees();
    let employees = people.map(person => {
        let obj = {
            value: person.employee_id,
            name: `${person.first_name} ${person.last_name}`
        };
        return obj;
    });

    // get roles for new role choices
    const titles = await db.getAllRoles();
    let roles = titles.map(title => {
        let obj = {
            value: title.role_id,
            name: title.title
        };
        return obj;
    });

    // create prompts
    let prompts = [
        {
            type: 'rawlist',
            name: 'employee_id',
            message: 'Which employee would you like to update?',
            choices: employees
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is their new title?',
            choices: roles
        }
    ];

    return inquirer.prompt(prompts);
}

module.exports = {
    menu,
    departmentPrompts,
    rolePrompts,
    employeePrompts,
    updateEmpRolePrompts
};