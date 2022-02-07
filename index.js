require('console.table');
const inquirer = require('inquirer');
const db = require('./lib/DB');
const {
    menu,
    departmentPrompts,
    rolePrompts,
    employeePrompts,
    updateEmpRolePrompts,
    updateEmpManagerPrompts
} = require('./src/prompts');
const myError = () => {
    console.log(`
        Something went wrong...
    `);
};
const space = `

`;

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
    return employeePrompts()
        .then(newEmployee => {
            return db.addEmployee(newEmployee);
        })
        .then(result => {
            if (!result.affectedRows) {
                myError();
                return mainMenu(menu);
            }
            console.log(result.message);
            return mainMenu(menu);
        })
};

const updateEmployeeRole = () => {
    return updateEmpRolePrompts()
        .then(updatedEmployee => {
            return db.updateEmployeeRole(updatedEmployee);
        })
        .then(result => {
            // if nothing happened, tell user and return to menu
            if (!result.affectedRows) {
                myError();
                return mainMenu(menu);
            }
            // tell user update is success, return menu
            console.log(result.message);
            return mainMenu(menu);
        })
};

const updateManager = () => {
    return updateEmpManagerPrompts()
        .then(updatedEmployee => {
            console.log(updatedEmployee);
            return db.updateEmployeeManager(updatedEmployee);
        })
        .then(result => {
            console.log(result);
            return mainMenu(menu);
        })
};

// main menu
const mainMenu = (questions) => {
    console.log(`
    
          Menu  
         ¯¯¯¯¯¯
    `)
    return inquirer.prompt(questions)
        .then(answer => {
            let userChoice = answer.menu;

            switch (userChoice) {
                case 'allDept':
                    showAllDepts().then(data => {
                        console.log(space);
                        console.table('Departments', data);
                        mainMenu(menu);
                    });
                    break;
                case 'allRoles':
                    showAllRoles().then(data => {
                        console.log(space);
                        console.table('Employee Roles', data);
                        mainMenu(menu);
                    });
                    break;
                case 'allEmployees':
                    showAllEmployees().then(data => {
                        console.log(space);
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
                case 'updateManager':
                    updateManager();
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
//db.getManagers().then(result => console.log(result));