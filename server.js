const express = require('express');
const inquirer = require('inquirer');
const apiRoutes = require('./routes/apiRoutes');
const { 
    deptartmentPrompts,
    getAllDeptartments,
    addNewDepartment
} = require('./utils/department');
const {
    rolePrompts,
    getAllRoles,
    addNewRole
} = require('./utils/role');

const PORT = process.env.PORT || 3001;
const app = express();

// CLI app is json to json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

const mainMenu = () => {
    console.log(`
    ======================================================
               Welcome to your Employee Tracker
    ------------------------------------------------------
     Keep track of employees with your own local database
    ======================================================
    `);
    return inquirer.prompt(mainMenuPrompts);
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});