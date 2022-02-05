const { rolePrompts } = require("./role");

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
        choices: ['No title', ...roles]
    },
    {
        type: 'rawlist',
        name: 'manager_id',
        message:"Who is the employee's manager?",
        choices: ['No manager', ...managers]
    }
];

const getAllEmployees = () => {
    fetch('/api/employees', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    });
};

const addNewEmployee = employee => {
    fetch('/api/employees', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(employee)
    });
};

const updateEmployeeRole = () => {
    fetch(`/api/employees/${id}`)
}