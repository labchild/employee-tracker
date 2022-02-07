require('console.table');
const inquirer = require('inquirer');
const db = require('./lib/DB');
const {
    menu,
    departmentPrompts,
    rolePrompts,
    employeePrompts,
    updateEmpRolePrompts,
    updateEmpManagerPrompts,
    byManagerPrompts
} = require('./src/prompts');
const myError = () => {
    console.log(`
        Something went wrong...
    `);
};
const space = `

`;

// view records
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
    return result;
};

const showEmployeesByMananger = async () => {
    const answer = await byManagerPrompts();
    const teamList = await db.getEmployeesByManager(answer);

    return teamList;
};

// add records
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
    // capture user data and return data to db
    return employeePrompts()
        .then(newEmployee => {
            return db.addEmployee(newEmployee);
        })
        .then(result => {
            // is failed, tell the user and send to menu
            if (!result.affectedRows) {
                myError();
                return mainMenu(menu);
            }
            // is success, tell user and send to menu
            console.log(result.message);
            return mainMenu(menu);
        })
};

// update records
const updateEmployeeRole = () => {
    // capture user data and send to db
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
    // capture user data and send to db
    return updateEmpManagerPrompts()
        .then(updatedEmployee => {
            return db.updateEmployeeManager(updatedEmployee);
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
                case 'employeesByManager':
                    showEmployeesByMananger().then(data => {
                        console.log(space);
                        console.table(data);
                        return mainMenu(menu);
                    })
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
//db.getEmployeesByManager({ manager_id: 7 }).then(result => console.log(result))
//db.getManagers().then(result => console.log(result));