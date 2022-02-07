require('console.table');
const inquirer = require('inquirer');
const db = require('./lib/DB');
const {
    menu,
    departmentPrompts,
    rolePrompts,
    employeePrompts
} = require('./src/prompts');
const myError = () => {
    console.log(`
        Something went wrong...
    `);
};

async function showAllDepts() {
    const result = await db.getAllDepartments();
    return result.map(dept => {
        let obj = { Name: dept._name };
        return obj;
    });
};

async function showAllRoles() {
    const result = await db.getAllRoles();
    return result.map(role => {
        let obj = {
            Title: role.title,
            Salary: role.salary,
            Dept: role._name
        };
        return obj;
    });
};

async function showAllEmployees() {
    const result = await db.getAllEmployees();
    return result.map(employee => {
        let obj = {
            First_Name: employee.first_name,
            Last_Name: employee.last_name,
            ID: employee.employee_id,
            Title: employee.title,
            Dept: employee.dept,
            Salary: employee.salary,
            Manager: employee.manager
        };
        return obj;
    });
};

const addNewDept = () => {
    // capture user data, send to db
    return departmentPrompts()
        .then(newDept => {
            return db.addDepartment(newDept);
        }).then(result => {
            // if not add, notify user and return menu
            if (!result.affectedRows) {
                myError();
                return mainMenu(menu);
            }
            // notify user add is success, return to menu
            console.log(result.message);
            return mainMenu(menu);
        })
};


const addNewRole = () => {
    // capture user data, add to db
    return rolePrompts()
        .then(newRole => {
            return db.addRole(newRole);
        })
        .then(result => {
            // if not added, error and send back to menu
            if (!result.affectedRows) {
                myError();
                return mainMenu(menu);
            }
            // tell user add was success, return menu
            console.log(result.message);
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

// main menu
const mainMenu = (questions) => {
    return inquirer.prompt(questions)
        .then(answer => {
            let userChoice = answer.menu;

            switch (userChoice) {
                case 'allDept':
                    showAllDepts().then(data => {
                        console.table('Departments', data);
                        mainMenu(menu);
                    });
                    break;
                case 'allRoles':
                    showAllRoles().then(data => {
                        console.table('Employee Roles', data);
                        mainMenu(menu);
                    });
                    break;
                case 'allEmployees':
                    showAllEmployees().then(data => {
                        console.table('Employees', data);
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
                    return process.kill(process.pid, 'SIGTERM');
            }
        })
        .catch(err => console.log(err));
};

// start app
const init = () => {
    console.log(`
    ======================================================
               Welcome to your Employee Tracker
    ------------------------------------------------------
     Keep track of employees with your own local database
    ======================================================
    `);
    // call menu
    mainMenu(menu);
};

init();

//getDeptList().then(result => console.log(result));
// db.addDepartment({ _name:'Lelah' }).then(result => console.log(result));