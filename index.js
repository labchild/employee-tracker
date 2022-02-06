require('console.table');
const inquirer = require('inquirer');
const db = require('./lib/DB');
const {
    menu,
    departmentPrompts,
    rolePrompts,
    employeePrompts
} = require('./src/prompts');

async function showAllDepts() {
    const result = await db.viewAllDepartments();
    return result;
};

async function showAllRoles() {
    const result = await db.viewAllRoles();
    return result;
};

async function showAllEmployees() {
    const result = await db.viewAllEmployees();
    return result;
};

const addNewDept = () => {
    return inquirer.prompt(departmentPrompts)
        .then(newDept => {
            return db.addDepartment(newDept);
        }).then(result => {
            if (!result) {
                console.log(`
                Something went wrong...
                `);
                return mainMenu(menu);
            }
            console.log(`
            Department added.
            `);
            return mainMenu(menu);
        })
};

const addNewRole = () => {
    return inquirer.prompt(rolePrompts)
        .then(newRole => {
            db.addRole(newRole);
            return mainMenu(menu);
        })
};

const addNewEmployee = () => {
    return inquirer.prompt(employeePrompts)
        .then(newEmployee => {
            return db.addEmployee(newEmployee);
        })
        .then(result => {
            if (!result.affectedRows) {
                console.log('Something went wrong!');
                return mainMenu(menu);
            }
            console.log('Employee added!');
            return mainMenu(menu);
        })
};

const updateEmployeeRole = () => {
    console.log('updating...');
    return mainMenu(menu);
}

const mainMenu = (questions) => {
    console.log(`
    ======================================================
               Welcome to your Employee Tracker
    ------------------------------------------------------
     Keep track of employees with your own local database
    ======================================================
    `);
    return inquirer.prompt(questions);
};

// start app
 
mainMenu(menu)
    .then(answer => {
        let userChoice = answer.menu;

        switch (userChoice) {
            case 'allDept':
                showAllDepts().then(data => {
                    console.table(data);
                    mainMenu(menu);
                });
                break;
            case 'allRoles':
                db.viewAllRoles().then(data => {
                    console.table(data);
                    mainMenu(menu);
                });
                break;
            case 'allEmployees':
                db.viewAllEmployees().then(data => {
                    console.table(data);
                    mainMenu(menu);
                });
                break;
            case 'addDept':
                addNewDept();
                break;
            case 'addRole':
                addNewRole();
                break;
            case 'addEmployee':
                addNewEmployee();
                break;
            case 'updateEmployeeRole':
                updateEmployeeRole();
                break;
            case 'exitApp':
                return process.exit;
        }
    })
    .catch(err => console.log(err));

// db.addDepartment({ _name:'Lelah' }).then(result => console.log(result));