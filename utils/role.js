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
        name: 'department_id',
        message: 'Which department does this role belong to?',
        choices: ['None', ...departments]
    }
];

const getAllRoles = () => {
    fetch('/api/roles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const addNewRole = body => {
    fetch('/api/roles', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    });
};

module.exports = {
    rolePrompts,
    getAllRoles,
    addNewRole
};