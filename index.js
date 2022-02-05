const mainMenuPrompts = require('./src/main-menu');
const { getAllDeptartments } = require('./utils/department');

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

mainMenu(mainMenuPrompts).then(answer => {
    let userChoice = answer.menu;

    switch (userChoice) {
        case 'allDept':
            getAllDeptartments();
            break;
    }
})